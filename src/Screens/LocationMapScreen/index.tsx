/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {CircleArrowLeftIcon, MapPin} from 'lucide-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import Map from './assets/svgs/image 11.svg';

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
          style={styles.headerBackButton}
          onPress={() => navigation.goBack()}>
          <CircleArrowLeftIcon size={32} color="#B0B6B8" />
          <Text style={styles.headerTitle}>Add Address</Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationDetailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    gap: 15,
  },
  locationInfoBox: {
    backgroundColor: '#E8F4F7',
    padding: 10,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
  },
  locationTitle: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  locationAddress: {
    fontSize: 14,
    color: '#606060',
    lineHeight: 20,
  },
  proceedButton: {
    backgroundColor: '#0088B1',
    height: 52,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LocationMapScreen;
