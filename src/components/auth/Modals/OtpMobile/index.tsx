import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import styles from './index.styles';
import {verifyOTP, sendOTP} from '../../../../Services/auth';

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
  onClose,
  onGoBack,
  phoneNumber,
  onVerificationSuccess,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string>('');
  const inputRefs = useRef<(TextInput | null)[]>(Array(6).fill(null));

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

  const handleOTPChange = (value: string, index: number) => {
    if (error) {
      setError('');
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    if (value.length > 1 && index === 0) {
      const pastedOtp = value.substring(0, 6).split('');
      for (let i = 0; i < pastedOtp.length; i++) {
        newOtp[i] = pastedOtp[i];
      }
      setOtp(newOtp);

      const lastIndex = Math.min(pastedOtp.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = async () => {
    try {
      setResending(true);
      setError('');

      const response = (await sendOTP(phoneNumber)) as ApiResponse;

      if (response.data?.success) {
        setTimer(60);
        setOtp(Array(6).fill(''));

        setTimeout(() => inputRefs.current[0]?.focus(), 100);
        Alert.alert('Success', 'OTP sent successfully');
      } else {
        setError(response.data?.message || 'Failed to resend OTP');
      }
      // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Error resending OTP');
      console.error('Resend OTP Error:', error);
    } finally {
      setResending(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setVerifying(true);
      setError('');

      const otpString = otp.join('');
      if (otpString.length !== 6) {
        setError('Please enter a valid 6-digit OTP');
        return;
      }

      const response = (await verifyOTP(phoneNumber, otpString)) as ApiResponse;
      console.log(response);
      if (response.data?.success) {
        if (onVerificationSuccess) {
          onVerificationSuccess();
        }
        onClose();
      } else {
        setError(response.data?.message || 'Invalid OTP');
      }
      // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Error verifying OTP');
      console.error('Verify OTP Error:', error);
    } finally {
      setVerifying(false);
    }
  };

  const isOtpFilled = otp.every(d => d !== '');

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
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

        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                digit ? styles.otpInputFilled : styles.otpInputEmpty,
                error ? styles.otpInputError : null,
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={value => handleOTPChange(value, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              autoFocus={index === 0 && isVisible}
            />
          ))}
        </View>

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
                <ActivityIndicator size="small" color="#6200ee" />
              ) : (
                <Text style={styles.resendLink}>Resend OTP</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.verifyButton,
            (!isOtpFilled || verifying) && styles.verifyButtonDisabled,
          ]}
          onPress={handleVerifyOTP}
          disabled={!isOtpFilled || verifying}>
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
