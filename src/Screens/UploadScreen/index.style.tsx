import {StyleSheet} from 'react-native';
import {Platform, StatusBar} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 42,
  },
  content: {
    flex: 1,
    paddingBottom: 80, // Add padding to ensure content doesn't get hidden behind buttons
  },
  guaranteeSection: {
    marginTop: 8, // Small margin between medicine details and guarantee cards
    paddingBottom: 16, // Add some padding at the bottom
  },
  cheaperAlternativeContainer: {
    flex: 1,
    marginTop: 8, // Small margin between guarantee cards and cheaper alternatives
    paddingBottom: 16,
    marginBottom: 8, // Add some padding at the bottom
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
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reminderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F4F7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0088B1',
    marginRight: 8,
  },
  reminderButtonText: {
    color: '#0088B1',
    fontWeight: '600',
    marginLeft: 8,
  },
  buyButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0088B1',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  productCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  productCard: {
    width: 'auto',
    marginRight: 1,
    marginBottom: 24,
  },

  relatedProductsHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 16,
    color: '#000',
  },
  relatedProductsContainer: {
    marginTop: 2,
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },

  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconSpacing: {
    marginRight: 16,
  },
  safeHeader: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
