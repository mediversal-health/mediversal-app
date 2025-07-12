import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E8E9',
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 10,
    fontFamily: Fonts.JakartaMedium,
    color: '#161D1F',
  },
});
export default styles;
