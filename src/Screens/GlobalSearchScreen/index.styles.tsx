import {Platform, StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerTitle: {
    fontSize: 16,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#111827',
  },
  wrapper: {
    paddingTop: 10,
  },
  gradientBox: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 0,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 10,

    marginBottom: 20,
  },
  container: {
    backgroundColor: '#e8f4f7',
    borderRadius: 12,

    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  placeholderText: {
    color: '#999',
    fontFamily: Fonts.JakartaRegular,
  },
  highlight: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
  },
  priscriptionContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    marginVertical: 20,
  },
  priscriptionText: {
    fontSize: 12,
    flex: 1,
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
  },
  uploadButton: {
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    fontWeight: '600',
    color: '#000',
    fontSize: 8,
    fontFamily: Fonts.JakartaRegular,
  },
  searchInput: {
    flex: 1,
    color: '#111827',
    fontFamily: Fonts.JakartaRegular,
    paddingHorizontal: 10,
  },
  searchResultsContainer: {
    paddingTop: 10,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchItemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 12,
  },
  searchItemTextContainer: {
    flex: 1,
  },
  searchItemName: {
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#111827',
    marginBottom: 4,
  },
  searchItemSalt: {
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
    color: '#666',
  },
  recentSearchesContainer: {
    marginTop: 20,
  },
  recentSearchesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentSearchesTitle: {
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
    color: '#111827',
  },
  clearButton: {
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
    color: '#EB5757',
  },
  recentSearchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  recentSearchTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recentSearchText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
    color: '#111827',
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default styles;
