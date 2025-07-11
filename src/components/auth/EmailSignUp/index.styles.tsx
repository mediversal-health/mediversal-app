import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
  },
  button: {
    backgroundColor: '#0088B1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
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
    fontSize: 18,
    color: '#333',
    fontFamily: Fonts.JakartaRegular,
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666666',
    padding: 40,
    fontFamily: Fonts.JakartaRegular,
  },
  termsHighlight: {
    color: '#000000',
    fontFamily: Fonts.JakartaRegular,
  },
  haveAccountText: {
    color: '#0088B1',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
  },
});
export default styles;
