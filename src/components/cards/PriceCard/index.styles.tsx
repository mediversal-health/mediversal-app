import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  card: {
    width: 179,
    height: 108,
    borderRadius: 12,
    overflow: 'hidden',
  },
  topHalf: {
    height: 54,
    paddingHorizontal: 10,
    paddingTop: 8,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  bottomHalf: {
    height: 54,
    backgroundColor: '#E8F4F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  heading: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  subHeading: {
    color: '#fff',
    fontSize: 8,
  },
  offer: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    color: '#888',
    fontSize: 10,
  },
  strikePrice: {
    color: '#0088B1',
    fontSize: 10,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  button: {
    backgroundColor: '#017DA2',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 8,
  },
});
export default styles;
