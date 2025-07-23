import {StyleSheet, Dimensions} from 'react-native';
import {FontColors, Fonts} from '../../../styles/fonts';

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
    backgroundColor: FontColors.tertiary,
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
    fontSize: 16,
    color: FontColors.primary,
    fontFamily: Fonts.JakartaBold,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 140,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  sidebarItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  sidebarItemActive: {
    backgroundColor: FontColors.primary,
  },
  sidebarText: {
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
  },
  sidebarTextActive: {
    color: FontColors.tertiary,
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
  },
  contentArea: {
    flex: 1,
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
    fontSize: 12,
    color: FontColors.textBlack,
    fontFamily: Fonts.JakartaRegular,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: FontColors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: FontColors.primary,
  },
  checkmark: {
    color: FontColors.tertiary,
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
    marginBottom: 24,
    padding: 16,
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  clearButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: 'ffff',
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: 12,
    color: FontColors.textBlack,
    fontFamily: Fonts.JakartaSemiBold,
  },
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: FontColors.primary,
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 12,
    color: FontColors.tertiary,
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
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  radioSelected: {
    borderColor: FontColors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: FontColors.primary,
  },
});
export default styles;
