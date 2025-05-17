/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {ChevronLeft, MapPin} from 'lucide-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';

import styles from './index.styles';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';

const LocationMapScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // const getLocation = async () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       console.log(position.coords);
  //     },
  //     error => {
  //       // See error code charts below.
  //       console.log(error.code, error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // };

  const locationAddress =
    'Gandhi Maidan Road, Bakarganj, Patna, Bihar, 800004, India';
  const locationTitle = 'Bakarganj';

  const handleProceed = () => {
    console.log('Proceeding with location');
    navigation.navigate('AddressBookScreen', {
      location: {
        title: locationTitle,
        address: locationAddress,
      },
    });
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
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
      </View>

      <View style={styles.locationDetailsContainer}>
        <View style={styles.locationInfoBox}>
          <View style={{flexDirection: 'row', gap: 5}}>
            <MapPin color={'#161D1F'} />
            <Text style={styles.locationTitle}>{locationTitle}</Text>
          </View>
          <Text style={styles.locationAddress}>{locationAddress}</Text>
        </View>

        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LocationMapScreen;
