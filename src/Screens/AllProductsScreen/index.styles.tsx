import {StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: '11%',
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
  headerText: {
    fontSize: 16,
    fontFamily: Fonts.JakartaRegular,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 100,
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
  },
  categoryItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    gap: 5,
    backgroundColor: '#f2f2f2',
    width: 80,
    height: 100,
  },
  selectedCategory: {
    backgroundColor: '#0088B1',
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 8,
    color: '#333',
    textAlign: 'center',
    fontFamily: Fonts.JakartaRegular,
  },
  selectedCategoryText: {
    color: '#fff',
    fontFamily: Fonts.JakartaBold,
  },
  productContainer: {
    flex: 1,
    padding: 10,
  },
  productList: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productCardContainer: {
    width: '50%',
    marginBottom: 10,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
    gap: 8, // space between SearchBar and icons
  },

  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // push to right
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
