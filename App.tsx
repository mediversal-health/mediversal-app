// App.tsx
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from './src/Screens/SplashScreen';
import AppNavigator from './src/navigation';
import {useAuthStore} from './src/store/authStore';
import GlobalToastContainer from './src/components/ui/CustomToast/GlobalToastContainer';
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
      <GlobalToastContainer />
    </SafeAreaProvider>
  );
};

export default App;
