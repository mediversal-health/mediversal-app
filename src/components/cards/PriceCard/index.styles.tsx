import {Platform, StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 108,
    borderRadius: 12,
    overflow: 'hidden',
  },
  topHalf: {
    height: 54,
    paddingHorizontal: Platform.OS === 'android' ? 10 : 0,
    paddingTop: 8,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bottomHalf: {
    height: 54,
    backgroundColor: '#E8F4F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  heading: {
    color: '#fff',
    fontFamily: Fonts.JakartaBold,
    fontSize: 12,
    paddingLeft: Platform.OS === 'android' ? 0 : 4,
  },
  subHeading: {
    color: '#fff',
    fontSize: 8,
    fontFamily: Fonts.JakartaRegular,
    paddingLeft: Platform.OS === 'android' ? 0 : 4,
  },
  offer: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    color: '#888',
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
  },
  strikePrice: {
    color: '#0088B1',
    fontSize: 10,
    textDecorationLine: 'line-through',
    marginLeft: 6,
    fontFamily: Fonts.JakartaRegular,
  },
  button: {
    backgroundColor: '#017DA2',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 8,
    fontFamily: Fonts.JakartaRegular,
  },
});
export default styles;
