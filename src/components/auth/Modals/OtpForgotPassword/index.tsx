import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import { forgotPassword, verifyResetOtp } from '../../../../Services/auth';
import ResetPasswordModal from '../ResetPassword';
import styles from './index.styles';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

interface OtpForgotPasswordModalProps {
  isVisible: boolean;
  onClose: () => void;
  email: string;
}

const CELL_COUNT = 6;

const OtpForgotPasswordModal: React.FC<OtpForgotPasswordModalProps> = ({
  isVisible,
  onClose,
  email,
}) => {
  const [otpValue, setOtpValue] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [showResetModal, setShowResetModal] = useState(false);
  const [error, setError] = useState<string>('');
  const [resendLoading, setResendLoading] = useState(false);

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

  const isOtpFilled: boolean = otpValue.length === 6;

  const handleVerifyOTP = async (): Promise<void> => {
    if (!isOtpFilled) return;

    setLoading(true);
    setError('');

    try {
      const response = await verifyResetOtp(email, otpValue, 'email');
      setLoading(false);
      if (response.data && response.data.success === true) {
        setShowResetModal(true);
      } else {
        setError(response.data?.message || 'Invalid OTP');
      }
    } catch (error: any) {
      setLoading(false);
      setError(error?.response?.data?.message || 'Error verifying OTP');
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      setError('');

      const response = await forgotPassword(email, 'email');
      setResendLoading(false);

      if (response.data && response.data.success === true) {
        Alert.alert('Otp sent Successfully');
        setOtpValue('');
        setTimer(60);
      } else {
        setError(response.data?.message || 'Failed to resend OTP');
        Alert.alert('Error', response.data.message || 'Try again.');
      }
    } catch (error: any) {
      setResendLoading(false);
      const errorMessage =
        (error as any)?.response?.data?.message ||
        'Something went wrong. Please try again.';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <>
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
            <Text style={styles.title}>Verify to Reset Password</Text>
            <Text style={styles.subtitle}>
              We've sent a 6-digit OTP to your email. Please enter it here.
            </Text>

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
              editable={false}
            />
          </View>

          <CodeField
            ref={ref}
            {...props}
            value={otpValue}
            onChangeText={setOtpValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.forgotOtpRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                style={[
                  styles.forgotOtpCell,
                  {
                    borderColor: error
                      ? '#ff3b30'
                      : isFocused
                      ? '#0088B1'
                      : '#d3d3d3',
                  },
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                <Text style={styles.forgotOtpText}>
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
