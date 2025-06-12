import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    const settings = await notifee.requestPermission();
    return settings.authorizationStatus >= 1; // 1 = Authorized
  } catch (error) {
    console.error('Notification permission error:', error);
    return false;
  }
};

export const getFCMToken = async (): Promise<string | null> => {
  try {
    const token = await messaging().getToken();
    console.log('📲 FCM Token:', token);
    return token;
  } catch (error) {
    console.error('❌ Error getting FCM token', error);
    return null;
  }
};

export const listenToForegroundMessages = () => {
  return messaging().onMessage(async remoteMessage => {
    console.log('🔔 Foreground message:', remoteMessage);
    await displayNotification(remoteMessage);
  });
};

export const displayNotification = async (remoteMessage: any) => {
  try {
    // Log the full remoteMessage for debugging
    console.log('📩 remoteMessage:', JSON.stringify(remoteMessage, null, 2));

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    const androidOptions: any = {
      channelId,
      pressAction: {id: 'default'},
      sound: 'default',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      vibrationPattern: [300, 500],
      lights: [0xff00ff00, 300, 600],
      smallIcon: 'ic_launcher',
      autoCancel: true,
      showTimestamp: true,
    };

    // Temporarily skip color handling to isolate the issue
    // const color = remoteMessage?.android?.notification?.color;
    // if (typeof color === 'string' && color.match(/^#[0-9A-Fa-f]{6,8}$/)) {
    //   console.log('🟢 Valid color detected:', color);
    //   androidOptions.color = color;
    // } else {
    //   console.warn('⚠️ Invalid or missing color:', color);
    // }

    // Log androidOptions to confirm no color is set
    console.log('📋 androidOptions:', JSON.stringify(androidOptions, null, 2));

    await notifee.displayNotification({
      title: remoteMessage?.notification?.title || 'Notification',
      body: remoteMessage?.notification?.body || '',
      android: androidOptions,
    });
  } catch (error) {
    console.error('❌ Error displaying notification:', error);
  }
};
