import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Alert, Text} from 'react-native';
import {Eye, EyeOff} from 'lucide-react-native';
import styles from './index.styles';
import GoogleLoginButton from '../../ui/GoogleLoginButton';
import {RegisterUser} from '../../../Services/auth';
import OtpSignUpModal from '../Modals/OtpSIgnUp';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation';

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOTPModalVisible, setOTPModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const isValidPassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!isValidPassword(confirmPassword)) {
      Alert.alert(
        'Error',
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.',
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      console.log(email, confirmPassword);
      const response = await RegisterUser(email, confirmPassword);
      setLoading(false);

      if (response.status === 200 || response.data?.success) {
        setOTPModalVisible(true);
      } else {
        Alert.alert('Error', response.data?.message || 'Signup failed');
      }
    } catch (error: any) {
      setLoading(false);
      const message =
        (error as any)?.response?.data?.message || 'Something went wrong';
      Alert.alert('Error', message);
    }
  };

  const handleNavigate = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="name@mediversal.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#999"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword1}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => setShowPassword1(!showPassword1)}>
          {showPassword1 ? (
            <Eye size={20} color="#0088B1" />
          ) : (
            <EyeOff size={20} color="#0088B1" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword2}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)}>
          {showPassword2 ? (
            <Eye size={20} color="#0088B1" />
          ) : (
            <EyeOff size={20} color="#0088B1" />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Text>
      </TouchableOpacity>

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or Login with</Text>
        <View style={styles.dividerLine} />
      </View>

      <GoogleLoginButton />

      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={handleNavigate}>
          <Text style={styles.helpText}>
            Already have an account?
            <Text style={styles.haveAccountText}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.termsText}>
        By logging in, you agree to our
        <Text style={styles.termsHighlight}>Terms & Conditions</Text>
      </Text>

      <OtpSignUpModal
        isVisible={isOTPModalVisible}
        onClose={() => setOTPModalVisible(false)}
        email={email}
        password={password}
      />
    </>
  );
};

export default EmailSignup;
