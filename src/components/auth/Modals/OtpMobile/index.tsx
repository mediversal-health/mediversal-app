/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import React, {useState, useEffect, useCallback} from 'react'; // Import useCallback
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import styles from './index.styles';
import {verifyOTP, sendOTP} from '../../../../Services/auth';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../navigation';
import CustomOtpInput from '../../../ui/CustomOtpInput';
import {useAuthStore} from '../../../../store/authStore';

interface OTPModalProps {
  isVisible: boolean;
  onClose: () => void;
  onGoBack: () => void;
  phoneNumber: string;
  onVerificationSuccess?: () => void;
}

interface ApiResponse {
  data?: {
    success: boolean;
    message?: string;
    token?: string;
    user?: any;
  };
}

const OtpMobileModal: React.FC<OTPModalProps> = ({
  isVisible,
  onGoBack,
  phoneNumber,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const setAuthentication = useAuthStore(state => state.setAuthentication);

  useEffect(() => {
    if (isVisible) {
      setOtp(Array(6).fill(''));
      setError('');
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

  // IMPORTANT: Wrap handleVerifyOTP in useCallback to prevent re-creation
  // This is crucial if it's passed as a prop that triggers useEffect in child.
  const handleVerifyOTP = useCallback(
    async (fullOtpString?: string) => {
      // Accept optional string from onOtpComplete
      try {
        setVerifying(true);
        setError('');

        const otpToVerify = fullOtpString || otp.join('');
        if (otpToVerify.length !== 6) {
          setError('Please enter a valid 6-digit OTP');
          return;
        }

        const response = (await verifyOTP(
          phoneNumber,
          otpToVerify, // Use otpToVerify
          'phone',
        )) as ApiResponse;
        console.log(response);
        console.log(response.data?.user.customer_id);

        if (response.data?.success) {
          setAuthentication({
            token: response.data.token as string,
            customer_id: response.data.user.customer_id,
            phoneNumber: phoneNumber,
            first_name: response.data.user.first_name,
            last_name: response.data.user.last_name,
            birthday: response.data.user.birthday,
            joinedDate: response.data.user.registration_date,
            profileImage:
              typeof response.data.user.profileImageUrl === 'string'
                ? response.data.user.profileImageUrl
                : response.data.user.profileImageUrl?.uri || null,
          });
          navigation.navigate('Layout');
          // Optionally, close the modal here if not done by navigation
          // onClose();
        } else {
          setError(response.data?.message || 'Invalid OTP');
        }
      } catch (error: any) {
        setError(error?.response?.data?.message || 'Error verifying OTP');
      } finally {
        setVerifying(false);
      }
    },
    [otp, phoneNumber, setAuthentication, navigation],
  ); // Dependencies for useCallback

  // Callback from CustomOtpInput when OTP is complete
  const onOtpCompleteHandler = useCallback(
    (fullOtpCode: string) => {
      console.log('OTP received via autofill/paste:', fullOtpCode);
      // setOtp(fullOtpCode.split('')); // CustomOtpInput already handles setting its own state
      // Trigger verification immediately
      handleVerifyOTP(fullOtpCode);
    },
    [handleVerifyOTP],
  ); // Dependency on handleVerifyOTP

  const handleResendOTP = async () => {
    try {
      setResending(true);
      setError('');

      const response = (await sendOTP(phoneNumber, '', 'phone')) as ApiResponse;

      if (response.data?.success) {
        setTimer(60);
        setOtp(Array(6).fill('')); // Clear OTP on resend
        Alert.alert('Success', 'OTP sent successfully');
      } else {
        setError(response.data?.message || 'Failed to resend OTP');
      }
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Error resending OTP');
      console.error('Resend OTP Error:', error);
    } finally {
      setResending(false);
    }
  };

  const isOtpFilled = otp.every(d => d !== '');

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={undefined} // Or set to onClose if you want it to close on tap outside
      style={styles.modal}
      swipeDirection={['down']}
      animationOut="slideOutDown"
      animationOutTiming={250}>
      <View style={styles.container}>
        <Text style={styles.title}>6-digit OTP</Text>
        <Text style={styles.subtitle}>
          OTP sent to {phoneNumber} for verification.{'\n'}Please enter the code
          here.
        </Text>

        <TouchableOpacity onPress={onGoBack}>
          <Text style={styles.editLink}>
            Wrong number?{' '}
            <Text style={styles.editLinkHighlight}>Edit Number</Text>
          </Text>
        </TouchableOpacity>

        <CustomOtpInput
          otp={otp}
          setOtp={setOtp}
          error={error}
          isVisible={isVisible}
          otpLength={6} // Explicitly pass the length
          onOtpComplete={onOtpCompleteHandler} // Pass the new handler
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.resendRow}>
          {timer > 0 ? (
            <Text style={styles.resendText}>
              Didn't get OTP? Resend in{' '}
              <Text style={styles.timerText}>{timer}s</Text>
            </Text>
          ) : (
            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={resending}
              style={styles.resendButton}>
              {resending ? (
                <ActivityIndicator size="small" color="#0088B1" />
              ) : (
                <Text style={styles.resendLink}>Resend OTP</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.verifyButton,
            verifying ? styles.verifyButtonLoading : null,
            !isOtpFilled ? styles.verifyButtonDisabled : null,
          ]}
          onPress={() => handleVerifyOTP()} // Call without arguments for manual press
          disabled={!isOtpFilled || verifying}
          activeOpacity={0.8}>
          {verifying ? (
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

export default OtpMobileModal;
