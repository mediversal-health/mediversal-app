import {Platform, StatusBar, StyleSheet} from 'react-native';
import {FontColors, Fonts} from '../../styles/fonts';

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
    backgroundColor: FontColors.secondary,
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
    color: '#34C759',
    fontSize: 12,
    fontFamily: Fonts.JakartaMedium,
  },
  safeAreaContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerTitle: {
    fontSize: 14,
    marginLeft: 10,
    fontFamily: Fonts.JakartaSemiBold,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: Fonts.JakartaMedium,
    marginBottom: 8,
    color: FontColors.textBlack,
  },
  pincodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 12,
  },
  pincodeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#B0B6B8',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  searchButton: {
    backgroundColor: FontColors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  searchButtonText: {
    color: FontColors.tertiary,
    fontSize: 12,
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
    borderColor: FontColors.primary,
    padding: 14,
    backgroundColor: FontColors.secondary,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  currentLocationText: {
    color: FontColors.primary,
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
  },
  locatingText: {
    color: FontColors.primary,
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
