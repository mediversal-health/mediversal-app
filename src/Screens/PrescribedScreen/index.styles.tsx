import {StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: '11%',
    paddingBottom: 10,
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
  progressCircle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 15,
    borderColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  uploadText: {
    marginTop: 4,
    fontSize: 12,
    color: '#6D7578',
    fontFamily: Fonts.JakartaRegular,
  },

  heading: {
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
    marginBottom: 8,
    color: '#000000',
  },
  description: {
    fontSize: 10,
    color: '#899193',
    marginBottom: 20,
    fontFamily: Fonts.JakartaRegular,
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  orderList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F4F7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#58D163',
    marginRight: 8,
  },
  contactButtonText: {
    color: '#34C759',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
    marginLeft: 8,
  },
  checkoutButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0088B1',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: Fonts.JakartaSemiBold,
  },
});

export default styles;
