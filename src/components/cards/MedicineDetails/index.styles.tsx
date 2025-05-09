import {StyleSheet} from 'react-native';

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
    width: '100%',
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
    backgroundColor: '#4CAF50',
  },
  nameContainer: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  medicineName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  medicinePack: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  saltLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  saltComposition: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    paddingHorizontal: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  consultButtonText: {
    color: '#0088B1',
    fontWeight: '600',
    marginLeft: 8,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: '#0088B1',
  },
  currentPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  discount: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 8,
    fontWeight: '600',
  },
  stockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  inStock: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  deliveryText: {
    fontSize: 14,
    color: '#333',
  },
});
