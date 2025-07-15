import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    height: 230,
    //width: 130,
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
  imageContainer: {
    height: 100,

    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
  },

  productImage: {
    height: 90,
    width: '100%',
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1,
  },
  productName: {
    marginTop: 4,
    fontSize: 10,
    color: '#161D1F',
    fontFamily: Fonts.JakartaRegular,
  },
  productDescription: {
    fontSize: 12,
    color: '#161D1F',
    marginTop: 2,
    fontFamily: Fonts.JakartaRegular,
  },
  quantityContainer: {
    marginTop: 2,
  },
  quantityText: {
    fontSize: 10,
    color: '#666',
    fontFamily: Fonts.JakartaRegular,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  deliveryText: {
    fontSize: 8,
    color: '#34C759',
    marginLeft: 4,
    fontFamily: Fonts.JakartaRegular,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 10,
    color: '#666',
    textDecorationLine: 'line-through',
    marginRight: 4,
    fontFamily: Fonts.JakartaRegular,
  },
  discountPercentage: {
    fontSize: 8,
    color: '#00A86B',
    fontFamily: Fonts.JakartaRegular,
  },
  currentPrice: {
    fontSize: 12,

    color: '#161D1F',
    fontFamily: Fonts.JakartaBold,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderTopLeftRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonForOutofStock: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 54,
    height: 24,
    borderTopLeftRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 64,
    height: 24,
    borderTopLeftRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  counterButton: {
    width: 16,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
    paddingHorizontal: 6,
    fontFamily: Fonts.JakartaRegular,
  },
  outOfStockButtonText: {
    fontSize: 8,
    fontFamily: Fonts.JakartaRegular,
    color: '#fff',
  },
});
export default styles;
