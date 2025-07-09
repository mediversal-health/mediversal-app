import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    color: '#111827',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 6,
    textAlign: 'center',
  },
  iconWrapper: {
    borderRadius: 8,
    padding: 6,
  },
  leftContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  name: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
  },
  orderId: {
    color: '#6b7280',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    marginBottom: 4,
  },
  rightContent: {
    flexDirection: 'column',
    gap: 2,
  },
  textContent: {
    flexDirection: 'column',
  },
  uploadDate: {
    color: '#111827',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    textAlign: 'center',
  },
  uploadLabel: {
    color: '#899193',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
  },
});

export default styles;
