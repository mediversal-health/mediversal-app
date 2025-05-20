import React, {useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

interface CustomOtpInputProps {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  error: string;
  isVisible: boolean;
}

const CustomOtpInput: React.FC<CustomOtpInputProps> = ({
  otp,
  setOtp,
  error,
  isVisible,
}) => {
  const inputRefs = useRef<(TextInput | null)[]>(Array(6).fill(null));

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isVisible]);

  const handleOTPChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    if (value.length > 1 && index === 0) {
      // Handle paste operation
      const pastedOtp = value.substring(0, 6).split('');
      for (let i = 0; i < pastedOtp.length; i++) {
        newOtp[i] = pastedOtp[i];
      }
      setOtp(newOtp);

      const lastIndex = Math.min(pastedOtp.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.otpRow}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref: TextInput | null): void => {
            inputRefs.current[index] = ref;
          }}
          style={[
            styles.otpInput,
            digit ? styles.otpInputFilled : styles.otpInputEmpty,
            error ? styles.otpInputError : null,
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={value => handleOTPChange(value, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          autoFocus={index === 0 && isVisible}
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
  },
  otpInput: {
    width: 48,
    height: 48,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.JakartaRegular,
  },
  otpInputFilled: {
    borderColor: '#0088B1',
    borderWidth: 1.5,
    fontFamily: Fonts.JakartaRegular,
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
