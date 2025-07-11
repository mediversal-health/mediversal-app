import {Platform, StatusBar, StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8f4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  serviceabilityContainer: {
    marginTop: 8,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  successText: {
    color: '#4BB543',
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
  },
  safeAreaContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerTitle: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: Fonts.JakartaBold,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
    marginBottom: 8,
    color: '#333',
  },
  pincodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pincodeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#B0B6B8',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#0088B1',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
    marginBottom: 8,
  },
  currentLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#0088B1',
    padding: 15,
    backgroundColor: '#E8F4F7',
    borderRadius: 12,
    marginHorizontal: 20,
  },
  currentLocationText: {
    color: '#0088B1',
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
  },
  locatingText: {
    color: '#0088B1',
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
  },
  addressCardContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
  },
});
export default styles;
