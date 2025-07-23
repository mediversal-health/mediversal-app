import {Platform, StyleSheet} from 'react-native';
import {FontColors, Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 50,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  drawer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 10,
    // borderTopRightRadius: 16,
    // borderBottomRightRadius: 16,
    // elevation: 10,
  },
  likeUsBanner: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
    backgroundColor: FontColors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 10,
  },

  likeUsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  likeUsText: {
    color: FontColors.tertiary,
    fontSize: 14,
    fontFamily: Fonts.JakartaMedium,
  },
  profileCompleteText: {
    fontSize: 14,
    color: FontColors.primary,
    fontFamily: Fonts.JakartaMedium,
    marginTop: 4,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#B0B6B8',
    paddingBottom: 10,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  greeting: {
    fontSize: 20,
    fontFamily: Fonts.JakartaBold,
  },
  profileProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completeText: {
    fontSize: 14,
    color: FontColors.primary,
    fontFamily: Fonts.JakartaRegular,
  },
  percentComplete: {
    fontSize: 12,
    fontFamily: Fonts.JakartaMedium,
  },
  familySection: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  familyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  familyTitle: {
    fontSize: 15,
    fontFamily: Fonts.JakartaBold,
    color: FontColors.primary,
  },
  addNew: {
    flexDirection: 'row',
    gap: 5,
  },
  addNewText: {
    fontSize: 12,
    color: '#B0B6B8',
    fontFamily: Fonts.JakartaRegular,
  },
  familyTags: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 5,
  },
  familyTag: {
    backgroundColor: FontColors.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    gap: 3,
  },
  tagText: {
    fontSize: 10,
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
  },
  sectionHeader: {
    fontSize: 14,
    color: FontColors.primary,
    paddingHorizontal: 10,
    paddingTop: 10,
    fontFamily: Fonts.JakartaSemiBold,
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    backgroundColor: 'white',
  },
  logoutButton: {
    marginTop: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#E53935', // red color
    alignItems: 'center',
    marginBottom: 50,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 12,
  },
  fallbackAvatar: {
    width: 50,
    height: 50,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fallbackText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
  },
});
export default styles;
