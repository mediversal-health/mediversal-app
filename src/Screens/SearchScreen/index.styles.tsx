import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8f4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#B0B6B8',
    padding: 15,
    marginHorizontal: 20,
  },
});
