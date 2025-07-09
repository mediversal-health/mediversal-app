import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  dividerLine: {
    backgroundColor: '#ccc',
    flex: 1,
    height: 1,
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 24,
  },
  dividerText: {
    color: '#999',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
    marginHorizontal: 12,
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 13,
    marginTop: 4,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 26,
  },
  focusedInput: {
    borderColor: '#0088b1',
    fontFamily: Fonts.JakartaRegular,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginTop: 16,
  },
  forgotText: {
    color: '#0088b1',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
  },
  googleButton: {
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    padding: 14,
  },
  googleText: {
    color: '#333',
    fontSize: 15,
  },
  helpContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  helpText: {
    color: '#333',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
  },
  input: {
    borderColor: '#ccc',
    borderRadius: 12,
    borderWidth: 1,
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
    marginTop: 12,
    padding: 14,
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 12,
    marginTop: 16,
    paddingVertical: 16,
  },
  loginText: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
  },
  passwordContainer: {
    justifyContent: 'center',
    position: 'relative',
  },
  passwordInput: {
    fontFamily: Fonts.JakartaRegular,
    paddingRight: 45,
  },
});
export default styles;
