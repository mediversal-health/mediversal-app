import { StyleSheet } from 'react-native';
import { Fonts } from '../../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
  },
  disabledText: {
    color: '#0088B1',
  },
  editLink: {
    color: '#7f7f7f',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
  },
  editLinkHighlight: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
  },
  errorText: {
    color: '#ff3b30',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  otpCell: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1.5,
    height: 48,
    justifyContent: 'center',
    marginHorizontal: 5,
    width: 48,
  },
  otpInput: {
    backgroundColor: 'red',
    borderRadius: 8,
    fontSize: 18,
    fontWeight: 'bold',
    height: 48,
    textAlign: 'center',
    width: 48,
  },
  otpInputEmpty: {
    borderColor: '#d3d3d3',
    borderWidth: 1,
  },
  otpInputFilled: {
    borderColor: '#0088B1',
    borderWidth: 1.5,
  },
  otpRoot: {
    justifyContent: 'center',
    marginVertical: 20,
  },
  otpRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  otpText: {
    color: '#333',
    fontSize: 18,
  },
  resendButton: {
    justifyContent: 'center',
    minHeight: 20,
  },
  resendLink: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontWeight: '600',
  },
  resendRow: {
    marginTop: 16,
  },
  resendText: {
    color: '#7f7f7f',
    fontFamily: Fonts.JakartaRegular,
  },
  subtitle: {
    alignSelf: 'flex-start',
    color: '#7f7f7f',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
    paddingBottom: 20,
  },
  timerText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
  },
  title: {
    alignSelf: 'flex-start',
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
    fontSize: 28,
  },
  verifyButton: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 10,
    fontFamily: Fonts.JakartaRegular,
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
