/* eslint-disable react-native/no-inline-styles */
// App.tsx
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from './src/Screens/SplashScreen';
import AppNavigator from './src/navigation';
import {useAuthStore} from './src/store/authStore';

const App = () => {
  const rehydrated = useAuthStore(state => state.rehydrated);

  if (!rehydrated) {
    return (
      <SafeAreaProvider>
        <SplashScreen />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
