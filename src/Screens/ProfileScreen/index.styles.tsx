import { StyleSheet } from 'react-native';
import { Fonts } from '../../styles/fonts';

const styles = StyleSheet.create({
  AddressinfoItem: {
    alignItems: 'center',
    borderTopColor: '#F3F4F6',
    borderTopWidth: 1,
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 12,
  },
  CancelTitle: {
    color: '#EB5757',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
    fontWeight: '600',
  },
  DeleteUserLabel: {
    color: '#000',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
    fontWeight: '500',
    marginLeft: 12,
  },
  EditTitle: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
    fontWeight: '600',
  },
  avatar: {
    borderRadius: 30,
    height: 60,
    marginRight: 16,
    width: 60,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: '#e8f4f7',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  container: {
    backgroundColor: '#F5F7FA',
    flex: 1,
  },
  editButton: {
    flexDirection: 'row',
    gap: 5,
  },
  editPhotoOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 136, 177, 0.7)',
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
    padding: 5,
  },
  editPhotoText: {
    color: 'white',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
  },
  fallbackAvatar: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  fallbackText: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 18,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  infoItemLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  infoLabel: {
    color: '#899193',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
    marginLeft: 12,
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  infoValue: {
    color: '#6B7280',
    flex: 1,
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
    marginLeft: 20,
    textAlign: 'right',
  },
  joinedDate: {
    color: '#6B7280',

    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
  },
  loadingAvatar: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
  logoutItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 12,
  },

  logoutLabel: {
    color: '#FF4444',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
    fontWeight: '500',
    marginLeft: 12,
  },
  profileCard: {
    borderRadius: 12,

    marginHorizontal: 5,
    padding: 20,
  },
  profileImage: {
    borderColor: '#0088B1',
    borderRadius: 40,
    borderWidth: 3,
    height: 80,
    width: 80,
  },
  profileImageContainer: {
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#E5E7EB',
  },
  profileName: {
    color: '#1F2937',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  scrollView: {
    flex: 1,
  },

  sectionTitle: {
    color: '#1F2937',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
    fontWeight: '600',
  },
});
export default styles;
