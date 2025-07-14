import {Platform, StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 100,
    paddingHorizontal: Platform.OS === 'ios' ? 8 : 16,
    backgroundColor: '#F8F8F8',
  },
  headerContainer: {
    paddingVertical: 10,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 0,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#161D1F',
    fontFamily: Fonts.JakartaRegular,
  },
  headerRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  orderInfo: {
    flexDirection: 'row',
  },
  boldText: {
    fontSize: 15,
    fontFamily: Fonts.JakartaBold,
  },
  countText: {
    fontSize: 10,
    marginTop: 6,
  },
  seeAllButton: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
    textAlign: 'center',
  },
  arrowIcon: {
    marginTop: 3,
  },
  horizontalScroll: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    marginHorizontal: Platform.OS === 'ios' ? 10 : 0,
  },
  priscriptionContainer: {
    width: Platform.OS === 'ios' ? '95%' : '100%',
    alignSelf: 'center',
    backgroundColor: '#E8F4F7',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  priscriptionText: {
    flex: 1,
    fontSize: 12,
    fontFamily: Fonts.JakartaMedium,
  },
  uploadButton: {
    borderRadius: 8,
    backgroundColor: '#0088B1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    fontWeight: '600',
    color: '#F8F8F8',
    fontSize: 10,
    fontFamily: Fonts.JakartaMedium,
  },
  gridWrap: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 0,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  separatorTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  smallHeading: {
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
  },
  greenHeading: {
    fontSize: 15,
    color: '#00FF80',
    fontFamily: Fonts.JakartaBold,
  },
  line: {
    flex: 1,
    height: 2,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 55,
  },
  footerText: {
    fontSize: 10,
    color: '#ccc',
    fontFamily: Fonts.JakartaRegular,
  },
});

export default styles;
