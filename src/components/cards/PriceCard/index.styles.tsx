import { Platform, StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  bottomHalf: {
    alignItems: 'center',
    backgroundColor: '#E8F4F7',
    flexDirection: 'row',
    height: 54,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#017DA2',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  buttonText: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
  },
  card: {
    borderRadius: 12,
    flex: 1,
    height: 108,
    overflow: 'hidden',
  },
  heading: {
    color: '#fff',
    fontFamily: Fonts.JakartaBold,
    fontSize: 12,
    paddingLeft: Platform.OS === 'android' ? 0 : 4,
  },
  offer: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    color: '#888',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
  },
  strikePrice: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    marginLeft: 6,
    textDecorationLine: 'line-through',
  },
  subHeading: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
    paddingLeft: Platform.OS === 'android' ? 0 : 4,
  },
  topHalf: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 54,
    justifyContent: 'center',
    paddingHorizontal: Platform.OS === 'android' ? 10 : 0,
    paddingTop: 8,
  },
});
export default styles;
