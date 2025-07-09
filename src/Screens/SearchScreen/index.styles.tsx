import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Fonts } from '../../styles/fonts';

const styles = StyleSheet.create({
  addressCardContainer: {
    marginBottom: 20,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: '#e8f4f7',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginBottom: 40,
  },

  currentLocationContainer: {
    alignItems: 'center',
    backgroundColor: '#E8F4F7',
    borderColor: '#0088B1',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 15,
  },
  currentLocationText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
  },
  errorText: {
    color: '#FF3B30',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    marginBottom: 8,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 15,
  },
  headerTitle: {
    fontFamily: Fonts.JakartaBold,
    fontSize: 16,
    marginLeft: 10,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  locatingText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
  },
  pincodeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 4,
  },
  pincodeInput: {
    borderColor: '#B0B6B8',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
    height: 44,
    paddingHorizontal: 12,
  },
  safeAreaContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  searchButton: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 8,
    height: 44,
    justifyContent: 'center',
    marginLeft: 8,
    minWidth: 80,
    paddingHorizontal: 16,
  },
  searchButtonText: {
    color: '#fff',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
  },
  sectionTitle: {
    color: '#333',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
    marginBottom: 8,
  },
  serviceabilityContainer: {
    marginTop: 8,
  },
  successContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  successText: {
    color: '#4BB543',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
  },
});
export default styles;
