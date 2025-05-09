/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {forgotPassword, verifyResetOtp} from '../../../../Services/auth';
import ResetPasswordModal from '../ResetPassword';
import styles from './index.styles';
import CustomOtpInput from '../../../ui/CustomOtpInput';
interface OtpForgotPasswordModalProps {
  isVisible: boolean;
  onClose: () => void;
  email: string;
}

const OtpForgotPasswordModal: React.FC<OtpForgotPasswordModalProps> = ({
  isVisible,
  onClose,
  email,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [showResetModal, setShowResetModal] = useState(false);
  const [error, setError] = useState<string>('');

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

  const handleVerifyOTP = async (): Promise<void> => {
    if (!isOtpFilled) {
      return;
    }

    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    setLoading(true);

    try {
      const response = await verifyResetOtp(email, otpCode, 'email');
      setLoading(false);
      console.log(response.data);
      // eslint-disable-next-line eqeqeq
      if (response.data && response.data.success == true) {
        setShowResetModal(true);
        console.log(response.data);
      } else {
        setError(response.data?.message || 'Invalid OTP');
        Alert.alert(
          'Error',
          response.data.message || 'Verification failed. Please try again.',
        );
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Something went wrong',
      );
      setError(error?.response?.data?.message || 'Error verifying OTP');
    }
  };

  const handleResendOTP = async () => {
    try {
      setError('');
      setLoading(true);
      const response = await forgotPassword(email, 'email');
      setLoading(false);

      // eslint-disable-next-line eqeqeq
      if (response.data && response.data.success == true) {
        Alert.alert('Otp sent Successfully');
        setOtp(Array(6).fill(''));
        setTimer(60);
      } else {
        setError(response.data?.message || 'Failed to resend OTP');
        Alert.alert(
          'Error',
          response.data.message || 'Login failed. Please try again.',
        );
      }
    } catch (error: any) {
      setLoading(false);
      setError(error?.response?.data?.message || 'Error resending OTP');
      const errorMessage =
        (error as any)?.response?.data?.message ||
        'Something went wrong. Please try again.';
      Alert.alert('Error', errorMessage);
    }
  };

  const isOtpFilled: boolean = otp.every(digit => digit !== '');

  return (
    <>
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
            <Text style={styles.title}>Verify to Reset Password</Text>
            <Text style={styles.subtitle}>
              We've sent a 6-digit OTP to your email. Please enter it here.
            </Text>

            {/* Wrong Email? Change Email */}
            <View style={styles.changeEmailContainer}>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.changeEmailText}>
                  <Text style={styles.grayText}>Wrong Email? </Text>
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
              placeholder="Enter your email"
            />
          </View>

          <CustomOtpInput
            otp={otp}
            setOtp={setOtp}
            error={error}
            isVisible={isVisible}
          />

          <View style={styles.timerContainer}>
            {timer > 0 ? (
              <Text style={styles.timerText}>
                <Text style={styles.grayText}>Didn't get OTP? </Text>
                <Text style={styles.blueText}>{timer}s</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResendOTP}>
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.verifyButton,
              (!isOtpFilled || loading) && styles.verifyButtonDisabled,
            ]}
            onPress={handleVerifyOTP}
            disabled={!isOtpFilled || loading}>
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

      {showResetModal && (
        <ResetPasswordModal
          isVisible={showResetModal}
          onClose={() => setShowResetModal(false)}
          email={email}
        />
      )}
    </>
  );
};

export default OtpForgotPasswordModal;
