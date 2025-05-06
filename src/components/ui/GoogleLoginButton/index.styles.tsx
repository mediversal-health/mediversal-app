import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#E8F4F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0088B1',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: '#ccc',
    marginHorizontal: 12,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});
export default styles;
