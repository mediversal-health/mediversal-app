import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    borderTopLeftRadius: 8,
    bottom: 0,
    height: 24,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    width: 24,
  },
  addButtonForOutofStock: {
    alignItems: 'center',
    borderTopLeftRadius: 8,
    bottom: 0,
    height: 24,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    width: 54,
  },

  cardContainer: {
    flex: 1,
    height: 230,
    // width: 130,
    backgroundColor: '#FFE3C1',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    shadowColor: '#FFC8B7',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginHorizontal: 3,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  counterButton: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    width: 16,
  },
  counterContainer: {
    alignItems: 'center',
    borderTopLeftRadius: 8,
    bottom: 0,
    flexDirection: 'row',
    height: 24,
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    position: 'absolute',
    right: 0,
    width: 64,
  },
  counterText: {
    color: '#FFF',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 6,
  },
  currentPrice: {
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    fontWeight: 'bold',
  },
  deliveryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 2,
  },
  deliveryText: {
    color: '#34C759',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
    marginLeft: 4,
  },
  discountContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  discountPercentage: {
    color: '#00A86B',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
  },
  imageContainer: {
    alignItems: 'center',

    backgroundColor: '#FFF',
    borderRadius: 8,
    height: 100,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingVertical: 10,
  },
  infoContainer: {
    flex: 1,
  },
  originalPrice: {
    color: '#666',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    marginRight: 4,
    textDecorationLine: 'line-through',
  },
  outOfStockButtonText: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
  },
  productDescription: {
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    marginTop: 2,
  },
  productImage: {
    height: 90,
    resizeMode: 'contain',
    width: '100%',
  },
  productName: {
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    marginTop: 4,
  },
  quantityContainer: {
    marginTop: 2,
  },
  quantityText: {
    color: '#666',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
  },
});
export default styles;
