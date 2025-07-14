import {Platform, StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 104,
    borderRadius: 12,
    paddingHorizontal: Platform.OS === 'android' ? 10 : 0,
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
    fontSize: Platform.OS === 'android' ? 4 : 6,
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
    fontSize: 12,
    color: '#161D1F',
    textAlign: 'center',
    fontFamily: Fonts.JakartaBold,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 0,
  },
  subHeading: {
    fontSize: 6,
    color: '#161D1F',
    textAlign: 'center',
    fontFamily: Fonts.JakartaRegular,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 0,
  },
});
export default styles;
