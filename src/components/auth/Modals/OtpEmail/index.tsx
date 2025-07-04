/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {sendOTP, verifyOTP} from '../../../../Services/auth';
import {RootStackParamList} from '../../../../navigation';
import styles from './index.styles';
import CustomOtpInput from '../../../ui/CustomOtpInput';
import {useAuthStore} from '../../../../store/authStore';
interface OTPModalProps {
  isVisible: boolean;
  onClose: () => void;
  email: string;
  password: string;
}

const OtpEmailModal: React.FC<OTPModalProps> = ({
  isVisible,
  onClose,
  email,
  password,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const setAuthentication = useAuthStore(state => state.setAuthentication);
  useEffect(() => {
    if (isVisible) {
      setOtp(Array(6).fill(''));
      setError('');
      setTimer(60);
    }
  }, [isVisible]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isVisible && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isVisible, timer]);

  const isOtpFilled = otp.every(d => d !== '');

  const handleVerifyOTP = async () => {
    if (!isOtpFilled) {
      return;
    }

    const enteredOTP = otp.join('');
    if (enteredOTP.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await verifyOTP(email, enteredOTP, 'email');
      if (response.data?.success) {
        setAuthentication({
          token: response.data.token as string,
          customer_id: response.data.user.customer_id,
          email: email,
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          birthday: response.data.user.birthday,
          joinedDate: response.data.user.registration_date,
          profileImage: response.data.user.profileImageUrl,
        });
        setIsAuthenticated(true);
        navigation.navigate('Layout');
      } else {
        // Alert.alert('Error', response.data?.message || 'Resend failed');
        setError(response.data?.message || 'Invalid OTP');
      }
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Error verifying OTP');
      // Alert.alert(
      //   'Error',
      //   error?.response?.data?.message || 'Something went wrong',
      // );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      setError('');

      const response = await sendOTP(email, password, 'email');
      setResendLoading(false);

      if (response.status === 200 || response.data?.success) {
        Alert.alert('Success', 'OTP resent to your email.');
        setOtp(Array(6).fill(''));
        setTimer(60);
      } else {
        Alert.alert('Error', response.data?.message || 'Resend failed');
        setError(response.data?.message || 'Failed to resend OTP');
      }
    } catch (error: any) {
      setResendLoading(false);
      setError(error?.response?.data?.message || 'Error resending OTP');
      const message =
        (error as any)?.response?.data?.message || 'Something went wrong';
      Alert.alert('Error', message);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      animationOut="slideOutDown"
      animationOutTiming={250}
      onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Email Verification</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit OTP to your email. Please enter it below.
          </Text>

          <View style={styles.changeEmailContainer}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.changeEmailText}>
                <Text style={styles.grayText}>Wrong email? </Text>
                <Text style={styles.blueText}>Change Email</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.emailInputContainer}>
          <TextInput
            style={styles.emailInput}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={false}
          />
        </View>

        <CustomOtpInput
          otp={otp}
          setOtp={setOtp}
          error={error}
          isVisible={isVisible}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.timerContainer}>
          {timer > 0 ? (
            <Text style={styles.timerText}>
              <Text style={styles.grayText}>Didn't get OTP? </Text>
              <Text style={styles.blueText}>{timer}s</Text>
            </Text>
          ) : (
            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={resendLoading}>
              {resendLoading ? (
                <ActivityIndicator size="small" color="#0088B1" />
              ) : (
                <Text style={styles.resendText}>Resend OTP</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.verifyButton,
            loading ? styles.verifyButtonLoading : null,
            !isOtpFilled ? styles.verifyButtonDisabled : null,
          ]}
          onPress={handleVerifyOTP}
          disabled={!isOtpFilled || loading}
          activeOpacity={0.8}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text
              style={[
                styles.verifyButtonText,
                !isOtpFilled && styles.disabledText,
              ]}>
              Verify & Continue
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default OtpEmailModal;
