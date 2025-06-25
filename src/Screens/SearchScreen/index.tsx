/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {ChevronLeft, MapPinned, Search} from 'lucide-react-native';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import styles from './index.styles';
import {GOOGLE_API_KEY} from '@env';
import {Fonts} from '../../styles/fonts';
import Geolocation from '@react-native-community/geolocation';
import {requestLocationPermission} from '../../utils/permissions';
import {useAddressBookStore} from '../../store/addressStore';
import {AddressBookTypes} from '../../types';

interface PlacePrediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface PlaceAutocompleteResponse {
  predictions: PlacePrediction[];
  status: string;
}

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState<string>('');
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const retryAttemptRef = useRef<number>(0);
  const maxRetryAttempts = 3;
  const watchIdRef = useRef<number | null>(null);

  const fetchPlaces = async (text: string): Promise<void> => {
    if (text.length > 1) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            text,
          )}&key=${GOOGLE_API_KEY}&types=geocode`,
        );
        const data: PlaceAutocompleteResponse = await response.json();
        if (data.predictions) {
          setSuggestions(data.predictions);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

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
          PinCode: parseInt(pincode) || 0,
          Country: 'India',
          Address_type: 'Current Location',
        };

        console.log('Setting current location address:', addressForStore);

        useAddressBookStore.getState().setSelectedAddress(addressForStore);

        navigation.goBack();
      } else {
        console.warn('Reverse geocode failed: No address');
      }
    } catch (error) {
      console.error('Reverse geocode error:', error);
    }
  };

  // Proper debouncing implementation
  const debouncedFetchPlaces = (text: string): void => {
    // Clear any existing timeout to cancel previous pending searches
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only set a new timeout if the search text is meaningful
    if (text.length > 1) {
      // Set loading state immediately to show feedback to user
      setIsLoading(true);

      // Schedule new search after debounce delay
      timeoutRef.current = setTimeout(() => {
        fetchPlaces(text);
      }, 3000); // 300ms debounce delay
    } else {
      setIsLoading(false);
      setSuggestions([]);
    }
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSearch = (text: string): void => {
    setSearchText(text);
    debouncedFetchPlaces(text);
  };

  const handleSelectPlace = async (place: PlacePrediction): Promise<void> => {
    setSearchText(place.description);
    setSuggestions([]);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${GOOGLE_API_KEY}`,
      );
      const data = await response.json();

      console.log('Google Place Details API result:', data);

      if (data.result) {
        type AddressComponent = {
          long_name: string;
          short_name: string;
          types: string[];
        };

        const addressComponents = data.result
          .address_components as AddressComponent[];

        const cityComponent = addressComponents.find(
          component =>
            component.types.includes('locality') ||
            component.types.includes('administrative_area_level_2'),
        );

        const stateComponent = addressComponents.find(component =>
          component.types.includes('administrative_area_level_1'),
        );

        const localityComponent = addressComponents.find(
          component =>
            component.types.includes('sublocality_level_1') ||
            component.types.includes('neighborhood') ||
            component.types.includes('route'),
        );

        const city = cityComponent?.long_name || '';
        const state = stateComponent?.long_name || '';
        const locality = localityComponent?.long_name || '';

        const addressForStore: AddressBookTypes = {
          Address: data.result.formatted_address || place.description,
          Home_Floor_FlatNumber: '',
          Area_details: locality,
          LandMark: '',
          City: city,
          State: state,
          Contact_details: '',
          Recipient_name: '',
          PhoneNumber: '',
          PinCode: '',
          Country: 'India',
          Address_type: 'Manual Search',
        };

        console.log('Setting address from manual search:', addressForStore);

        useAddressBookStore.getState().setSelectedAddress(addressForStore);

        navigation.goBack();
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  const renderSuggestion = ({
    item,
  }: {
    item: PlacePrediction;
  }): React.ReactElement => (
    <TouchableOpacity
      style={{
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
      }}
      onPress={() => handleSelectPlace(item)}>
      <Text style={{fontSize: 14}}>{item.description}</Text>
    </TouchableOpacity>
  );

  const handleUseCurrentLocation = async (): Promise<void> => {
    console.log('Use current location pressed');

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
          console.log('Got high accuracy position:', {latitude, longitude});
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
          console.log('Got low accuracy position:', {latitude, longitude});
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
      console.log('Starting watch for location...');
      clearLocationWatch();

      watchIdRef.current = Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          console.log('Watch position update:', {latitude, longitude});
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

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
      }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color="#0088B1" />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 16,
            marginLeft: 10,
            fontFamily: Fonts.JakartaBold,
          }}>
          Select Delivery Location
        </Text>
      </View>

      <View style={{paddingHorizontal: 16, marginBottom: 8}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#E8F4F7',
            borderRadius: 8,
            paddingHorizontal: 12,
            height: 44,
            marginTop: 10,
          }}>
          <Search size={20} color="#999" />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 14,
              color: '#333',
              fontFamily: Fonts.JakartaRegular,
            }}
            placeholder="Search for building, society, location..."
            placeholderTextColor={'#899193'}
            value={searchText}
            onChangeText={handleSearch}
            autoFocus
          />
          {isLoading && <ActivityIndicator size="small" color="#0088B1" />}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#B0B6B8',
          padding: 15,
          marginHorizontal: 20,
        }}>
        {isLocating ? (
          <>
            <ActivityIndicator size="small" color="#0088B1" />
            <Text
              style={{
                color: '#0088B1',
                fontSize: 14,
                fontFamily: Fonts.JakartaRegular,
              }}>
              Fetching your location...
            </Text>
          </>
        ) : (
          <>
            <MapPinned color={'#0088B1'} size={20} />
            <TouchableOpacity
              onPress={handleUseCurrentLocation}
              disabled={isLocating}>
              <Text
                style={{
                  color: '#0088B1',
                  fontSize: 14,
                  fontFamily: Fonts.JakartaRegular,
                }}>
                Use current Location
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <FlatList
        data={suggestions}
        renderItem={renderSuggestion}
        keyExtractor={item => item.place_id}
        style={{flex: 1}}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}
