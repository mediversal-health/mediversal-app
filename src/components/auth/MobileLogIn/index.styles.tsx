import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    columnGap: 12,
    height: 50,
  },
  countryCodeBox: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
  },

  mobileInputContainer: {
    flex: 1,
    padding: 4,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    minHeight: 50,
    height: '100%',
    justifyContent: 'center',
  },
  focusedInput: {
    borderColor: '#0088b1',
  },
  mobileInput: {
    width: '100%',
    fontSize: 16,
    paddingLeft: 12,
    color: '#000000',
    fontFamily: Fonts.JakartaRegular,
  },
  otpButton: {
    backgroundColor: '#0088B1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
  },
  otpButtonText: {
    fontSize: 16,
    fontFamily: Fonts.JakartaSemiBold,
    textAlign: 'center',
    color: '#F8F8F8',
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666666',
    padding: 40,
  },
  termsHighlight: {
    color: '#000000',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    marginBottom: 10,
    fontSize: 12,
  },
  errorInput: {
    borderColor: 'red',
  },
  disabledButton: {
    opacity: 0.7,
  },
});
export default styles;
