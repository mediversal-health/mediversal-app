import {StyleSheet} from 'react-native';
import {FontColors, Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E8E9',
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    justifyContent: 'space-between',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  title: {
    color: FontColors.primary,
    fontFamily: Fonts.JakartaBold,
    fontSize: 14,
  },
  subtitle: {
    color: FontColors.primary,
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
  },
  button: {
    backgroundColor: FontColors.secondary,
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
