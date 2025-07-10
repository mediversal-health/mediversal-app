import {StyleSheet, Dimensions} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modalContainer: {
    padding: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  overlayTouch: {
    flex: 1,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT * 0.8,
    paddingTop: 20,
  },
  header: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 20,
  },

  headerTitle: {
    fontSize: 24,
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 140,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  sidebarItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  sidebarItemActive: {
    backgroundColor: '#0088B1',
  },
  sidebarText: {
    fontSize: 10,
    fontFamily: Fonts.JakartaSemiBold,
    fontWeight: '400',
  },
  sidebarTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  contentSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontFamily: Fonts.JakartaRegular,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: '#f8f9fa',
    gap: 5,
  },
  searchInput: {
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
  },
  optionsContainer: {
    flex: 1,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 10,
    color: '#333',
    fontFamily: Fonts.JakartaRegular,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#0088B1',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#2196F3',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: '#f8f9fa',
  },
  priceSeparator: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  clearButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#666',
    fontFamily: Fonts.JakartaSemiBold,
  },
  applyButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#0088B1',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: Fonts.JakartaSemiBold,
  },
  applyButtonDisabled: {
    backgroundColor: '#E0E0E0',
    opacity: 0.8,
    elevation: 0,
    shadowOpacity: 0,
  },
  applyButtonTextDisabled: {
    color: '#9E9E9E',
    fontFamily: Fonts.JakartaSemiBold,
  },
});
export default styles;
