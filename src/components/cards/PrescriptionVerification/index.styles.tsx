import {Platform, StatusBar, StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

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
  expandedContent: {
    marginTop: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    flex: 1,
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
  cardContainer: {
    backgroundColor: '#E8F4F7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
    marginRight: 12,
    justifyContent: 'center',
  },
  nameSection: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontFamily: Fonts.JakartaSemiBold,
  },
  pharmacistLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  labelText: {
    fontSize: 12,
    color: '#161D1F',
    fontFamily: Fonts.JakartaRegular,
  },
  avatarContainer: {
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginRight: 8,
  },
  statusDot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    backgroundColor: '#C9FFD7',
    borderRadius: 100,
    padding: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  onlineText: {
    fontSize: 8,
    color: '#50B57F',
    fontFamily: Fonts.JakartaRegular,
    marginLeft: 4,
  },
  expandedSection: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expLabel: {
    fontSize: 12,
    color: '#161D1F',
    fontFamily: Fonts.JakartaRegular,
    textAlign: 'left',
    flexDirection: 'row',
  },
  expValue: {
    fontSize: 14,
    color: '#161D1F',
    fontFamily: Fonts.JakartaBold,
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
});
