import {Platform, StatusBar, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
    fontWeight: '600',
    color: '#212121',
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationDetailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    gap: 15,
  },
  locationInfoBox: {
    backgroundColor: '#E8F4F7',
    padding: 10,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
  },
  locationTitle: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  locationAddress: {
    fontSize: 14,
    color: '#606060',
    lineHeight: 20,
  },
  proceedButton: {
    backgroundColor: '#0088B1',
    height: 52,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ✅ Newly Added Styles Below
  locationStatusText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: '#4F4F4F',
  },
  retryText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
    color: '#4F4F4F',
  },
  retryButton: {
    backgroundColor: '#0088B1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  recenterButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default styles;
