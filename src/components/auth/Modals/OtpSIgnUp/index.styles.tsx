import { StyleSheet } from 'react-native';
import { Fonts } from '../../../../styles/fonts';

const styles = StyleSheet.create({
  blueText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
  },
  changeEmailContainer: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  changeEmailText: {
    fontSize: 16,
  },
  disabledText: {
    color: '#0088B1',
  },
  emailInput: {
    color: '#666',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
    height: 40,
  },
  emailInputContainer: {
    alignSelf: 'stretch',
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    paddingVertical: 4,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  grayText: {
    color: '#666',
    fontFamily: Fonts.JakartaRegular,
  },
  headerContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 32,
  },
  otpContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  otpInput: {
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 18,
    fontWeight: 'bold',
    height: 48,
    textAlign: 'center',
    width: 48,
  },
  otpInputEmpty: {
    borderColor: '#ccc',
  },
  otpInputFilled: {
    borderColor: '#0088B1',
  },
  resendText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
  },
  signUpOtpCell: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1.5,
    height: 48,
    justifyContent: 'center',
    marginHorizontal: 5,
    width: 48,
  },
  signUpOtpRoot: {
    justifyContent: 'center',
    marginVertical: 20,
  },
  signUpOtpText: {
    color: '#333',
    fontSize: 18,
  },
  subtitle: {
    color: '#666',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
    marginBottom: 12,
  },
  timerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 12,
    width: '100%',
  },
  timerText: {
    fontWeight: 'bold',
  },
  title: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
    fontSize: 24,
    marginBottom: 12,
  },
  verifyButton: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 10,
    marginTop: 24,
    paddingVertical: 14,
    width: '100%',
  },
  verifyButtonDisabled: {
    backgroundColor: 'transparent',
    borderColor: '#0088B1',
    borderWidth: 1,
  },
  verifyButtonLoading: {
    backgroundColor: '#0088B1',
  },
  verifyButtonText: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
  },
});

export default styles;
