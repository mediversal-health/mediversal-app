import { StyleSheet } from 'react-native';
import { Fonts } from '../../../../styles/fonts';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 20,
    paddingVertical: 14,
  },
  buttonDisabled: {
    backgroundColor: 'transparent',
    borderColor: '#0088B1',
    borderWidth: 1,
  },
  buttonEnabled: {
    backgroundColor: '#0088B1',
  },
  buttonText: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    width: '100%',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  helpText: {
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
  },
  helpWrapper: {
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
    height: 45,
  },
  inputWrapper: {
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  subtitle: {
    color: '#6B7280',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 15,
    marginBottom: 20,
  },
  title: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
    fontSize: 22,
    marginBottom: 10,
  },
});
export default styles;
