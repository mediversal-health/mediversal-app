import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 104,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingTop: 6,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  banner: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'center',
    marginBottom: 4,
    top: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    position: 'absolute',
  },
  bannerText: {
    fontSize: 4,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    fontFamily: Fonts.JakartaBold,
  },
  subHeading: {
    fontSize: 8,
    color: '#000',
    textAlign: 'center',
    fontFamily: Fonts.JakartaRegular,
  },
});
export default styles;
