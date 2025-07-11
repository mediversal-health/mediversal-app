import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  appliedContainer: {
    backgroundColor: '#E8F4F7',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#0088B1',
    borderStyle: 'dashed',
  },
  content: {
    padding: 16,
    position: 'relative',
  },
  leftSection: {
    width: '100%',
    paddingRight: 0,
  },
  rightSection: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  couponCode: {
    fontSize: 12,
    color: '#0088B1',
    marginBottom: 4,
    letterSpacing: 1,
    fontFamily: Fonts.JakartaSemiBold,
  },
  title: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    fontFamily: Fonts.JakartaSemiBold,
  },
  description: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    fontFamily: Fonts.JakartaRegular,
  },
  applyButton: {
    backgroundColor: '#0088B1',
    marginTop: 10,
    marginRight: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    minWidth: 70,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: Fonts.JakartaRegular,
  },
  removeButton: {
    backgroundColor: '#EB5757',
    marginTop: 10,
    marginRight: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    minWidth: 70,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: Fonts.JakartaRegular,
  },
});
export default styles;
