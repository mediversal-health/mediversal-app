import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  card: {
    height: 45,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorText: {
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#000000',
  },
  uploadedText: {
    fontSize: 8,
    color: '#6D7578',
    fontFamily: Fonts.JakartaRegular,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginRight: 8,
    gap: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
  },
  reuseButton: {
    backgroundColor: '#0088B1',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  reuseText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
  },
});

export default styles;
