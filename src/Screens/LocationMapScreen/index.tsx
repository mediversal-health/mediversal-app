/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {ChevronLeft, LocateFixed, MapPin} from 'lucide-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';

import styles from './index.styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {requestLocationPermission} from '../../utils/permissions'; // Assuming you have a utility for permissions

const LocationMapScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationTitle, setLocationTitle] = useState<string>('');
  const [locationAddress, setLocationAddress] = useState<string>('');
  const [formattedAddress, setFormattedAddress] = useState<{
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
  }>({
    street: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [locationStatus, setLocationStatus] = useState<string>(
    'Initializing location services...',
  );
  const [mapRef, setMapRef] = useState<MapView | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // References to track watch position and retry attempts
  const watchIdRef = useRef<number | null>(null);
  const retryAttemptRef = useRef<number>(0);
  const maxRetryAttempts = 3;

  // Function to fetch address from coordinates using Nominatim (free, no API key required)
  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

      console.log('Fetching address for:', {latitude, longitude});
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'YourAppName/1.0',
        },
      });
      const data = await response.json();

      if (data && data.display_name) {
        console.log('Address found:', data.display_name);
        setLocationAddress(data.display_name);

        // Extract a meaningful location title from the address
        let title = 'Current Location';
        if (data.address) {
          if (data.address.road || data.address.neighbourhood) {
            title = data.address.road || data.address.neighbourhood;
          }
        }
        setLocationTitle(title);
        const addressComponents = {
          street: data.address?.road || '',
          area: data.address?.suburb || data.address?.neighbourhood || '',
          city:
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            '',
          state: data.address?.state || '',
          pincode: data.address?.postcode || '',
        };

        setFormattedAddress(addressComponents);
      } else {
        console.log('No address found in response');
        setLocationAddress('Address not available');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setLocationAddress('Could not determine address');
    }
  };

  // Location getting strategies
  const getLocationWithHighAccuracy = () => {
    setLocationStatus('Getting your location...');
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Got high accuracy position:', {latitude, longitude});
        setCurrentLocation({latitude, longitude});
        setLocationStatus('');
        setIsLoading(false);
        fetchAddress(latitude, longitude);
        clearLocationWatch();
      },
      error => {
        console.log('High accuracy error:', error.code, error.message);
        // If high accuracy fails, try low accuracy
        if (retryAttemptRef.current < maxRetryAttempts) {
          retryAttemptRef.current += 1;
          setLocationStatus(`Wait... `);
          setTimeout(getLocationWithLowAccuracy, 1000);
        } else {
          startLocationWatch();
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 3000, // Short timeout for high accuracy
        maximumAge: 10000,
      },
    );
  };

  const getLocationWithLowAccuracy = () => {
    setLocationStatus('Getting approximate location...');
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Got low accuracy position:', {latitude, longitude});
        setCurrentLocation({latitude, longitude});
        setLocationStatus('');
        setIsLoading(false);
        // Fetch address from coordinates
        fetchAddress(latitude, longitude);
        // Clear any ongoing watch
        clearLocationWatch();
      },
      error => {
        console.log('Low accuracy error:', error.code, error.message);
        startLocationWatch(); // If low accuracy also fails, start watching
      },
      {
        enableHighAccuracy: false, // Lower accuracy but faster response
        timeout: 20000,
        maximumAge: 60000, // Accept older positions
      },
    );
  };

  const startLocationWatch = () => {
    setLocationStatus('Watching for location updates...');
    // Clear any existing watch
    clearLocationWatch();

    // Start a new watch
    watchIdRef.current = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Watch position update:', {latitude, longitude});
        setCurrentLocation({latitude, longitude});
        setLocationStatus('');
        setIsLoading(false);
        // Fetch address from coordinates
        fetchAddress(latitude, longitude);

        // Once we have a location, we can stop watching
        clearLocationWatch();
      },
      error => {
        console.log('Watch position error:', error.code, error.message);
        setLocationStatus(
          'Unable to determine your location. Please check your device settings.',
        );
        setIsLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 50, // Update if moved more than 50 meters
      },
    );
  };

  const clearLocationWatch = () => {
    if (watchIdRef.current !== null) {
      Geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  useEffect(() => {
    const initLocationServices = async () => {
      try {
        const granted = await requestLocationPermission();
        if (!granted) {
          Alert.alert(
            'Location Permission Denied',
            'Please enable location services to use this feature.',
            [{text: 'OK'}],
          );
          setLocationStatus('Location permission denied');
          setIsLoading(false);
          return;
        }

        // Configure geolocation
        Geolocation.setRNConfiguration({
          skipPermissionRequests: false,
          authorizationLevel: 'whenInUse',
        });

        // Request authorization explicitly on iOS
        if (Platform.OS === 'ios') {
          Geolocation.requestAuthorization();
        }

        // Start with high accuracy attempt
        getLocationWithHighAccuracy();
      } catch (err) {
        console.error('Location setup error:', err);
        setLocationStatus('Location service error. Please restart the app.');
        setIsLoading(false);
      }
    };

    initLocationServices();

    // Cleanup function
    return () => {
      clearLocationWatch();
    };
  }, []);

  const handleProceed = () => {
    if (currentLocation) {
      console.log('Proceeding with current location:', currentLocation);
      navigation.navigate('AddressBookScreen', {
        location: {
          title: locationTitle || 'Current Location',
          address: locationAddress,
          coords: currentLocation,
          formattedAddress: formattedAddress,
        },
      });
    } else {
      Alert.alert(
        'No Location Found',
        'Please wait for your current location to be determined.',
      );
    }
  };

  const handleRetryLocation = () => {
    setIsLoading(true);
    retryAttemptRef.current = 0;
    getLocationWithHighAccuracy();
  };
  const handleRecenterMap = () => {
    if (mapRef && currentLocation) {
      mapRef.animateToRegion(
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        500,
      );
    } else {
      handleRetryLocation();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color="#0088B1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Address</Text>
      </View>

      <View style={styles.content}>
        {currentLocation && (
          <MapView
            ref={ref => setMapRef(ref)}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}>
            <Marker
              coordinate={currentLocation}
              title={locationTitle}
              description={locationAddress || 'Fetching current address...'}
              pinColor="#0088B1">
              <MapPin size={30} color="#0088B1" />
            </Marker>
          </MapView>
        )}

        <TouchableOpacity
          style={styles.recenterButton}
          onPress={handleRecenterMap}>
          <LocateFixed size={24} color="#0088B1" />
        </TouchableOpacity>

        {!currentLocation && (
          <View style={styles.mapPlaceholder}>
            {isLoading ? (
              <>
                <ActivityIndicator size="large" color="#0088B1" />
                <Text style={styles.locationStatusText}>{locationStatus}</Text>
              </>
            ) : (
              <>
                <Text style={styles.retryText}>{locationStatus}</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={handleRetryLocation}>
                  <Text style={styles.retryButtonText}>
                    Retry Getting Location
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>

      {currentLocation && (
        <View style={styles.locationDetailsContainer}>
          <View style={styles.locationInfoBox}>
            <View style={{flexDirection: 'row', gap: 5}}>
              <MapPin size={20} color={'#161D1F'} />
              <Text style={styles.locationTitle}>{locationTitle}</Text>
            </View>
            <Text style={styles.locationAddress}>
              {locationAddress || 'Determining current address...'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleProceed}>
            <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default LocationMapScreen;
