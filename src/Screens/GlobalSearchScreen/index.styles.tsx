import { Platform, StyleSheet } from 'react-native';
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
  clearButton: {
    color: '#EB5757',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#e8f4f7',

    borderColor: '#ccc',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  gradientBox: {
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 10,
    paddingVertical: 0,

    width: '100%',
  },
  headerLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  headerTitle: {
    color: '#111827',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 16,
  },
  headerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlight: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  placeholderText: {
    color: '#999',
    fontFamily: Fonts.JakartaRegular,
  },
  priscriptionContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
  },
  priscriptionText: {
    color: '#fff',
    flex: 1,
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
  },
  recentSearchItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  recentSearchText: {
    color: '#111827',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
    marginLeft: 10,
  },
  recentSearchTextWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  recentSearchesContainer: {
    marginTop: 20,
  },
  recentSearchesHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  recentSearchesTitle: {
    color: '#111827',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
  },
  searchInput: {
    color: '#111827',
    flex: 1,
    fontFamily: Fonts.JakartaRegular,
    paddingHorizontal: 10,
  },
  searchItem: {
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 12,
  },
  searchItemImage: {
    backgroundColor: '#E8F4F7',
    borderRadius: 5,
    height: 50,
    marginRight: 12,
    width: 50,
  },
  searchItemName: {
    color: '#111827',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
    marginBottom: 4,
  },
  searchItemSalt: {
    color: '#666',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
  },
  searchItemTextContainer: {
    flex: 1,
  },
  searchItemtManufacturer: {
    color: '#666',
    fontFamily: Fonts.JakartaBold,
    fontSize: 12,
  },
  searchResultsContainer: {
    paddingTop: 10,
  },
  textWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  uploadButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  uploadButtonText: {
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
    fontWeight: '600',
  },
  wrapper: {
    paddingTop: 10,
  },
});

export default styles;
