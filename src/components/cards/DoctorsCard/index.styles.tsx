import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    padding: 0,
    height: 106,
    width: 254,
    position: 'relative',
    overflow: 'hidden',
    marginRight: 8,
    backgroundColor: '#0088B1',
  },
  svgBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  svgFullOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: -400,
    top: 0,
  },
  statusBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: '#f0f5e1',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#f5f37a',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 6,
  },
  statusText: {
    color: 'black',
    fontSize: 5,
    fontFamily: Fonts.JakartaRegular,
  },
  doctorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 25,
    marginRight: 10,
  },
  doctorName: {
    color: '#fff',
    fontSize: 12,
    fontFamily: Fonts.JakartaBold,
  },
  doctorSpecialty: {
    color: '#fff',
    fontSize: 8,
    fontFamily: Fonts.JakartaBold,
  },
  scheduleContainer: {
    borderRadius: 6,
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 3,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  scheduleText: {
    marginLeft: 6,
    color: '#888',
    fontSize: 8,
    fontFamily: Fonts.JakartaRegular,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
});

export default styles;
