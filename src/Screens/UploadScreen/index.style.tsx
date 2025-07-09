import { StyleSheet } from 'react-native';
import { Platform, StatusBar } from 'react-native';
import { Fonts } from '../../styles/fonts';

export const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: '#e8f4f7',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    paddingBottom: 24, // Extra padding at bottom for better UX
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 5, // Android shadow
    shadowColor: '#000000', // iOS shadow
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buyButton: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  buyButtonText: {
    color: '#FFFFFF',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
  },
  cheaperAlternativeContainer: {
    flex: 1,
    marginTop: 8, // Small margin between guarantee cards and cheaper alternatives
    paddingBottom: 16,
    marginBottom: 8, // Add some padding at the bottom
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 80, // Add padding to ensure content doesn't get hidden behind buttons
  },
  guaranteeSection: {
    marginTop: 8, // Small margin between medicine details and guarantee cards
    paddingBottom: 16, // Add some padding at the bottom
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerRightIcons: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconSpacing: {
    marginRight: 16,
  },
  productCard: {
    marginBottom: 24,
    marginRight: 1,
    width: 'auto',
  },

  productCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  relatedProductsContainer: {
    marginBottom: 24,
    marginTop: 2,
  },
  relatedProductsHeading: {
    color: '#000',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 16,
  },

  reminderButton: {
    alignItems: 'center',
    backgroundColor: '#E8F4F7',
    borderColor: '#0088B1',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  reminderButtonText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
    marginLeft: 8,
  },
  safeHeader: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginTop: 42,
  },
});
