import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { verifyRegisterUser, RegisterUser } from '../../../../Services/auth';
import { RootStackParamList } from '../../../../navigation';
import styles from './index.styles';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

interface OTPModalProps {
  isVisible: boolean;
  onClose: () => void;
  email: string;
  password: string;
}

const CELL_COUNT = 6;

const OtpSignUpModal: React.FC<OTPModalProps> = ({
  isVisible,
  onClose,
  email,
  password,
}) => {
  const [otpValue, setOtpValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const ref = useBlurOnFulfill({ value: otpValue, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otpValue,
    setValue: setOtpValue,
  });

  useEffect(() => {
    if (isVisible) {
      setOtpValue('');
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

  const isOtpFilled = otpValue.length === 6;

  const handleVerifyOTP = async () => {
    if (!isOtpFilled) return;

    setLoading(true);
    setError('');

    try {
      const res = await verifyRegisterUser(email, otpValue, password);
      if (res.status === 200 || res.data?.success) {
        Alert.alert('Success', 'Account Created successfully');
        onClose();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } else {
        setError(res.data?.message || 'Invalid OTP');
      }
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      setError('');

      const response = await RegisterUser(email, password);
      setResendLoading(false);

      if (response.status === 200 || response.data?.success) {
        Alert.alert('Success', 'OTP resent to your email.');
        setOtpValue('');
        setTimer(60);
      } else {
        Alert.alert('Error', response.data?.message || 'Resend failed');
        setError(response.data?.message || 'Failed to resend OTP');
      }
    } catch (error: any) {
      setResendLoading(false);
      const message =
        (error as any)?.response?.data?.message || 'Something went wrong';
      setError(message);
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
      onBackdropPress={undefined}>
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

        <CodeField
          ref={ref}
          {...props}
          value={otpValue}
          onChangeText={setOtpValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.signUpOtpRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              key={index}
              style={[
                styles.signUpOtpCell,
                {
                  borderColor: error
                    ? '#ff3b30'
                    : isFocused
                    ? '#0088B1'
                    : '#d3d3d3',
                },
              ]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={styles.signUpOtpText}>
                {symbol || (isFocused ? <Cursor /> : '')}
              </Text>
            </View>
          )}
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

export default OtpSignUpModal;
