import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginTop: 12,
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
  },
  focusedInput: {
    borderColor: '#0088b1',
    fontFamily: Fonts.JakartaRegular,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
    fontFamily: Fonts.JakartaRegular,
  },
  errorBorder: {
    borderColor: 'red',
  },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 45,
    fontFamily: Fonts.JakartaRegular,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 26,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginTop: 16,
  },
  forgotText: {
    color: '#0088b1',
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
  },
  loginButton: {
    backgroundColor: '#0088B1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Fonts.JakartaRegular,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#999',
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
  },
  googleButton: {
    padding: 14,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    alignItems: 'center',
  },
  googleText: {
    color: '#333',
    fontSize: 15,
  },
  helpContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  helpText: {
    fontSize: 14,
    color: '#333',
    fontFamily: Fonts.JakartaRegular,
  },
});
export default styles;
