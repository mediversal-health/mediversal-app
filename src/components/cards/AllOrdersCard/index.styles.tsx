import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  amount: {
    color: '#111827',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 6,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconWrapper: {
    borderRadius: 8,
    padding: 6,
  },
  name: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
    fontWeight: '600',
  },
  orderId: {
    color: '#6b7280',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    marginBottom: 4,
  },
  rightContent: {
    flexDirection: 'column',
  },
  statusBox: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  statusText: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
  },
});
export default styles;
