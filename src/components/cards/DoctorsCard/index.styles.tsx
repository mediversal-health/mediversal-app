import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 25,
    height: 32,
    marginRight: 10,
    width: 32,
  },
  cardContainer: {
    backgroundColor: '#0088B1',
    borderRadius: 12,
    height: 106,
    marginRight: 8,
    overflow: 'hidden',
    padding: 0,
    position: 'relative',
    width: 254,
  },
  divider: {
    backgroundColor: '#ccc',
    height: 20,
    marginHorizontal: 10,
    width: 1,
  },
  doctorInfoRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  doctorName: {
    color: '#fff',
    fontFamily: Fonts.JakartaBold,
    fontSize: 12,
  },
  doctorSpecialty: {
    color: '#fff',
    fontFamily: Fonts.JakartaBold,
    fontSize: 8,
  },
  scheduleContainer: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginTop: 20,
    padding: 3,
  },
  scheduleItem: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  scheduleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  scheduleText: {
    color: '#888',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
    marginLeft: 6,
  },
  statusBadge: {
    alignItems: 'center',
    backgroundColor: '#f0f5e1',
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 2,
    position: 'absolute',
    right: 5,
    top: 5,
  },
  statusDot: {
    backgroundColor: '#f5f37a',
    borderRadius: 4,
    elevation: 6,
    height: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    width: 5,
  },
  statusText: {
    color: 'black',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 5,
  },
  svgBottomLeft: {
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  svgFullOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: -400,
    top: 0,
  },
});

export default styles;
