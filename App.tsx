import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/Screens/SplashScreen';
import AppNavigator from './src/navigation';
import { useAuthStore } from './src/store/authStore';
import GlobalToastContainer from './src/components/ui/CustomToast/GlobalToastContainer';

const App = () => {
  const rehydrated = useAuthStore(state => state.rehydrated);
  const [showSplash, setShowSplash] = useState(true);

  // useEffect(() => {
  //   if (rehydrated) {
  //     const timeout = setTimeout(() => {
  //       setShowSplash(false);
  //     }, 1000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [rehydrated]);

  if (showSplash || !rehydrated) {
    return (
      <SafeAreaProvider>
        <SplashScreen onFadeOutComplete={() => setShowSplash(false)} />
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
