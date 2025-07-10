import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#afb3b0',
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  title: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
  },
  subtitle: {
    color: '#0088B1',
    fontSize: 8,
    fontFamily: Fonts.JakartaRegular,
  },
  button: {
    backgroundColor: '#E8F4F7',
    borderRadius: 8,
    padding: 8,
  },
  buttonText: {
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
  },
});
export default styles;
