import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  addressText: {
    color: '#666666',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    lineHeight: 20,
  },
  container: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 2,
    margin: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: 'relative',
    width: 350,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    height: 28,
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
    width: 28,
  },
  leftSection: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  phoneLabel: {
    color: '#666666',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
  },
  phoneNumber: {
    color: '#1A1A1A',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    fontWeight: '500',
  },
  phoneSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioButtonContainer: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 1,
  },
  radioInner: {
    backgroundColor: '#0088B1',
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  radioOuter: {
    alignItems: 'center',
    borderColor: '#0088B1',
    borderRadius: 10,
    borderWidth: 2,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  title: {
    color: '#1A1A1A',
    fontFamily: Fonts.JakartaBold,
    fontSize: 18,
    fontWeight: '600',
  },
});
export default styles;
