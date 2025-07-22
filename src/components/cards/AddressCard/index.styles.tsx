import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    width: 350,
    padding: 16,
    borderWidth: 1,
    position: 'relative',
  },
  radioButtonContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0088B1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0088B1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 28,
    height: 28,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: Fonts.JakartaBold,
  },
  addressText: {
    fontSize: 10,
    color: '#666666',
    lineHeight: 20,
    fontFamily: Fonts.JakartaRegular,
  },
  phoneSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  phoneLabel: {
    fontSize: 10,
    color: '#666666',
    fontFamily: Fonts.JakartaSemiBold,
  },
  phoneNumber: {
    fontSize: 10,
    color: '#1A1A1A',
    fontWeight: '500',
    fontFamily: Fonts.JakartaRegular,
  },
});
export default styles;
