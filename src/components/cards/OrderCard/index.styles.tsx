import {Platform, StyleSheet} from 'react-native';
import {FontColors, Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    width: '100%',
    height: 166,
    overflow: 'hidden',
    backgroundColor: FontColors.primary,
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
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderBottomRightRadius: 12,
    backgroundColor: '#F2C94C',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  discountText: {
    color: FontColors.textBlack,
    fontSize: 9,
    fontFamily: Fonts.JakartaRegular,
  },
  textContent: {
    flexDirection: 'column',
    marginTop: 30,
    margin: 16,
    gap: Platform.OS === 'ios' ? 40 : 24,
  },
  heading: {
    fontSize: 16,
    color: FontColors.tertiary,
    fontFamily: Fonts.JakartaBold,
  },
  subText: {
    fontSize: 12,
    color: FontColors.tertiary,
    fontFamily: Fonts.JakartaRegular,
  },
  button: {
    borderRadius: 6,
    backgroundColor: FontColors.secondary,
    padding: 6,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 10,
    fontFamily: Fonts.JakartaMedium,
    color: FontColors.textBlack,
  },
  cartSVG: {
    position: 'absolute',
    bottom: -30,
    left: 230,
  },
});
export default styles;
