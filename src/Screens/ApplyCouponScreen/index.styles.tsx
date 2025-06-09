import {Platform, StatusBar, StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
    fontFamily: Fonts.JakartaBold,
    color: '#212121',
  },
  searchContainer: {
    paddingHorizontal: 4,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },

  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 10,
  },

  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#333',
    paddingRight: 8,
    fontFamily: Fonts.JakartaBold,
  },

  applySearchButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },

  applySearchButtonText: {
    color: '#0088B1',
    fontSize: 12,
    fontFamily: Fonts.JakartaBold,
  },

  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },

  sectionContainer: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 8,
    fontFamily: 'YourFontFamily',
  },

  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },

  noResultsSubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 16,
    marginBottom: 16,
  },
  noCouponsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  noCouponsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  noCouponsSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
export default styles;
