import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    padding: 12,
    width: '100%',
    height: 166,
    overflow: 'hidden',
    backgroundColor: '#0088B1',
  },
  backgroundSVG: {
    position: 'absolute',
    bottom: -50,
    left: 0,
  },
  discountBanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderBottomRightRadius: 12,
    backgroundColor: '#F2C94C',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  discountText: {
    color: 'black',
    fontSize: 9,
    fontFamily: Fonts.JakartaRegular,
  },
  textContent: {
    flexDirection: 'column',
    marginTop: 30,
    marginHorizontal: 16,
  },
  heading: {
    fontSize: 16,
    color: '#fff',
    fontFamily: Fonts.JakartaBold,
  },
  subText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
  },
  button: {
    borderRadius: 6,
    backgroundColor: '#E8F4F7',
    marginTop: 10,
    padding: 2,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
  },
  cartSVG: {
    position: 'absolute',
    bottom: -30,
    left: 230,
  },
});
export default styles;
