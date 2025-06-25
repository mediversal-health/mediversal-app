import React, {useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet, Keyboard} from 'react-native'; // Import Keyboard
import {Fonts} from '../../../styles/fonts';

interface CustomOtpInputProps {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  error: string;
  isVisible: boolean;
  otpLength?: number;
  onOtpComplete?: (otpCode: string) => void; // Callback for when OTP is complete
}

const CustomOtpInput: React.FC<CustomOtpInputProps> = ({
  otp,
  setOtp,
  error,
  isVisible,
  otpLength = 6,
  onOtpComplete,
}) => {
  const inputRefs = useRef<(TextInput | null)[]>(Array(otpLength).fill(null));

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isVisible]);

  useEffect(() => {
    const fullOtp = otp.join('');
    if (fullOtp.length === otpLength) {
      inputRefs.current[otpLength - 1]?.blur();
      Keyboard.dismiss();
      if (onOtpComplete) {
        onOtpComplete(fullOtp);
      }
    } else {
      const firstEmptyIndex = otp.findIndex(char => char === '');
      if (firstEmptyIndex !== -1) {
        inputRefs.current[firstEmptyIndex]?.focus();
      }
    }
  }, [otp, otpLength, onOtpComplete]);

  const handleOTPChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    // Handle paste operation
    if (value.length > 1) {
      const pastedOtp = value.split('').slice(0, otpLength);
      const newOtp = [...otp];

      // Fill the OTP array with pasted values
      pastedOtp.forEach((char, i) => {
        if (i < otpLength) {
          newOtp[i] = char;
        }
      });

      setOtp(newOtp);

      // Focus on the last filled input or the last one if all are filled
      const lastFilledIndex = Math.min(pastedOtp.length, otpLength) - 1;
      inputRefs.current[lastFilledIndex]?.focus();
      return;
    }

    // Handle single digit input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus forward
    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Move focus backward on backspace
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.otpRow}>
      {Array(otpLength)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={[
              styles.otpInput,
              otp[index] ? styles.otpInputFilled : styles.otpInputEmpty,
              error ? styles.otpInputError : null,
            ]}
            keyboardType="number-pad"
            maxLength={6} // Allow pasting longer strings
            value={otp[index]}
            onChangeText={value => handleOTPChange(value, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            autoFocus={index === 0 && isVisible}
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    justifyContent: 'center', // Center the OTP inputs
  },
  otpInput: {
    width: 48,
    height: 48,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.JakartaRegular,
    color: '#333', // Ensure text color is visible
  },
  otpInputFilled: {
    borderColor: '#0088B1',
    borderWidth: 1.5,
  },
  otpInputEmpty: {
    borderColor: '#d3d3d3',
    borderWidth: 1,
  },
  otpInputError: {
    borderColor: '#ff3b30',
  },
});

export default CustomOtpInput;
