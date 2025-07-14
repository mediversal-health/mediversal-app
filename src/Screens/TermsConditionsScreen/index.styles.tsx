import {Platform, StatusBar, StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // ⬅️ add
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  backBtn: {padding: 4, marginRight: 8},
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
  },

  container: {flexGrow: 1, padding: 16},
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333333',
    marginBottom: 20,
    fontFamily: Fonts.JakartaRegular,
  },
  link: {
    fontSize: 16,
    color: '#0088B1',
    fontWeight: '500',
    fontFamily: Fonts.JakartaMedium,
    marginLeft: 10,
  },
});
