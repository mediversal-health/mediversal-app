import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import CountryPickerComponent from '../../ui/CountryPicker';
import { Country } from 'react-native-country-picker-modal';
import styles from './index.styles';
import OtpMobileModal from '../Modals/OtpMobile';
import { sendOTP } from '../../../Services/auth';

interface OTPResponse {
  data?: {
    success: boolean;
    message?: string;
  };
  response?: {
    data?: {
      message?: string;
    };
  };
}

const MobileLogin = () => {
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isMobileFocused, setIsMobileFocused] = useState<boolean>(false);
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const inputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: 150,
            animated: true,
          });
        }, 100);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    useEffect(() => {
      if (keyboardVisible) {
        console.log('Keyboard opened');
      } else {
        console.log('Keyboard closed');
      }
    }, [keyboardVisible]);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleMobileInputChange = (text: string) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    setMobileNumber(formattedText);

    if (error) {
      setError('');
    }
  };

  const handleCountrySelect = (country: Country) => {
    console.log('Selected country:', country);
  };

  const validateMobileNumber = (): boolean => {
    if (!mobileNumber.trim()) {
      setError('Mobile number is required');
      return false;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      setError('Please enter a valid 10-digit number');
      return false;
    }

    return true;
  };

  const handleSendOTP = async () => {
    if (!validateMobileNumber()) {
      return;
    }

    try {
      setLoading(true);
      const response = (await sendOTP(
        mobileNumber,
        '',
        'phone',
      )) as OTPResponse;
      console.log('OTP API Response:', response);

      if (response.data && response.data.success === true) {
        console.log('Setting showOtpModal to true');
        setShowOtpModal(true);
      } else {
        Alert.alert('Error', response.data?.message || 'Failed to send OTP');
      }
      // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
    } catch (error: any) {
      console.error('OTP Error:', error);
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to send OTP',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [showOtpModal]);

  const handleCloseModal = () => {
    console.log('Closing OTP modal');
    setShowOtpModal(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[styles.container]}
      >
        <View style={styles.inputRow}>
          <View style={styles.countryCodeBox}>
            <CountryPickerComponent onSelectCountry={handleCountrySelect} />
          </View>

          <View
            style={[
              styles.mobileInputContainer,
              isMobileFocused && styles.focusedInput,
              error ? styles.errorInput : null,
            ]}
          >
            <TextInput
              ref={inputRef}
              style={styles.mobileInput}
              placeholder="98765-43210"
              keyboardType="numeric"
              value={mobileNumber}
              onChangeText={handleMobileInputChange}
              maxLength={10}
              placeholderTextColor="#b3b3b3"
              onFocus={() => {
                setIsMobileFocused(true);
                setTimeout(() => {
                  scrollViewRef.current?.scrollTo({
                    y: 150,
                    animated: true,
                  });
                }, 100);
              }}
              onBlur={() => setIsMobileFocused(false)}
            />
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.otpButton, loading ? styles.disabledButton : null]}
          onPress={handleSendOTP}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.otpButtonText}>Send OTP</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By logging in, you agree to our{' '}
          <Text style={styles.termsHighlight}>Terms & Conditions</Text>
        </Text>

        <OtpMobileModal
          isVisible={showOtpModal}
          onClose={handleCloseModal}
          onGoBack={() => setShowOtpModal(false)}
          phoneNumber={mobileNumber}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MobileLogin;
