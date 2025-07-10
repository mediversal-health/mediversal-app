import { StyleSheet } from 'react-native';
import { Fonts } from '../../../../styles/fonts';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    padding: 24,
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.JakartaBold,
    color: '#0088b1',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontFamily: Fonts.JakartaRegular,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 16,
    fontFamily: Fonts.JakartaRegular,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    paddingRight: 48,
    fontFamily: Fonts.JakartaRegular, // space for icon
  },
  icon: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  button: {
    backgroundColor: '#0088b1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#f8f8f8',
    fontSize: 16,
    fontFamily: Fonts.JakartaSemiBold,
  },
});
export default styles;
