/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import SplashScreen from './src/Screens/SplashScreen';
import AppNavigator from './src/navigation';

const App = () => {
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
