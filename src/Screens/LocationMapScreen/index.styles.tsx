import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Fonts } from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
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
  backButton: {
    alignItems: 'center',
    backgroundColor: '#e8f4f7',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  headerTitle: {
    color: '#212121',
    fontFamily: Fonts.JakartaBold,
    fontSize: 16,
  },
  markerWrapper: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 4,
    justifyContent: 'center',
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  content: {
    flex: 1,
  },
  mapContainer: {
    elevation: 2,
    flex: 1,
    height: '100%',
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  locationDetailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    gap: 15,
    marginBottom: 24,
    padding: 20,
  },
  locationInfoBox: {
    backgroundColor: '#E8F4F7',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  locationTitle: {
    color: '#000',
    fontFamily: Fonts.JakartaBold,
    fontSize: 16,
  },
  locationAddress: {
    color: '#606060',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
    lineHeight: 20,
  },
  proceedButton: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 8,
    height: 52,
    justifyContent: 'center',
    marginTop: 'auto',
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 16,
  },
  mapPlaceholder: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  // ✅ Newly Added Styles Below
  locationStatusText: {
    color: '#4F4F4F',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  retryText: {
    color: '#4F4F4F',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  retryButton: {
    alignSelf: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  recenterButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    bottom: 16,
    elevation: 5,
    padding: 10,
    position: 'absolute',
    right: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinWrapper: {
    backgroundColor: '#0088B1',
    borderRadius: 20,
    elevation: 5,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pinShadow: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 5,
    height: 10,
    marginTop: -4,
    width: 10,
  },
});

export default styles;
