import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import styles from './index.styles';
import {forgotPassword} from '../../../../Services/auth';
import OtpForgotPasswordModal from '../OtpForgotPassword';
interface EmailForgotPasswordModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const EmailForgotPasswordModal: React.FC<EmailForgotPasswordModalProps> = ({
  isVisible,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);

  const isValidEmail = (inputEmail: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);

  const handleForgotPassword = async () => {
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      const response = await forgotPassword(email, 'email');
      setLoading(false);

      // eslint-disable-next-line eqeqeq
      if (response.data && response.data.success == true) {
        setForgotPasswordVisible(true);
      } else {
        setEmailError(response.data?.message || 'Invalid OTP');
      }
    } catch (error) {
      setLoading(false);
      const errorMessage =
        (error as any)?.response?.data?.message ||
        'Something went wrong. Please try again.';
      setEmailError(errorMessage);
    }
  };

  return (
    <>
      <Modal
        isVisible={isVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        swipeDirection={['down']}
        backdropOpacity={0.5}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <View style={styles.container}>
          <Text style={styles.title}>Reset Your Password</Text>
          <Text style={styles.subtitle}>
            Please enter the registered email below to reset your password
          </Text>

          <View
            style={[
              styles.inputWrapper,
              // eslint-disable-next-line react-native/no-inline-styles
              isEmailFocused && {borderColor: '#0088B1'},
            ]}>
            <TextInput
              placeholder="mediversal@gmail.com"
              placeholderTextColor="#b3b3b3"
              value={email}
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              style={styles.input}
            />
          </View>

          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <TouchableOpacity
            style={[
              styles.button,
              isValidEmail(email)
                ? styles.buttonEnabled
                : styles.buttonDisabled,
            ]}
            disabled={!isValidEmail(email) || loading}
            onPress={() => {
              handleForgotPassword();
            }}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                style={[
                  styles.buttonText,
                  // eslint-disable-next-line react-native/no-inline-styles
                  isValidEmail(email) ? {color: '#fff'} : {color: '#0088B1'},
                ]}>
                Send OTP
              </Text>
            )}
          </TouchableOpacity>

          {/* Help Link */}
          <TouchableOpacity style={styles.helpWrapper}>
            <Text style={styles.helpText}>Need Help?</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {forgotPasswordVisible && (
        <OtpForgotPasswordModal
          isVisible={forgotPasswordVisible}
          onClose={() => setForgotPasswordVisible(false)}
          email={email}
        />
      )}
    </>
  );
};

export default EmailForgotPasswordModal;
