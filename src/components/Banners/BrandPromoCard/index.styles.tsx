import {Platform, StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Platform.OS === 'ios' ? -10 : 16,
    marginVertical: Platform.OS === 'ios' ? 0 : 8,
    borderRadius: 12,
  },
  gradientContainer: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
    paddingBottom: Platform.OS === 'ios' ? 35 : 0,
  },
  discountText: {
    fontSize: 24,
    fontFamily: Fonts.JakartaBold,
    color: '#0088B1',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: '#161D1F',
    fontFamily: Fonts.JakartaSemiBold,
    marginBottom: 4,
  },
  validityText: {
    fontSize: 12,
    color: '#899193',
    fontFamily: Fonts.JakartaSemiBold,
  },
  imageContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Platform.OS === 'ios' ? 30 : 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default styles;
