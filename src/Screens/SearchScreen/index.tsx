/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {CheckCircle, ChevronLeft, MapPinned} from 'lucide-react-native';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import styles from './index.styles';

import Geolocation from '@react-native-community/geolocation';
import {requestLocationPermission} from '../../utils/permissions';
import {useAddressBookStore} from '../../store/addressStore';
import {AddressBookTypes} from '../../types';
import AddressCard from '../../components/cards/AddressCard';
import {getCustomerAddresses} from '../../Services/address';
import {useAuthStore} from '../../store/authStore';
import AddressCardSkeleton from '../../components/cards/AddressCard/skeletons';
import {RAPID_SHYP_ACCESS_TOKEN} from '@env';
export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const customer_id = useAuthStore(state => state.customer_id);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>('');
  const [pincodeError, setPincodeError] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const [serviceabilityData, setServiceabilityData] = useState<any>(null);
  const [isCheckingServiceability, setIsCheckingServiceability] =
    useState(false);
  const [serviceabilityError, setServiceabilityError] = useState('');
  const {
    addresses,
    setAddresses,
    selectedAddress,
    setSelectedAddress,
    hasLoadedAddresses,
    setHasLoadedAddresses,
    customerAddressMap,
    updateCustomerAddressMap,
  } = useAddressBookStore();

  const retryAttemptRef = useRef<number>(0);
  const maxRetryAttempts = 3;
  const watchIdRef = useRef<number | null>(null);

  const fetchAddresses = useCallback(
    async (isRefreshing = false) => {
      try {
        if (!hasLoadedAddresses || isRefreshing) {
          if (isRefreshing) {
            setRefreshing(true);
          } else {
            setIsLoading(true);
          }

          let res;
          if (customer_id) {
            res = await getCustomerAddresses(customer_id.toString());
          }
          setAddresses(res?.data || []);
          setHasLoadedAddresses(true);
        }
      } catch (error) {
        console.log('Failed to fetch addresses:', error);
      } finally {
        if (!isRefreshing) {
          setIsLoading(false);
        } else {
          setRefreshing(false);
        }
      }
    },
    [customer_id, hasLoadedAddresses, setAddresses, setHasLoadedAddresses],
  );

  const onRefresh = useCallback(() => {
    fetchAddresses(true);
  }, [fetchAddresses]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);
  //  const fetchPlaces = async (text: string): Promise<void> => {
  //     if (text.length > 1) {
  //       setIsLoading(true);
  //       try {
  //         const response = await fetch(
  //           `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
  //             text,
  //           )}&key=${GOOGLE_API_KEY}&types=geocode`,
  //         );
  //         const data: PlaceAutocompleteResponse = await response.json();
  //         if (data.predictions) {
  //           setSuggestions(data.predictions);
  //         }
  //       } catch (error) {
  //         console.error('Error fetching places:', error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     } else {
  //       setSuggestions([]);
  //     }
  //   };
  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'YourAppName/1.0',
        },
      });
      const data = await response.json();

      if (data && data.address) {
        const city =
          data.address.city || data.address.town || data.address.village || '';
        const pincode = data.address.postcode || '';

        const addressForStore: AddressBookTypes = {
          Address: data.display_name,
          Home_Floor_FlatNumber: '',
          Area_details: data.address.suburb || data.address.neighbourhood || '',
          LandMark: data.address.road || '',
          City: city,
          State: data.address.state || '',
          Contact_details: '',
          Recipient_name: '',
          PhoneNumber: '',
          PinCode: parseInt(pincode, 10) || 0,
          Country: 'India',
          Address_type: 'Current Location',
        };

        useAddressBookStore.getState().setSelectedAddress(addressForStore);
        if (customer_id) {
          updateCustomerAddressMap(customer_id.toString(), addressForStore);
        }
        navigation.goBack();
      } else {
        console.warn('Reverse geocode failed: No address');
      }
    } catch (error) {
      console.error('Reverse geocode error:', error);
    }
  };

  const handleUseCurrentLocation = async (): Promise<void> => {
    const granted = await requestLocationPermission();
    if (!granted) {
      console.warn('Location permission denied');
      return;
    }

    setIsLocating(true);

    const getLocationWithHighAccuracy = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          fetchAddress(latitude, longitude);
          clearLocationWatch();
          setIsLocating(false);
        },
        error => {
          console.log('High accuracy error:', error.code, error.message);
          if (retryAttemptRef.current < maxRetryAttempts) {
            retryAttemptRef.current += 1;
            setTimeout(getLocationWithLowAccuracy, 1000);
          } else {
            startLocationWatch();
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 3000,
          maximumAge: 10000,
        },
      );
    };

    const getLocationWithLowAccuracy = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          fetchAddress(latitude, longitude);
          clearLocationWatch();
          setIsLocating(false);
        },
        error => {
          console.log('Low accuracy error:', error.code, error.message);
          startLocationWatch();
        },
        {
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: 60000,
        },
      );
    };

    const startLocationWatch = () => {
      clearLocationWatch();

      watchIdRef.current = Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          fetchAddress(latitude, longitude);
          clearLocationWatch();
          setIsLocating(false);
        },
        error => {
          console.log('Watch position error:', error.code, error.message);
          setIsLocating(false);
        },
        {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 50,
        },
      );
    };

    const clearLocationWatch = () => {
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };

    retryAttemptRef.current = 0;
    getLocationWithHighAccuracy();
  };
  const handleAddressSelect = (addr: AddressBookTypes) => {
    setSelectedAddress(addr);
    if (customer_id) {
      updateCustomerAddressMap(customer_id.toString(), addr);
    }
  };

  // Get the current customer's selected address
  const currentCustomerAddress = customer_id
    ? customerAddressMap[customer_id]
    : null;

  const checkServiceability = async () => {
    if (!pincode || pincode.length !== 6) {
      setPincodeError('Please enter a valid 6-digit pincode');
      return;
    }

    try {
      setIsCheckingServiceability(true);
      setServiceabilityError('');
      setServiceabilityData(null);

      const response = await fetch(
        'https://api.rapidshyp.com/rapidshyp/apis/v1/serviceabilty_check',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'rapidshyp-token': RAPID_SHYP_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            Pickup_pincode: '110068',
            Delivery_pincode: pincode,
            cod: true,
            total_order_value: 0,
            weight: 1,
          }),
        },
      );

      const data = await response.json();
      console.log(response);
      if (data.status) {
        setServiceabilityData(data);
      } else {
        setServiceabilityError('Delivery not available for this pincode');
      }
    } catch (error) {
      console.error('Serviceability check failed:', error);
      setServiceabilityError(
        'Failed to check serviceability. Please try again.',
      );
    } finally {
      setIsCheckingServiceability(false);
    }
  };
  return (
    <View style={styles.safeAreaContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={20} color="#0088B1" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Delivery Location</Text>
        </View>

        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0088B1']}
              tintColor="#0088B1"
            />
          }>
          {/* Pincode Search Section */}
          <View
            style={{
              paddingHorizontal: 16,
              marginBottom: 8,
              marginTop: 10,
              borderBottomWidth: 1,
              paddingBottom: 20,
              borderColor: '#B0B6B8',
            }}>
            <Text style={styles.sectionTitle}>
              Use pincode to check delivery info
            </Text>
            <View style={styles.pincodeContainer}>
              <TextInput
                style={[
                  styles.pincodeInput,
                  pincodeError ? styles.inputError : null,
                ]}
                placeholder="Enter pincode"
                placeholderTextColor={'#899193'}
                value={pincode}
                onChangeText={text => {
                  setPincode(text);
                  if (pincodeError) {
                    setPincodeError('');
                  }
                  // Clear serviceability data when pincode changes
                  if (serviceabilityData || serviceabilityError) {
                    setServiceabilityData(null);
                    setServiceabilityError('');
                  }
                }}
                keyboardType="number-pad"
                maxLength={6}
              />
              <TouchableOpacity
                style={styles.searchButton}
                onPress={checkServiceability}
                disabled={isCheckingServiceability}>
                {isCheckingServiceability ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.searchButtonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>
            {pincodeError && (
              <Text style={styles.errorText}>{pincodeError}</Text>
            )}

            {/* Serviceability response */}
            {serviceabilityData && (
              <View style={styles.serviceabilityContainer}>
                <View style={styles.successContainer}>
                  <CheckCircle color="#4BB543" size={20} />
                  <Text style={styles.successText}>Delivery available</Text>
                </View>
              </View>
            )}

            {serviceabilityError && (
              <Text style={styles.errorText}>{serviceabilityError}</Text>
            )}
          </View>
          {addresses.length > 0 && (
            <View style={styles.addressCardContainer}>
              <Text style={styles.sectionTitle}>Saved Addresses</Text>
              {isLoading && !refreshing ? (
                <AddressCardSkeleton count={3} />
              ) : (
                <View style={{alignItems: 'center'}}>
                  {addresses.map((addr, idx) => (
                    <AddressCard
                      key={idx}
                      title={addr.Address_type}
                      address={`${addr.Recipient_name}, ${addr.Home_Floor_FlatNumber}, ${addr.Area_details}, ${addr.City},${addr.State} ${addr.PinCode}`}
                      phoneNumber={addr.PhoneNumber}
                      onPress={() => handleAddressSelect(addr)}
                      selected={
                        selectedAddress?.Customer_Address_id ===
                          addr.Customer_Address_id ||
                        currentCustomerAddress?.Customer_Address_id ===
                          addr.Customer_Address_id
                      }
                      onMorePress={() => {
                        setSelectedAddress(addr);
                      }}
                      isFromLayout={true}
                    />
                  ))}
                </View>
              )}
            </View>
          )}
        </ScrollView>

        <View style={styles.currentLocationContainer}>
          {isLocating ? (
            <>
              <ActivityIndicator size="small" color="#0088B1" />
              <Text style={styles.locatingText}>Fetching your location...</Text>
            </>
          ) : (
            <>
              <MapPinned color={'#0088B1'} size={20} />
              <TouchableOpacity
                onPress={handleUseCurrentLocation}
                disabled={isLocating}>
                <Text style={styles.currentLocationText}>
                  Use current Location
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
