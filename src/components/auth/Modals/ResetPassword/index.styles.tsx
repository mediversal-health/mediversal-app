import { StyleSheet } from 'react-native';
import { Fonts } from '../../../../styles/fonts';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#0088b1',
    borderRadius: 12,
    marginTop: 10,
    paddingVertical: 14,
  },
  buttonText: {
    color: '#f8f8f8',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 16,
  },
  container: {
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
  icon: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  input: {
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    color: '#333',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
    height: 48,
    paddingHorizontal: 16,
    paddingRight: 48, // space for icon
  },
  inputWrapper: {
    fontFamily: Fonts.JakartaRegular,
    marginBottom: 16,
    position: 'relative',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  subtitle: {
    color: '#666',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
    marginBottom: 20,
  },
  title: {
    color: '#0088b1',
    fontFamily: Fonts.JakartaBold,
    fontSize: 22,
    marginBottom: 8,
  },
});
export default styles;
