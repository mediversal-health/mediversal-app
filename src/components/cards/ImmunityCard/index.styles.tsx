import { Platform, StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    bottom: Platform.OS === 'ios' ? 25 : 16,
    marginRight: Platform.OS === 'ios' ? 16 : 0,
    paddingHorizontal: Platform.OS === 'ios' ? 20 : 30,
    paddingVertical: 8,
    position: 'absolute',
    zIndex: 2,
  },
  buttonText: {
    color: '#40C4FF',
    fontSize: 8,
    fontWeight: '600',
  },
  card: {
    borderRadius: 12,
    height: 230,
    overflow: 'hidden',
    padding: 8,
    position: 'relative',
    width: 126,
  },
  subtitle: {
    color: '#FFFFFF',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
    paddingRight: Platform.OS === 'ios' ? 15 : 0,
    textAlign: 'left',
  },
  svgAbsolute: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },

  svgContainer: {
    bottom: 0,
    height: 60,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  textContainer: {
    marginBottom: 16,
    marginTop: 12,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: Fonts.JakartaBold,
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 8,
    paddingRight: Platform.OS === 'ios' ? 15 : 0,
  },
});
export default styles;
