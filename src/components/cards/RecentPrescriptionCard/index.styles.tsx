import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    gap: 4,
    marginRight: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  badgeText: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  doctorText: {
    color: '#000000',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
  },
  leftContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  reuseButton: {
    backgroundColor: '#0088B1',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  reuseText: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
  },
  rightContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  uploadedText: {
    color: '#6D7578',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
  },
});

export default styles;
