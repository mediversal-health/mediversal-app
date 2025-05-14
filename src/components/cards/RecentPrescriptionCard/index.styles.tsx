import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  card: {
    height: 45,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
  },
  uploadedText: {
    fontSize: 8,
    color: '#6D7578',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginRight: 8,
    gap: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
  },
  reuseButton: {
    backgroundColor: '#0088B1',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  reuseText: {
    color: '#fff',
    fontSize: 10,
  },
});

export default styles;
