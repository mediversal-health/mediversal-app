import {Platform, StatusBar, StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  pdfListContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  pdfItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  pdfName: {
    fontSize: 14,
    marginLeft: 8,
    color: '#333',
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
  estimatedTime: {
    textAlign: 'center',
    fontSize: 14,
    color: '#161D1F',
    marginBottom: 16,
    fontFamily: Fonts.JakartaBold,
  },

  verificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },

  verificationTextLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  verificationTextRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  verificationIconText: {
    fontSize: 12,
    color: '#161D1F',
    fontFamily: Fonts.JakartaRegular,
    marginLeft: 4,
  },

  heading: {
    fontSize: 12,
    marginTop: 12,
    marginBottom: 4,
    color: '#161D1F',
    fontFamily: Fonts.JakartaBold,
  },
  description: {
    fontSize: 14,
    color: '#899193',
    marginBottom: 12,
  },
  learnMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  learnMoreText: {
    fontSize: 14,
    color: '#6D7578',
    marginRight: 4,
    fontFamily: Fonts.JakartaSemiBold,
  },

  pdfText: {
    fontSize: 12,
    marginTop: 4,
    color: '#444',
  },
  exploreBtn: {
    marginTop: 20,
    backgroundColor: '#0088B1',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  exploreText: {
    color: '#F8F8F8',
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
  },
  uploadText: {
    marginTop: 4,
    fontSize: 12,
    color: '#6D7578',
    fontWeight: 'regular',
  },
  imageListContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },

  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  imageItem: {
    width: '31%',
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  uploadedImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  uploadTime: {
    fontSize: 10,
    color: '#6D7578',
    padding: 6,
    textAlign: 'center',
  },
  noDataContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 100,
  },
  noDataText: {
    fontSize: 16,
    color: '#6D7578',
    textAlign: 'center',
    fontWeight: '500',
  },
});
