import { StyleSheet } from 'react-native';
import { Fonts } from '../../styles/fonts';

const styles = StyleSheet.create({
  appNameText: {
    color: '#FFFFFF',
    fontFamily: Fonts.JakartaBold,
    fontSize: 40,
    lineHeight: 42,
    paddingBottom: 4,
  },
  bottomSection: {
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 48,
  },
  carouselContainer: {
    padding: 32,
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  createOneText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
    marginTop: 4,
  },
  headerTextContainer: {
    alignSelf: 'flex-start',
    paddingLeft: 32,
    paddingVertical: 24,
  },
  noAccountText: {
    color: '#000000',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 18,
  },
  safeArea: {
    backgroundColor: '#0088B1',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  taglineText: {
    color: '#FFFFFF',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 20,
    paddingBottom: 14,
  },
  termsHighlight: {
    color: '#000000',
    fontFamily: Fonts.JakartaRegular,
  },
  termsText: {
    color: '#666666',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    marginBottom: 24,
    marginTop: 40,
    textAlign: 'center',
  },
  topSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    color: '#FFFFFF',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 20,
    paddingVertical: 4,
  },
});
export default styles;
