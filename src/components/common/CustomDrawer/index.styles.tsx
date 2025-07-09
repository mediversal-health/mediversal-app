import { Platform, StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  addNew: {
    flexDirection: 'row',
    gap: 5,
  },
  addNewText: {
    color: '#B0B6B8',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
  },
  avatar: {
    borderColor: '#fff',
    borderRadius: 18,
    borderWidth: 2,
    height: 50,
    marginRight: 10,
    width: 50,
  },
  completeText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
  },
  drawer: {
    backgroundColor: '#fff',
    padding: 10,
    width: '85%',
    // borderTopRightRadius: 16,
    // borderBottomRightRadius: 16,
    // elevation: 10,
  },
  fallbackAvatar: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 18,
    height: 50,
    justifyContent: 'center',
    marginRight: 10,
    width: 50,
  },
  fallbackText: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 18,
  },
  familyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  familySection: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  familyTag: {
    backgroundColor: '#0088B1',
    borderRadius: 4,
    flexDirection: 'row',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  familyTags: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 5,
  },
  familyTitle: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
    fontSize: 15,
  },
  greeting: {
    fontFamily: Fonts.JakartaBold,
    fontSize: 14,
  },
  header: {
    borderBottomColor: '#B0B6B8',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  logoutButton: {
    marginTop: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#E53935', // red color
    alignItems: 'center',
    marginBottom: 50,
  },
  logoutContainer: {
    backgroundColor: 'white',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    bottom: 20,
    left: 20,
    paddingTop: 10,
    position: 'absolute',
    right: 20, // match drawer background
  },
  logoutText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '400',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'flex-start',
    left: 0,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    width: '100%',
    zIndex: 999,
  },
  percentComplete: {
    fontFamily: Fonts.JakartaBold,
    fontSize: 12,
  },
  profileCompleteText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaMedium,
    fontSize: 14,
    marginTop: 4,
  },
  profileProgress: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  profileRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
  },
  sectionHeader: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  tagText: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
  },
});
export default styles;
