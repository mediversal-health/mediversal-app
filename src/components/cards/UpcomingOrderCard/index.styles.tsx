import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    padding: 0,
    height: 106,
    width: 254,
    position: 'relative',
    overflow: 'hidden',
    marginRight: 8,
    backgroundColor: '#0088B1',
  },
  svgBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  svgFullOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: -400,
    top: 0,
  },
  statusBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: '#DDFFE5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#34C759',
  },
  statusText: {
    color: '#161D1F',
    fontSize: 5,
    fontFamily: Fonts.JakartaRegular,
  },
  doctorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
  },
  doctorName: {
    color: '#F8F8F8',
    fontSize: 12,
    fontFamily: Fonts.JakartaBold,
  },
  doctorSpecialty: {
    color: '#F8F8F8',
    fontSize: 8,
    fontFamily: Fonts.JakartaBold,
  },
  scheduleContainer: {
    borderRadius: 6,
    backgroundColor: '#E8F4F7',
    marginTop: 10,
    padding: 3,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  scheduleText: {
    marginLeft: 6,
    color: '#6D7578',
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
  },
  viewOrderText: {
    marginLeft: 16,
    color: '#0088B1',
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
});

export default styles;
