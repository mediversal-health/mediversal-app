import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  backgroundSVG: {
    bottom: -50,
    left: 0,
    position: 'absolute',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#E8F4F7',
    borderRadius: 6,
    justifyContent: 'center',
    marginTop: 10,
    padding: 2,
    width: 100,
  },
  buttonText: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
  },
  cardContainer: {
    backgroundColor: '#0088B1',
    borderRadius: 12,
    height: 166,
    overflow: 'hidden',
    padding: 12,
    width: '100%',
  },
  cartSVG: {
    bottom: -30,
    left: 230,
    position: 'absolute',
  },
  discountBanner: {
    alignItems: 'center',
    backgroundColor: '#F2C94C',
    borderBottomRightRadius: 12,
    flexDirection: 'row',
    gap: 6,
    left: 0,
    paddingHorizontal: 15,
    paddingVertical: 2,
    position: 'absolute',
    top: 0,
  },
  discountText: {
    color: 'black',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 9,
  },
  heading: {
    color: '#fff',
    fontFamily: Fonts.JakartaBold,
    fontSize: 16,
  },
  subText: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
  },
  textContent: {
    flexDirection: 'column',
    marginHorizontal: 16,
    marginTop: 30,
  },
});
export default styles;
