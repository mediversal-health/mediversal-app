import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

export const styles = StyleSheet.create({
  actualPrice: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 16,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#E5E8E9',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    height: 81,
    marginHorizontal: 12,
    marginTop: 2,
    padding: 10,
    position: 'relative',
  },
  counterContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  counterText: {
    color: '#161D1F',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 4,
  },
  deleteIcon: {
    left: 20,
    top: 0,
  },
  image: {
    borderRadius: 8,
    height: 57,
    marginRight: 10,
    width: 57,
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
  middleContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  mrp: {
    color: '#6D7578',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 8,
    textDecorationLine: 'line-through',
  },
  mrpBig: {
    color: '#6D7578',
    fontFamily: Fonts.JakartaSemiBold,

    fontSize: 10,
  },
  name: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
  },
  outOfStockContainer: {
    alignItems: 'center',
    backgroundColor: '#EB5757',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  outOfStockLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },

  outOfStockSubText: {
    color: '#FFF',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 8,
    marginLeft: 4,
    textAlign: 'center',
  },

  outOfStockText: {
    color: '#FFF',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
    marginLeft: 4,
    textAlign: 'center',
  },
  priceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  quantity: {
    color: '#6D7578',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
  },

  rightControls: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
});
