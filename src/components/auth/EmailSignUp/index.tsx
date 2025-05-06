import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Alert, Text} from 'react-native';
import {Eye, EyeOff} from 'lucide-react-native';
import styles from './index.styles';
import GoogleLoginButton from '../../ui/GoogleLoginButton';
const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    Alert.alert('Success', `Account created for ${email}`);
  };

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="monish.ranjan@mediversal.in"
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
          secureTextEntry={!showPassword}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Eye size={20} color="#0088B1" />
          ) : (
            <EyeOff size={20} color="#0088B1" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Eye size={20} color="#0088B1" />
          ) : (
            <EyeOff size={20} color="#0088B1" />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or Login with</Text>
        <View style={styles.dividerLine} />
      </View>

      <GoogleLoginButton />

      <View style={styles.helpContainer}>
        <TouchableOpacity>
          <Text style={styles.helpText}>
            Already have an account?{' '}
            <Text style={styles.haveAccountText}> Login</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.termsText}>
        By logging in, you agree to our{' '}
        <Text style={styles.termsHighlight}>Terms & Conditions</Text>
      </Text>
    </>
  );
};

export default EmailSignup;
