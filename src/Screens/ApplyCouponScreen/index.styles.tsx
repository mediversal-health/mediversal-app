import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Fonts } from '../../styles/fonts';

const styles = StyleSheet.create({
  applySearchButton: {
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  applySearchButtonText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
    fontSize: 12,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: '#e8f4f7',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  clearButton: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },

  container: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  header: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  headerTitle: {
    color: '#212121',
    fontFamily: Fonts.JakartaBold,
    fontSize: 16,
  },

  noCouponsContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  noCouponsSubText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },

  noCouponsText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },

  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  noResultsSubText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },

  noResultsText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },

  scrollView: {
    flex: 1,
    marginBottom: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },

  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    paddingVertical: 12,
  },
  searchInput: {
    color: '#333',
    flex: 1,
    fontFamily: Fonts.JakartaBold,
    fontSize: 16,
    height: 44,
    paddingRight: 8,
  },
  searchInputContainer: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 12,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#333',
    fontFamily: 'YourFontFamily',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginHorizontal: 16,
  },
});
export default styles;
