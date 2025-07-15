import {Platform, StatusBar, StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
  headerTitle: {fontSize: 20, fontWeight: '600', color: '#0088B1'},

  container: {
    padding: 16,
    gap: 16,
  },

  card: {
    // backgroundColor: '#F9FAFB',
    padding: 10,
    // borderRadius: 12,
    // shadowColor: '#000',
    // shadowOpacity: 0.05,
    // shadowRadius: 4,
    // shadowOffset: {width: 0, height: 2},
    // elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    fontFamily: Fonts.JakartaSemiBold,
  },

  body: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
    fontFamily: Fonts.JakartaRegular,
  },

  bodyLink: {
    fontSize: 15,
    lineHeight: 22,
    color: '#0088B1',
    textDecorationLine: 'underline',
    fontWeight: '500',
    fontFamily: Fonts.JakartaMedium,
  },
});
