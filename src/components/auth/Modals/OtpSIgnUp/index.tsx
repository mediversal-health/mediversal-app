import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {verifyRegisterUser, RegisterUser} from '../../../../Services/auth';
import {RootStackParamList} from '../../../../navigation';
import styles from './index.styles';

interface OTPModalProps {
  isVisible: boolean;
  onClose: () => void;
  email: string;
  password: string;
}

const OtpSignUpModal: React.FC<OTPModalProps> = ({
  isVisible,
  onClose,
  email,
  password,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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

  const isOtpFilled = otp.every(d => d !== '');

  const handleVerifyOTP = async () => {
    if (!isOtpFilled) {
      return;
    }

    const enteredOTP = otp.join('');
    setLoading(true);

    try {
      const res = await verifyRegisterUser(email, enteredOTP, password);
      if (res.status === 200 || res.data?.success) {
        Alert.alert('Success', 'OTP verification successful');
        onClose();
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      } else {
        Alert.alert('Error', res.data?.message || 'Invalid OTP');
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      const response = await RegisterUser(email, password);
      setResendLoading(false);

      if (response.status === 200 || response.data?.success) {
        Alert.alert('Success', 'OTP resent to your email.');
        setOtp(Array(6).fill(''));
        setTimer(60);
      } else {
        Alert.alert('Error', response.data?.message || 'Resend failed');
      }
    } catch (error: any) {
      setResendLoading(false);
      const message =
        (error as any)?.response?.data?.message || 'Something went wrong';
      Alert.alert('Error', message);
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.container}>
              <Text style={styles.title}>Email Verification</Text>
              <Text style={styles.subtitle}>
                We've sent a 6-digit OTP to your email. Please enter it below.
              </Text>

              <TouchableOpacity onPress={onClose} style={styles.changeEmail}>
                <Text style={styles.grayText}>
                  Wrong email? <Text style={styles.linkText}>Change Email</Text>
                </Text>
              </TouchableOpacity>

              <View style={styles.emailBox}>
                <Text style={styles.emailText}>{email}</Text>
              </View>

              <View style={styles.otpRow}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref: TextInput | null) => {
                      inputRefs.current[index] = ref;
                    }}
                    style={[
                      styles.otpInput,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {borderColor: digit ? '#0088B1' : '#ccc'},
                    ]}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={value => handleOTPChange(value, index)}
                  />
                ))}
              </View>

              {timer > 0 ? (
                <Text style={styles.timerText}>
                  Didn’t get OTP? Resend in{' '}
                  <Text style={styles.linkText}>{timer}s</Text>
                </Text>
              ) : (
                <TouchableOpacity
                  onPress={handleResendOTP}
                  disabled={resendLoading}>
                  {resendLoading ? (
                    <ActivityIndicator size="small" color="#0088B1" />
                  ) : (
                    <Text style={styles.linkText}>Resend OTP</Text>
                  )}
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.button,
                  isOtpFilled ? styles.filledButton : styles.outlineButton,
                ]}
                disabled={!isOtpFilled || loading}
                onPress={handleVerifyOTP}>
                {loading ? (
                  <ActivityIndicator color="#f8f8f8" />
                ) : (
                  <Text
                    style={[
                      styles.buttonText,
                      !isOtpFilled && styles.primaryText,
                    ]}>
                    Verify & Continue
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OtpSignUpModal;
