import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  iconWrapper: {
    padding: 6,
    borderRadius: 8,
  },
  textContent: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 10,
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
  },
  orderId: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    fontFamily: Fonts.JakartaRegular,
  },
  rightContent: {
    flexDirection: 'column',
    gap: 2,
  },
  uploadLabel: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
    color: '#899193',
  },
  uploadDate: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    color: '#111827',
    textAlign: 'center',
  },
  date: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#111827',
    marginRight: 6,
    textAlign: 'center',
  },
});

export default styles;
