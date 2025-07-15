import {Platform, StatusBar, StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

export default StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerTitle: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: Fonts.JakartaBold,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8f4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginBottom: 40,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333333',
    marginBottom: 20,
    fontFamily: Fonts.JakartaRegular,
    paddingHorizontal: 10,
  },
  link: {
    fontSize: 16,
    color: '#0088B1',
    fontWeight: '500',
    fontFamily: Fonts.JakartaMedium,
    marginLeft: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16, // Add padding as needed
  },
});
