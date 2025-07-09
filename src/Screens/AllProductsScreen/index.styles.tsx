import { StyleSheet } from 'react-native';
import { Fonts } from '../../styles/fonts';

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: '#e8f4f7',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  categoryIcon: {
    borderRadius: 8,
    height: 56,
    width: 56,
  },
  categoryItem: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    flexDirection: 'column',
    gap: 5,
    height: 120,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    width: 80,
  },
  categoryText: {
    color: '#333',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
    textAlign: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 4,
    position: 'absolute',
    right: 0,
    top: 30,
    zIndex: 10,
  },
  dropdownOption: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    padding: 10,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '11%',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  headerLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  headerText: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  iconLabel: {
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // push to right
    gap: 12,
    marginBottom: 10,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  productCardContainer: {
    marginBottom: 10,
    width: '50%',
  },
  productContainer: {
    flex: 1,
    padding: 10,
  },

  productList: {
    paddingBottom: 20,
  },

  searchBarContainer: {
    gap: 8,
    marginTop: 10,
    paddingHorizontal: 16, // space between SearchBar and icons
  },

  selectedCategory: {
    backgroundColor: '#0088B1',
  },
  selectedCategoryText: {
    color: '#fff',
    fontFamily: Fonts.JakartaBold,
  },
  sidebar: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    width: 100,
  },
});
export default styles;
