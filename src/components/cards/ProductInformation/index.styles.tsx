import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

export default StyleSheet.create({
  heading: {
    color: '#333',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 12,
  },
  list: {
    color: '#555',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 12,
  },
  section: {
    color: '#555',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
});
