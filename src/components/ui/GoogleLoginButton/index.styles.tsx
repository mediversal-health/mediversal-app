import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#E8F4F7',
    borderColor: '#0088B1',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  disabledButton: {
    opacity: 0.6,
  },

  icon: {
    height: 24,
    resizeMode: 'contain',
    width: 24,
  },

  loadingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  loadingText: {
    color: '#4285F4',
    fontFamily: Fonts.JakartaMedium,
    fontSize: 16,
    marginLeft: 8, // if available; otherwise use JakartaRegular
  },

  separator: {
    backgroundColor: '#ccc',
    height: 24,
    marginHorizontal: 12,
    width: 1,
  },

  text: {
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
  },
});

export default styles;
