import { StyleSheet } from 'react-native';
import { Fonts } from '../../../../styles/fonts';

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
    fontFamily: Fonts.JakartaBold,
    color: '#0088B1',
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 14,
    color: '#7f7f7f',
    alignSelf: 'flex-start',
    paddingBottom: 20,
    fontFamily: Fonts.JakartaRegular,
  },
  editLink: {
    color: '#7f7f7f',
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
  },
  editLinkHighlight: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
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
    backgroundColor: 'red',
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
    fontFamily: Fonts.JakartaRegular,
  },
  timerText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
  },
  resendButton: {
    minHeight: 20,
    justifyContent: 'center',
  },
  resendLink: {
    color: '#0088B1',
    fontWeight: '600',
    fontFamily: Fonts.JakartaSemiBold,
  },
  verifyButton: {
    marginTop: 24,
    paddingVertical: 14,
    width: '100%',
    backgroundColor: '#0088B1',
    borderRadius: 10,
    alignItems: 'center',
    fontFamily: Fonts.JakartaRegular,
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
    fontFamily: Fonts.JakartaRegular,
  },
  disabledText: {
    color: '#0088B1',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
    fontFamily: Fonts.JakartaRegular,
  },
  otpRoot: {
    marginVertical: 20,
    justifyContent: 'center',
  },
  otpCell: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  otpText: {
    fontSize: 18,
    color: '#333',
  },
});
export default styles;
