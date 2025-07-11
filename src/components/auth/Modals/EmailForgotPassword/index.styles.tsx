import {StyleSheet} from 'react-native';
import {Fonts} from '../../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 30,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  title: {
    fontSize: 22,
    color: '#0088B1',
    marginBottom: 10,
    fontFamily: Fonts.JakartaBold,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 20,
    fontFamily: Fonts.JakartaRegular,
  },
  inputWrapper: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    height: 45,
    fontSize: 16,
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonEnabled: {
    backgroundColor: '#0088B1',
  },
  buttonDisabled: {
    borderWidth: 1,
    borderColor: '#0088B1',
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.JakartaRegular,
  },
  helpWrapper: {
    marginTop: 30,
    alignItems: 'center',
  },
  helpText: {
    fontSize: 14,
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
  },
});
export default styles;
