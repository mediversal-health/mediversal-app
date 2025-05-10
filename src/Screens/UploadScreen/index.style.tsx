import {StyleSheet} from 'react-native';

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
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
