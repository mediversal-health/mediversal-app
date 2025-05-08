import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 104,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingTop: 6,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  banner: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'center',
    marginBottom: 4,
    top: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    position: 'absolute',
  },
  bannerText: {
    fontSize: 4,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 8,
    color: '#000',
    textAlign: 'center',
  },
});
export default styles;
