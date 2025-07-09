import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 8,
    width: '100%',
  },
  countryCodeBox: {
    backgroundColor: '#f8f8f8',
    borderColor: '#e0e0e0',
    borderRadius: 12,
    borderWidth: 1,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  disabledButton: {
    opacity: 0.7,
  },

  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginTop: 4,
  },
  focusedInput: {
    borderColor: '#0088b1',
  },
  inputRow: {
    alignItems: 'center',
    columnGap: 12,
    flexDirection: 'row',
    height: 50,
    width: '100%',
  },
  mobileInput: {
    color: '#000000',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
    paddingLeft: 12,
    width: '100%',
  },
  mobileInputContainer: {
    backgroundColor: '#f8f8f8',
    borderColor: '#e0e0e0',
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    minHeight: 50,
    padding: 4,
  },
  otpButton: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 12,
    marginTop: 24,
    padding: 16,
    width: '100%',
  },
  otpButtonText: {
    color: '#F8F8F8',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 16,
    textAlign: 'center',
  },
  termsHighlight: {
    color: '#000000',
  },
  termsText: {
    color: '#666666',
    fontSize: 12,
    padding: 40,
    textAlign: 'center',
  },
});
export default styles;
