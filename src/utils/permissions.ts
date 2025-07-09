import { Platform } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      const fineLocationStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );

      if (fineLocationStatus === RESULTS.GRANTED) {
        return true;
      }

      if (fineLocationStatus === RESULTS.DENIED) {
        const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        return result === RESULTS.GRANTED;
      }

      if (fineLocationStatus === RESULTS.BLOCKED) {
        openSettings().catch(() => console.warn('Cannot open settings'));
        return false;
      }

      return false;
    }

    if (Platform.OS === 'ios') {
      const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (status === RESULTS.GRANTED) {
        return true;
      }

      if (status === RESULTS.DENIED) {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        return result === RESULTS.GRANTED;
      }

      if (status === RESULTS.BLOCKED) {
        openSettings().catch(() => console.warn('Cannot open settings'));
        return false;
      }

      return false;
    }

    return false;
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};
