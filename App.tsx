/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, SafeAreaView} from 'react-native';
import SplashScreen from './src/Screens/SplashScreen';
import AppNavigator from './src/navigation';

const App = () => {
  useEffect(() => {
    requestlocationPermission();
  }, []);
  const requestlocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App location Permission',
          message:
            'Cool Photo App needs access to your location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? <SplashScreen /> : <AppNavigator />}
    </SafeAreaView>
  );
};

export default App;
