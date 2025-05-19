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
import {ChevronLeft, MapPin} from 'lucide-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import styles from './index.styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {requestLocationPermission} from '../../utils/permissions';

const LocationMapScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationTitle, setLocationTitle] =
    useState<string>('Current Location');
  const [locationAddress, setLocationAddress] = useState<string>('');
  const [locationStatus, setLocationStatus] = useState<string>(
    'Initializing location services...',
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // References to track watch position and retry attempts
  const watchIdRef = useRef<number | null>(null);
  const retryAttemptRef = useRef<number>(0);
  const maxRetryAttempts = 3;

  // Location getting strategies
  const getLocationWithHighAccuracy = () => {
    setLocationStatus('Getting precise location...');
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Got high accuracy position:', {latitude, longitude});
        setCurrentLocation({latitude, longitude});
        setLocationStatus('');
        setIsLoading(false);
        // Clear any ongoing watch
        clearLocationWatch();
      },
      error => {
        console.log('High accuracy error:', error.code, error.message);
        // If high accuracy fails, try low accuracy
        if (retryAttemptRef.current < maxRetryAttempts) {
          retryAttemptRef.current += 1;
          setLocationStatus(
            `Retrying... (${retryAttemptRef.current}/${maxRetryAttempts})`,
          );
          setTimeout(getLocationWithLowAccuracy, 1000);
        } else {
          startLocationWatch(); // As a last resort, start watching position
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 30000, // Increased timeout to 30 seconds
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
          title: locationTitle,
          address: locationAddress,
          coords: currentLocation,
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

        {!currentLocation && (
          <View style={styles.mapPlaceholder}>
            {isLoading ? (
              <>
                <ActivityIndicator size="large" color="#0088B1" />
                <Text style={{marginTop: 10}}>{locationStatus}</Text>
              </>
            ) : (
              <>
                <Text style={{marginBottom: 15}}>{locationStatus}</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#0088B1',
                    padding: 10,
                    borderRadius: 5,
                  }}
                  onPress={handleRetryLocation}>
                  <Text style={{color: 'white'}}>Retry Getting Location</Text>
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
              <MapPin color={'#161D1F'} />
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
