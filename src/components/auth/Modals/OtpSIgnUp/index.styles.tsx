import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  headerContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    marginBottom: 12,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0088B1',
  },
  subtitle: {
    marginBottom: 12,
    fontSize: 16,
    color: '#666',
  },
  changeEmailContainer: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  changeEmailText: {
    fontSize: 16,
  },
  grayText: {
    color: '#666',
  },
  blueText: {
    color: '#0088B1',
  },
  emailInputContainer: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 8,
    paddingVertical: 4,
    marginBottom: 12,
  },
  emailInput: {
    fontSize: 16,
    color: '#666',
    height: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  otpInput: {
    width: 48,
    height: 48,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  otpInputEmpty: {
    borderColor: '#ccc',
  },
  otpInputFilled: {
    borderColor: '#0088B1',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 12,
    marginBottom: 12,
  },
  timerText: {
    fontWeight: 'bold',
  },
  resendText: {
    fontWeight: 'bold',
    color: '#0088B1',
  },
  verifyButton: {
    marginTop: 24,
    paddingVertical: 14,
    width: '100%',
    backgroundColor: '#0088B1',
    borderRadius: 10,
    alignItems: 'center',
  },
  verifyButtonDisabled: {
    borderWidth: 1,
    borderColor: '#0088B1',
    backgroundColor: 'transparent',
  },
  verifyButtonLoading: {
    backgroundColor: '#0088B1',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  disabledText: {
    color: '#0088B1',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default styles;
