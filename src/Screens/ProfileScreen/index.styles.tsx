import {StyleSheet} from 'react-native';
import {FontColors, Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F8F8F8',
    gap: 5,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8f4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    marginHorizontal: 5,

    borderRadius: 12,
    padding: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: FontColors.primary,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontFamily: Fonts.JakartaBold,
    color: FontColors.textBlack,
  },
  joinedDate: {
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
    color: '#899193',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: Fonts.JakartaBold,
    color: FontColors.textBlack,
  },
  EditTitle: {
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
    color: FontColors.primary,
  },

  CancelTitle: {
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#EB5757',
  },

  editButton: {
    flexDirection: 'row',
    gap: 6,
  },
  infoHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  AddressinfoItem: {
    borderTopWidth: 1,
    borderTopColor: '#D3D7D8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    marginTop: 12,
  },
  infoItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: Fonts.JakartaMedium,
    color: '#899193',
    marginLeft: 12,
  },
  addressLable: {
    fontSize: 12,
    fontFamily: Fonts.JakartaMedium,
    color: FontColors.textBlack,
    marginLeft: 12,
  },
  AddressItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoValue: {
    fontSize: 13,
    fontFamily: Fonts.JakartaSemiBold,
    color: FontColors.textBlack,
    textAlign: 'right',
    flex: 1,
    marginLeft: 20,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24,
  },

  logoutLabel: {
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#FF4444',
    marginLeft: 12,
  },
  DeleteUserLabel: {
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
    color: FontColors.textBlack,
    marginLeft: 12,
  },
  editPhotoOverlay: {
    backgroundColor: 'rgba(0, 136, 177, 0.7)',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  editPhotoText: {
    color: 'white',
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  loadingAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  fallbackAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
