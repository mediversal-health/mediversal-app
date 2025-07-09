/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import React, {useState, useEffect, useCallback} from 'react';
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

const CELL_COUNT = 6;

const OtpMobileModal: React.FC<OTPModalProps> = ({
  isVisible,
  onGoBack,
  phoneNumber,
}) => {
  const [otpValue, setOtpValue] = useState('');
  const [timer, setTimer] = useState(60);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const setAuthentication = useAuthStore(state => state.setAuthentication);
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);

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
      if (interval) clearInterval(interval);
    };
  }, [isVisible, timer]);

  useEffect(() => {
    if (otpValue.length === CELL_COUNT) {
      handleVerifyOTP(otpValue);
    }
  }, [otpValue]);

  const handleVerifyOTP = useCallback(
    async (code?: string) => {
      try {
        setVerifying(true);
        setError('');
        const otpToVerify = code || otpValue;

        if (otpToVerify.length !== 6) {
          setError('Please enter a valid 6-digit OTP');
          return;
        }

        const response = (await verifyOTP(
          phoneNumber,
          otpToVerify,
          'phone',
        )) as ApiResponse;

        if (response.data?.success) {
          setAuthentication({
            token: response.data.token as string,
            customer_id: response.data.user.customer_id,
            phoneNumber: phoneNumber,
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
        setVerifying(false);
      }
    },
    [otpValue, phoneNumber, setAuthentication, navigation, setIsAuthenticated],
  );

  const handleResendOTP = async () => {
    try {
      setResending(true);
      setError('');

      const response = (await sendOTP(phoneNumber, '', 'phone')) as ApiResponse;

      if (response.data?.success) {
        setTimer(60);
        setOtpValue('');
        Alert.alert('Success', 'OTP sent successfully');
      } else {
        setError(response.data?.message || 'Failed to resend OTP');
      }
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Error resending OTP');
    } finally {
      setResending(false);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={undefined}
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

        <CodeField
          ref={ref}
          {...props}
          value={otpValue}
          onChangeText={setOtpValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.otpRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={[
                styles.otpCell,
                {
                  borderColor: error
                    ? '#ff3b30'
                    : isFocused
                    ? '#0088B1'
                    : '#d3d3d3',
                },
              ]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={styles.otpText}>
                {symbol || (isFocused ? <Cursor /> : '')}
              </Text>
            </View>
          )}
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
            otpValue.length !== CELL_COUNT ? styles.verifyButtonDisabled : null,
          ]}
          onPress={() => handleVerifyOTP()}
          disabled={otpValue.length !== CELL_COUNT || verifying}
          activeOpacity={0.8}>
          {verifying ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text
              style={[
                styles.verifyButtonText,
                otpValue.length !== CELL_COUNT && styles.disabledText,
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
