// App.tsx
import React from 'react';
import {SafeAreaView} from 'react-native';
import SplashScreen from './src/Screens/SplashScreen';
import AppNavigator from './src/navigation';
import {useAuthStore} from './src/store/authStore';

const App = () => {
  const rehydrated = useAuthStore(state => state.rehydrated);

  if (!rehydrated) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <SplashScreen />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E8F4F7'}}>
      <AppNavigator />
    </SafeAreaView>
  );
};

export default App;
