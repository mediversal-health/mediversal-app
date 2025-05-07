import React, {useState, useRef, useEffect} from 'react';
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
  const [userEmail, setUserEmail] = useState<string>(email);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [showResetModal, setShowResetModal] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>(Array(6).fill(null));
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
  const handleOTPChange = (value: string, index: number): void => {
    if (!/^[0-9]?$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (): Promise<void> => {
    if (!isOtpFilled) {
      return;
    }

    const otpCode = otp.join('');
    setLoading(true);

    try {
      const response = await verifyResetOtp(userEmail, otpCode, 'email');
      setLoading(false);
      console.log(response.data);
      // eslint-disable-next-line eqeqeq
      if (response.data && response.data.success == true) {
        setShowResetModal(true);
        console.log(response.data);
      } else {
        Alert.alert(
          'Error',
          response.data.message || 'Verification failed. Please try again.',
        );
      }
    } catch (error) {
      setLoading(false);
      const errorMessage =
        (error as any)?.response?.data?.message ||
        'Something went wrong. Please try again.';
      Alert.alert('Error', errorMessage);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      const response = await forgotPassword(email, 'email');
      setLoading(false);

      // eslint-disable-next-line eqeqeq
      if (response.data && response.data.success == true) {
        Alert.alert('Otp sent Successfully');
        setOtp(Array(6).fill('')); // clear previous input
        setTimer(60);
      } else {
        Alert.alert(
          'Error',
          response.data.message || 'Login failed. Please try again.',
        );
      }
    } catch (error) {
      setLoading(false);
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

          {/* Editable Email Input */}
          <View style={styles.emailInputContainer}>
            <TextInput
              style={styles.emailInput}
              value={userEmail}
              onChangeText={setUserEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
            />
          </View>

          {/* OTP Input Row */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el): void => {
                  inputRefs.current[index] = el;
                }}
                style={[
                  styles.otpInput,
                  digit ? styles.otpInputFilled : styles.otpInputEmpty,
                ]}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value): void => handleOTPChange(value, index)}
              />
            ))}
          </View>

          {/* Timer & Resend OTP */}
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

          {/* Verify OTP Button */}
          <TouchableOpacity
            style={[
              styles.verifyButton,
              isOtpFilled
                ? styles.verifyButtonFilled
                : styles.verifyButtonOutline,
            ]}
            onPress={isOtpFilled ? handleVerifyOTP : undefined}
            disabled={!isOtpFilled || loading}>
            {loading ? (
              <ActivityIndicator color="#f8f8f8" />
            ) : (
              <Text
                style={[
                  styles.verifyButtonText,
                  isOtpFilled
                    ? styles.verifyButtonTextLight
                    : styles.verifyButtonTextDark,
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
          email={userEmail}
        />
      )}
    </>
  );
};

export default OtpForgotPasswordModal;
