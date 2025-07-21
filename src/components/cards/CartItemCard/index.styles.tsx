import {StyleSheet} from 'react-native';
import {FontColors, Fonts} from '../../../styles/fonts';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: FontColors.tertiary,
    borderWidth: 1,
    borderColor: '#E5E8E9',
    borderRadius: 12,
    height: 81,
    marginHorizontal: 24,
    padding: 12,
    position: 'relative',
    alignItems: 'center',
    gap: 16,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
    borderColor: FontColors.secondary,
    borderWidth: 1,
  },
  deleteIcon: {
    top: 0,
    left: 0,
  },

  middleContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
    color: FontColors.primary,
  },
  quantity: {
    fontSize: 10,
    color: '#6D7578',
    fontFamily: Fonts.JakartaRegular,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: 4,
  },
  mrp: {
    fontSize: 10,
    color: '#6D7578',
    textDecorationLine: 'line-through',
    fontFamily: Fonts.JakartaSemiBold,
  },
  mrpBig: {
    fontSize: 12,
    color: '#6D7578',

    fontFamily: Fonts.JakartaSemiBold,
  },
  actualPrice: {
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
    color: FontColors.primary,
  },
  rightControls: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  counterText: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 4,
    color: '#161D1F',
  },
  outOfStockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    marginHorizontal: -10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: '#EB5757',
  },
  prescriptionRequiredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    marginHorizontal: -10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: '#F2C94C',
    overflow: 'hidden',
  },

  outOfStockLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  outOfStockText: {
    fontSize: 8,
    textAlign: 'center',
    fontFamily: Fonts.JakartaSemiBold,
    color: FontColors.tertiary,
    marginLeft: 4,
  },
  outOfStockSubText: {
    fontSize: 6,
    textAlign: 'center',
    fontFamily: Fonts.JakartaMedium,
    color: FontColors.tertiary,
    marginLeft: 4,
  },
  lowStockContainer: {
    padding: 5,
    marginTop: 8,
    backgroundColor: '#F8F8F83CD', // Light yellow background
    borderRadius: 8,
  },

  lowStockText: {
    fontSize: 10,
    fontFamily: 'YourFontFamily-Regular', // Replace with your font
    color: '#856404',
    textAlign: 'center',
  },
});
