import { StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  applyButton: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 8,
    flex: 1,
    paddingVertical: 15,
  },
  applyButtonDisabled: {
    backgroundColor: '#E0E0E0',
    elevation: 0,
    opacity: 0.8,
    shadowOpacity: 0,
  },
  applyButtonText: {
    color: '#fff',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 16,
  },
  applyButtonTextDisabled: {
    color: '#9E9E9E',
    fontFamily: Fonts.JakartaSemiBold,
  },

  bottomSheet: {
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT * 0.8,
    paddingTop: 20,
  },
  buttonContainer: {
    backgroundColor: '#fff',
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 10,
    padding: 20,
  },
  checkbox: {
    alignItems: 'center',
    borderColor: '#0088B1',
    borderRadius: 4,
    borderWidth: 2,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  checkboxSelected: {
    backgroundColor: '#2196F3',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  clearButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 15,
  },
  clearButtonText: {
    color: '#666',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 16,
  },
  contentArea: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  contentSubtitle: {
    color: '#666',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
    lineHeight: 20,
  },
  contentTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  header: {
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 24,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  optionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  optionText: {
    color: '#333',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
  },
  optionsContainer: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlayTouch: {
    flex: 1,
  },
  priceInput: {
    backgroundColor: '#f8f9fa',
    borderColor: '#ddd',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  priceInputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  priceSeparator: {
    color: '#666',
    fontSize: 16,
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderColor: '#ddd',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  searchInput: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
  },
  sidebar: {
    backgroundColor: '#fff',
    borderRightColor: '#e0e0e0',
    borderRightWidth: 1,
    width: 140,
  },
  sidebarItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sidebarItemActive: {
    backgroundColor: '#0088B1',
  },
  sidebarText: {
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
    fontWeight: '400',
  },
  sidebarTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
});
export default styles;
