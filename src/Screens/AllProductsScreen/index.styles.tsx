import {Platform, StatusBar, StyleSheet} from 'react-native';
import {FontColors, Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FontColors.tertiary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: FontColors.tertiary,
    justifyContent: 'space-between',
    gap: 10,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8f4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: Fonts.JakartaSemiBold,
    color: FontColors.textBlack,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 100,
    backgroundColor: FontColors.tertiary,
    paddingVertical: 10,
  },
  categoryItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 12,
    marginHorizontal: 10,
    gap: 5,
    backgroundColor: '#f2f2f2',
  },
  iconContainer: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: FontColors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  selectedCategory: {
    backgroundColor: '#d9dbdcff',
    borderRadius: 8,
  },

  categoryText: {
    fontSize: 8,
    color: FontColors.textBlack,
    textAlign: 'center',
    fontFamily: Fonts.JakartaRegular,
  },
  selectedCategoryText: {
    color: FontColors.textBlack,
    fontFamily: Fonts.JakartaMedium,
  },
  productContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: Platform.OS === 'android' ? 24 : 16,
    paddingVertical: 10,
  },
  productList: {
    paddingBottom: 20,
    marginTop: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: Platform.OS === 'android' ? 8 : 0,
  },
  productCardContainer: {
    width: '50%',
    marginBottom: Platform.OS === 'android' ? 16 : 5,
    gap: 5,
  },
  searchBarContainer: {
    gap: 14,
  },

  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginBottom: 10,
  },

  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 4,
  },

  iconLabel: {
    fontSize: 12,
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    elevation: 5,
    top: 30,
    right: 0,
    borderRadius: 8,
    zIndex: 10,
    paddingVertical: 4,
  },
  dropdownOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
  },
});
export default styles;
