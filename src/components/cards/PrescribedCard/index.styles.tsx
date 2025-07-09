import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  amount: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
    fontSize: 16,
    marginTop: 10,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#f3f4f6',
    borderRadius: 12,
    borderWidth: 1,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginRight: 12,
    width: 40,
  },
  leftSection: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  menuButton: {
    borderRadius: 6,
    padding: 4,
  },
  name: {
    color: '#374151',
    fontFamily: Fonts.JakartaMedium,
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 2,
  },
  orderId: {
    color: '#6b7280',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    marginBottom: 2,
  },
  rightSection: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusBox: {
    alignItems: 'center',
    borderRadius: 12,
    minWidth: 60,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusContainer: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  statusText: {
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 12,
    textAlign: 'center',
  },
});

export default styles;
