// App.tsx
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from './src/Screens/SplashScreen';
import AppNavigator from './src/navigation';
import {useAuthStore} from './src/store/authStore';
import {
  getFCMToken,
  listenToForegroundMessages,
  requestNotificationPermission,
} from './src/Services/notificationService';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const rehydrated = useAuthStore(state => state.rehydrated);

  useEffect(() => {
    setupNotification();

    // Handle when user taps a notification (background or quit state)
    const unsubscribeNotificationOpened = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log(
          '📲 App opened from background via notification:',
          remoteMessage,
        );
        // Navigate here or trigger logic based on remoteMessage.data
      },
    );

    // Check if app was opened by tapping a notification (from killed state)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('🚀 App launched by notification:', remoteMessage);
          // Navigate here too if needed
        }
      });

    return () => {
      unsubscribeNotificationOpened();
    };
  }, []);

  const setupNotification = async () => {
    const hasPermission = await requestNotificationPermission();
    if (hasPermission) {
      await getFCMToken();
    }

    const unsubscribe = listenToForegroundMessages();

    return () => {
      unsubscribe();
    };
  };

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
