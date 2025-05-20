import {StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 25,
    paddingHorizontal: 8,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sectionLabel: {
    fontSize: 12,
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
    gap: 2,
  },
  seeAllText: {
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
  },
  arrowIcon: {
    marginTop: 3,
  },
  horizontalScroll: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  priscriptionContainer: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#E8F4F7',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    marginVertical: 20,
  },
  priscriptionText: {
    flex: 1,
    fontFamily: Fonts.JakartaRegular,
  },
  uploadButton: {
    borderRadius: 12,
    backgroundColor: '#0088B1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    padding: 10,
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
