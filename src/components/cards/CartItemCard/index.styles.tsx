import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E8E9',
    borderRadius: 10,
    height: 81,
    marginHorizontal: 12,
    marginTop: 2,
    padding: 10,
    position: 'relative',
    alignItems: 'center',
  },
  image: {
    width: 57,
    height: 57,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteIcon: {
    top: 0,
    left: 20,
  },

  middleContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#0088B1',
  },
  quantity: {
    fontSize: 10,
    color: '#6D7578',
    fontFamily: Fonts.JakartaRegular,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mrp: {
    fontSize: 8,
    color: '#6D7578',
    textDecorationLine: 'line-through',
    fontFamily: Fonts.JakartaSemiBold,
  },
  mrpBig: {
    fontSize: 10,
    color: '#6D7578',

    fontFamily: Fonts.JakartaSemiBold,
  },
  actualPrice: {
    fontSize: 16,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#0088B1',
  },
  rightControls: {
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flex: 1,
  },

  outOfStockText: {
    fontSize: 10,
    textAlign: 'center',
    fontFamily: Fonts.JakartaSemiBold,
    color: '#FFF',
    marginLeft: 4,
  },
  outOfStockSubText: {
    fontSize: 7,
    textAlign: 'center',
    fontFamily: Fonts.JakartaSemiBold,
    color: '#FFF',
    marginLeft: 4,
  },
  lowStockContainer: {
    padding: 5,
    marginTop: 8,
    backgroundColor: '#FFF3CD', // Light yellow background
    borderRadius: 8,
  },

  lowStockText: {
    fontSize: 10,
    fontFamily: 'YourFontFamily-Regular', // Replace with your font
    color: '#856404',
    textAlign: 'center',
  },
});
