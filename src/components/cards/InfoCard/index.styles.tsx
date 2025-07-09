import { Platform, StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  banner: {
    alignSelf: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderRadius: 6,
    marginBottom: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: 'absolute',
    top: 0,
  },
  bannerText: {
    color: '#fff',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: Platform.OS === 'android' ? 4 : 6,
    textAlign: 'center',
  },
  container: {
    borderRadius: 12,
    flex: 1,
    height: 104,
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingHorizontal: Platform.OS === 'android' ? 10 : 0,
    paddingTop: 6,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  heading: {
    color: '#000',
    fontFamily: Fonts.JakartaBold,
    fontSize: 14,
    textAlign: 'center',
  },
  subHeading: {
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
    textAlign: 'center',
  },
});
export default styles;
