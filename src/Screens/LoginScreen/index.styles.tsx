import { StyleSheet } from 'react-native';
import { Fonts } from '../../styles/fonts';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0088B1',
  },
  topSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  carouselContainer: {
    padding: 32,
  },
  headerTextContainer: {
    alignSelf: 'flex-start',
    paddingVertical: 24,
    paddingLeft: 32,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 20,
    paddingVertical: 4,
    fontFamily: Fonts.JakartaRegular,
  },
  appNameText: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 42,
    paddingBottom: 4,
    fontFamily: Fonts.JakartaBold,
  },
  taglineText: {
    color: '#FFFFFF',
    fontSize: 20,
    paddingBottom: 14,
    fontFamily: Fonts.JakartaRegular,
  },
  bottomSection: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 32,
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noAccountText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: Fonts.JakartaRegular,
  },
  createOneText: {
    marginTop: 4,
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666666',
    marginTop: 40,
    marginBottom: 24,
    fontFamily: Fonts.JakartaRegular,
  },
  termsHighlight: {
    color: '#000000',
    fontFamily: Fonts.JakartaRegular,
  },
});
export default styles;
