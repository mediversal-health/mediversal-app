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
import {useAuthStore} from '../../../../store/authStore';
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

const OtpEmailModal: React.FC<OTPModalProps> = ({
  isVisible,
  onClose,
  email,
  password,
}) => {
  const [otpValue, setOtpValue] = useState('');
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
  const setAuthentication = useAuthStore(state => state.setAuthentication);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const ref = useBlurOnFulfill({value: otpValue, cellCount: CELL_COUNT});
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

  const isOtpFilled = otpValue.length === CELL_COUNT;

  const handleVerifyOTP = async () => {
    if (!isOtpFilled) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await verifyOTP(email, otpValue, 'email');
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
        setError(response.data?.message || 'Invalid OTP');
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

      const response = await sendOTP(email, password, 'email');
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
      onBackdropPress={undefined}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      animationOut="slideOutDown"
      animationOutTiming={250}>
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
          rootStyle={styles.emailOtpRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={[
                styles.emailOtpCell,
                {
                  borderColor: error
                    ? '#ff3b30'
                    : isFocused
                    ? '#0088B1'
                    : '#d3d3d3',
                },
              ]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={styles.emailOtpText}>
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

export default OtpEmailModal;
