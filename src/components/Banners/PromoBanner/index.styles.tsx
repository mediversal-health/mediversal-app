import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E8F4F7',
    borderRadius: 8,
    padding: 8,
  },
  buttonText: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
  },
  container: {
    borderColor: '#afb3b0',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  subtitle: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
  },
  title: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
  },
});
export default styles;
