import { StyleSheet } from 'react-native';
import { Fonts } from '../../styles/fonts';

const styles = StyleSheet.create({
  arrowIcon: {
    marginTop: 3,
  },
  boldText: {
    fontFamily: Fonts.JakartaBold,
    fontSize: 15,
  },
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    marginBottom: 25,
    paddingHorizontal: 8,
  },
  countText: {
    fontSize: 10,
    marginTop: 6,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 55,
  },
  footerText: {
    color: '#ccc',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
  },
  greenHeading: {
    color: '#00FF80',
    fontFamily: Fonts.JakartaBold,
    fontSize: 15,
  },
  gridWrap: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
    justifyContent: 'space-between',
    padding: 10,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalScroll: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  line: {
    borderRadius: 5,
    flex: 1,
    height: 2,
  },
  orderInfo: {
    flexDirection: 'row',
  },
  priscriptionContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#E8F4F7',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '95%',
  },
  priscriptionText: {
    flex: 1,
    fontFamily: Fonts.JakartaRegular,
  },
  sectionLabel: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
  },
  seeAllButton: {
    flexDirection: 'row',
    gap: 2,
  },
  seeAllText: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
  },
  separatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  separatorTextContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  smallHeading: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
  },
  uploadButton: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  uploadButtonText: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    fontWeight: '600',
  },
});

export default styles;
