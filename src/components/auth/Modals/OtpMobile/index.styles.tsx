import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#f8f8f8',
    padding: 24,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0088B1',
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 14,
    color: '#7f7f7f',
    alignSelf: 'flex-start',
    paddingBottom: 20,
  },
  editLink: {
    color: '#7f7f7f',
    fontSize: 14,
  },
  editLinkHighlight: {
    color: '#0088B1',
    fontWeight: '500',
  },
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
  },
  otpInputFilled: {
    borderColor: '#0088B1',
    borderWidth: 1.5,
  },
  otpInputEmpty: {
    borderColor: '#d3d3d3',
    borderWidth: 1,
  },
  resendRow: {
    marginTop: 16,
  },
  resendText: {
    color: '#7f7f7f',
  },
  timerText: {
    color: '#0088B1',
  },
  resendButton: {
    minHeight: 20,
    justifyContent: 'center',
  },
  resendLink: {
    color: '#0088B1',
    fontWeight: '600',
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
    backgroundColor: 'rgba(0, 136, 177, 0.5)',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  disabledText: {
    color: '#fff',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  otpInputError: {
    borderColor: '#ff3b30',
  },
});
export default styles;
