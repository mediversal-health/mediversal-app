import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  imageWrapper: {
    height: height * 0.4,
  },
  image: {
    width,
    height: 300,
    backgroundColor: 'green', // test visibility
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 8,
    width: '100%',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  dotContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  detailContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: '700',
  },
  stripText: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
  },
  saltText: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  originalPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 14,
    color: 'green',
    fontWeight: '600',
  },
  availabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    padding: 10,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 6,
  },
  inStock: {
    color: 'green',
    fontWeight: '600',
  },
  delivery: {
    color: 'green',
    fontWeight: '600',
  },
});
