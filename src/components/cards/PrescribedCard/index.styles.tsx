import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  orderId: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
    fontFamily: Fonts.JakartaRegular,
  },
  name: {
    fontSize: 11,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
    fontFamily: Fonts.JakartaMedium,
  },
  amount: {
    fontSize: 16,
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
    marginTop: 10,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  statusContainer: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  statusBox: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: Fonts.JakartaSemiBold,
    textAlign: 'center',
    lineHeight: 12,
  },
  menuButton: {
    padding: 4,
    borderRadius: 6,
  },
});

export default styles;
