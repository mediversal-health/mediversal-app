import { StyleSheet } from 'react-native';
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
  checkoutButton: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
  },
  contactButton: {
    alignItems: 'center',
    backgroundColor: '#E8F4F7',
    borderColor: '#58D163',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  contactButtonText: {
    color: '#34C759',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
    marginLeft: 8,
  },
  container: {
    flex: 1,
    padding: 16,
  },

  description: {
    color: '#899193',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    marginBottom: 20,
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
    marginTop: '11%',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  heading: {
    color: '#000000',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
    marginBottom: 8,
  },
  orderList: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  progressCircle: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'pink',
    borderRadius: 100,
    borderWidth: 15,
    height: 150,
    justifyContent: 'center',
    marginBottom: 20,
    width: 150,
  },
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  uploadText: {
    color: '#6D7578',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    marginTop: 4,
  },
});

export default styles;
