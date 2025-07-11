import {Platform, StatusBar, StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    justifyContent: 'space-between',
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
    fontFamily: Fonts.JakartaBold,
    color: '#212121',
  },
  productList: {
    paddingVertical: 10,
  },
  separator: {
    width: 12,
  },
  gradientBox: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 0,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 10,
    marginTop: 20,
    marginBottom: 20,
  },
});
export default styles;
