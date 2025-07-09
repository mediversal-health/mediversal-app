import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  appliedContainer: {
    backgroundColor: '#E8F4F7',
    borderColor: '#0088B1',
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  applyButton: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderBottomLeftRadius: 14,
    borderTopRightRadius: 14,
    marginRight: 10,
    marginTop: 10,
    minWidth: 70,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  applyButtonText: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    fontWeight: '600',
  },
  container: {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  content: {
    padding: 16,
    position: 'relative',
  },
  couponCode: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 4,
  },
  description: {
    color: '#666',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    lineHeight: 16,
  },
  leftSection: {
    paddingRight: 0,
    width: '100%',
  },
  removeButton: {
    alignItems: 'center',
    backgroundColor: '#EB5757',
    borderBottomLeftRadius: 14,
    borderTopRightRadius: 14,
    marginRight: 10,
    marginTop: 10,
    minWidth: 70,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  removeButtonText: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    fontWeight: '600',
  },
  rightSection: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  title: {
    color: '#333',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
  },
});
export default styles;
