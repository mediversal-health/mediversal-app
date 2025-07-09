import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 8,
    padding: 16,
  },
  buttonText: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
  },
  container: {
    marginTop: 50,
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
  haveAccountText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
    fontWeight: '600',
  },
  helpContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  helpText: {
    color: '#333',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 18,
  },
  input: {
    borderColor: '#ddd',
    borderRadius: 8,
    borderWidth: 1,
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
    marginBottom: 20,
    padding: 14,
  },
  passwordContainer: {
    alignItems: 'center',
    borderColor: '#ddd',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 14,
  },
  passwordInput: {
    color: '#000',
    flex: 1,
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
    paddingVertical: 14,
  },
  termsHighlight: {
    color: '#000000',
    fontFamily: Fonts.JakartaRegular,
  },
  termsText: {
    color: '#666666',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    padding: 40,
    textAlign: 'center',
  },
});
export default styles;
