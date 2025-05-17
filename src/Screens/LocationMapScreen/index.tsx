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
import Map from './assets/svgs/image 11.svg';
import styles from './index.styles';
const LocationMapScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
        <View style={styles.mapContainer}>
          <Map style={styles.map} />
        </View>
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
