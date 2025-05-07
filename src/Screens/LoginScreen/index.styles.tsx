import {StyleSheet} from 'react-native';

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
    fontWeight: '400',
    paddingVertical: 4,
  },
  appNameText: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
    lineHeight: 42,
    paddingBottom: 4,
  },
  taglineText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
    paddingBottom: 14,
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
  },
  createOneText: {
    marginTop: 4,
    color: '#0088B1',
    fontWeight: '600',
    fontSize: 14,
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666666',
    marginTop: 40,
    marginBottom: 24,
  },
  termsHighlight: {
    color: '#000000',
  },
});
export default styles;
