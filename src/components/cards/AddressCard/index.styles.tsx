import {StyleSheet} from 'react-native';
import {FontColors, Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    width: '100%',
    padding: 16,
    borderWidth: 1,
    position: 'relative',
  },
  radioButtonContainer: {
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
    alignItems: 'flex-start',
    gap: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#F2F4F5',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: FontColors.textBlack,
    fontFamily: Fonts.JakartaBold,
  },
  addressText: {
    fontSize: 12,
    color: FontColors.textBlack,
    fontFamily: Fonts.JakartaRegular,
  },
  phoneSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  phoneLabel: {
    fontSize: 12,
    color: FontColors.textBlack,
    fontFamily: Fonts.JakartaSemiBold,
  },
  phoneNumber: {
    fontSize: 12,
    color: FontColors.textBlack,
    fontFamily: Fonts.JakartaRegular,
  },
});
export default styles;
