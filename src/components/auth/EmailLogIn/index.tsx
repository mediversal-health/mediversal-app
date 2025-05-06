import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Eye, EyeOff} from 'lucide-react-native';
import styles from './index.styles';
import GoogleLoginButton from '../../ui/GoogleLoginButton';
const EmailLoginDesign = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  return (
    <View>
      {/* Email Input */}
      <TextInput
        style={[
          styles.input,
          isEmailFocused && styles.focusedInput,
          showErrors && !email && styles.errorBorder,
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

      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.input,
            styles.passwordInput,
            showErrors && !password && styles.errorBorder,
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
            <EyeOff size={22} color="#0088b1" />
          ) : (
            <Eye size={22} color="#0088b1" />
          )}
        </TouchableOpacity>
      </View>
      {showErrors && !password && (
        <Text style={styles.errorText}>Password is required</Text>
      )}

      <View style={styles.forgotContainer}>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} disabled={loading}>
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

export default EmailLoginDesign;
