import {Dimensions, StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: Dimensions.get('window').width,
    height: '100%',
    resizeMode: 'contain',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  dotIndicatorContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#899193',
  },
  nameContainer: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  medicineName: {
    fontSize: 20,
    color: '#161D1F',
    fontFamily: Fonts.JakartaBold,
  },
  medicinePack: {
    fontSize: 14,
    color: '#B0B6B8',

    fontFamily: Fonts.JakartaRegular,
  },
  saltLabel: {
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
    color: '#161D1F',
    marginTop: 12,
    paddingHorizontal: 16,
  },
  saltComposition: {
    fontSize: 14,
    color: '#161D1F',

    paddingHorizontal: 16,
    fontFamily: Fonts.JakartaMedium,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  addCartButton: {
    backgroundColor: '#0088B1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
  },
  emptyImageText: {
    color: '#888888',
    fontFamily: Fonts.JakartaMedium,
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#787a79',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  consultButton: {
    backgroundColor: '#E8F4F7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0088B1',
    flex: 1,
    marginLeft: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#f8f8f8',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: Fonts.JakartaSemiBold,
  },
  consultButtonText: {
    color: '#0088B1',
    fontSize: 12,
    marginLeft: 8,
    fontFamily: Fonts.JakartaSemiBold,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: '#0088B1',
  },
  currentPrice: {
    fontSize: 20,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#161d1f',
  },
  originalPrice: {
    fontSize: 16,
    color: '#B0B6B8',
    textDecorationLine: 'line-through',
    marginLeft: 8,
    fontFamily: Fonts.JakartaRegular,
  },
  discount: {
    fontSize: 14,
    color: '#34C759',
    marginLeft: 8,
    fontFamily: Fonts.JakartaSemiBold,
  },
  stockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#50B57F',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  inStock: {
    fontSize: 12,
    color: '#50B57F',
    fontFamily: Fonts.JakartaSemiBold,
  },
  deliveryText: {
    fontSize: 12,
    color: '#50B57F',
    fontFamily: Fonts.JakartaRegular,
  },
  outOfStock: {
    color: '#EB5757', // Red color for out of stock
  },
});
