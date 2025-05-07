import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {Eye, EyeOff} from 'lucide-react-native';
import {ResetPassword} from '../../../../Services/auth';
import styles from './index.styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../navigation';
interface ResetPasswordModalProps {
  isVisible: boolean;
  onClose: () => void;
  email: string;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isVisible,
  onClose,
  email,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await ResetPassword(email, password, 'email');
      setLoading(false);

      if (response.data?.success === true) {
        Alert.alert('Success', 'Password updated successfully!', [
          {text: 'OK', onPress: onClose},
        ]);
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      } else {
        Alert.alert('Error', response.data?.message || 'Update failed');
      }
    } catch (error: unknown) {
      setLoading(false);
      const errorMessage =
        (error as any)?.response?.data?.message || 'Something went wrong.';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <Modal isVisible={isVisible} style={styles.modal} onBackdropPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.subtitle}>
          Set a new password. Make sure it's different from the previous one.
        </Text>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="New Password"
            style={styles.input}
            placeholderTextColor="#999"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? (
              <Eye size={22} color="#0088b1" />
            ) : (
              <EyeOff size={22} color="#0088b1" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            placeholderTextColor="#999"
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }>
            {isConfirmPasswordVisible ? (
              <Eye size={22} color="#0088b1" />
            ) : (
              <EyeOff size={22} color="#0088b1" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={handleResetPassword}>
          {loading ? (
            <ActivityIndicator color="#f8f8f8" />
          ) : (
            <Text style={styles.buttonText}>Update Password</Text>
          )}
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ResetPasswordModal;
