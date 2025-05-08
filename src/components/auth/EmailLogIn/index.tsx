import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Eye, EyeOff} from 'lucide-react-native';
import styles from './index.styles';
import GoogleLoginButton from '../../ui/GoogleLoginButton';
import {sendOTP} from '../../../Services/auth';
import EmailForgotPasswordModal from '../Modals/EmailForgotPassword';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation';
const EmailLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isValidEmail = (inputEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const isValidPassword = (inputPassword: string) => {
    return inputPassword.length >= 6;
  };

  const handleLogin = async () => {
    setShowErrors(true);

    if (!email || !isValidEmail(email)) {
      return;
    }

    if (!password || !isValidPassword(password)) {
      return;
    }

    try {
      setLoading(true);
      const response = await sendOTP(email, password, 'email');
      setLoading(false);

      if (response.data?.success) {
        navigation.navigate('Layout');
      } else {
        Alert.alert(response.data?.message || 'Invalid OTP');
      }
    } catch (error) {
      setLoading(false);
      const errorMessage =
        (error as any)?.response?.data?.message ||
        'Something went wrong. Please try again.';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          isEmailFocused && styles.focusedInput,
          showErrors && (!email || !isValidEmail(email)) && styles.errorBorder,
        ]}
        placeholder="mediversal@gmail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#b3b3b3"
        onFocus={() => setIsEmailFocused(true)}
        onBlur={() => setIsEmailFocused(false)}
      />
      {showErrors && !email && (
        <Text style={styles.errorText}>Email is required</Text>
      )}
      {showErrors && email && !isValidEmail(email) && (
        <Text style={styles.errorText}>Please enter a valid email</Text>
      )}

      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.input,
            styles.passwordInput,
            showErrors &&
              (!password || !isValidPassword(password)) &&
              styles.errorBorder,
          ]}
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor="#b3b3b3"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(prev => !prev)}>
          {isPasswordVisible ? (
            <Eye size={22} color="#0088b1" />
          ) : (
            <EyeOff size={22} color="#0088b1" />
          )}
        </TouchableOpacity>
      </View>
      {showErrors && !password && (
        <Text style={styles.errorText}>Password is required</Text>
      )}
      {showErrors && password && !isValidPassword(password) && (
        <Text style={styles.errorText}>
          Password should be at least 6 characters
        </Text>
      )}

      <View style={styles.forgotContainer}>
        <TouchableOpacity onPress={() => setForgotModalVisible(true)}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <EmailForgotPasswordModal
        isVisible={forgotModalVisible}
        onClose={() => setForgotModalVisible(false)}
      />

      <TouchableOpacity
        style={styles.loginButton}
        disabled={loading}
        onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or Login with</Text>
        <View style={styles.dividerLine} />
      </View>

      <GoogleLoginButton />

      <View style={styles.helpContainer}>
        <TouchableOpacity>
          <Text style={styles.helpText}>Need Help?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailLogin;
