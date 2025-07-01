/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {ChevronLeft, MapPinned} from 'lucide-react-native';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  Platform,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import styles from './index.styles';
import {Fonts} from '../../styles/fonts';
import Geolocation from '@react-native-community/geolocation';
import {requestLocationPermission} from '../../utils/permissions';
import {useAddressBookStore} from '../../store/addressStore';
import {AddressBookTypes} from '../../types';
import AddressCard from '../../components/cards/AddressCard';
import {getCustomerAddresses} from '../../Services/address';
import {useAuthStore} from '../../store/authStore';
import AddressCardSkeleton from '../../components/cards/AddressCard/skeletons';

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const customer_id = useAuthStore(state => state.customer_id);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>('');
  const [pincodeError, setPincodeError] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

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

  return (
    <View style={localStyles.safeAreaContainer}>
      <SafeAreaView style={localStyles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={20} color="#0088B1" />
          </TouchableOpacity>
          <Text style={localStyles.headerTitle}>Select Delivery Location</Text>
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
            <Text style={localStyles.sectionTitle}>
              Use pincode to check delivery info
            </Text>
            <View style={localStyles.pincodeContainer}>
              <TextInput
                style={[
                  localStyles.pincodeInput,
                  pincodeError ? localStyles.inputError : null,
                ]}
                placeholder="Enter pincode"
                placeholderTextColor={'#899193'}
                value={pincode}
                onChangeText={text => {
                  setPincode(text);
                  if (pincodeError) {
                    setPincodeError('');
                  }
                }}
                keyboardType="number-pad"
                maxLength={6}
              />
              <TouchableOpacity
                style={localStyles.searchButton}
                disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={localStyles.searchButtonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>
            {pincodeError && (
              <Text style={localStyles.errorText}>{pincodeError}</Text>
            )}
          </View>
          {addresses.length > 0 && (
            <View style={localStyles.addressCardContainer}>
              <Text style={localStyles.sectionTitle}>Saved Addresses</Text>
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

        <View style={localStyles.currentLocationContainer}>
          {isLocating ? (
            <>
              <ActivityIndicator size="small" color="#0088B1" />
              <Text style={localStyles.locatingText}>
                Fetching your location...
              </Text>
            </>
          ) : (
            <>
              <MapPinned color={'#0088B1'} size={20} />
              <TouchableOpacity
                onPress={handleUseCurrentLocation}
                disabled={isLocating}>
                <Text style={localStyles.currentLocationText}>
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

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  safeAreaContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerTitle: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: Fonts.JakartaBold,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
    marginBottom: 8,
    color: '#333',
  },
  pincodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pincodeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#B0B6B8',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#0088B1',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
    marginBottom: 8,
  },
  currentLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#0088B1',
    padding: 15,
    backgroundColor: '#E8F4F7',
    borderRadius: 12,
    marginHorizontal: 20,
  },
  currentLocationText: {
    color: '#0088B1',
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
  },
  locatingText: {
    color: '#0088B1',
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
  },
  addressCardContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
  },
});
