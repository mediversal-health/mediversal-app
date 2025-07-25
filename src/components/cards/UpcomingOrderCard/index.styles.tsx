import {StyleSheet} from 'react-native';
import {FontColors, Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    padding: 0,
    height: 106,
    width: 254,
    position: 'relative',
    overflow: 'hidden',
    marginRight: 8,
    backgroundColor: FontColors.primary,
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
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
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
    color: FontColors.textBlack,
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
    color: FontColors.tertiary,
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
  },
  doctorSpecialty: {
    color: FontColors.tertiary,
    fontSize: 8,
    fontFamily: Fonts.JakartaBold,
  },
  scheduleContainer: {
    borderRadius: 6,
    backgroundColor: FontColors.secondary,
    // marginTop: 10,
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
    justifyContent: 'center',
    flex: 1,
    gap: 4,
  },
  scheduleText: {
    color: '#6D7578',
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
  },
  viewOrderText: {
    color: FontColors.primary,
    fontSize: 10,
    fontFamily: Fonts.JakartaMedium,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
});

export default styles;
