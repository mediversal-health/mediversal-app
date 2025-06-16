import {StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

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
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#0088B1',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#E5E7EB',
  },
  profileName: {
    fontSize: 20,
    fontFamily: Fonts.JakartaSemiBold,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  joinedDate: {
    fontSize: 14,

    fontFamily: Fonts.JakartaSemiBold,
    color: '#6B7280',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
    fontWeight: '600',
    color: '#1F2937',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  AddressinfoItem: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 10,
  },
  infoItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#899193',
    marginLeft: 12,
  },
  infoValue: {
    fontSize: 10,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#6B7280',
    textAlign: 'right',
    flex: 1,
    marginLeft: 20,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 10,
  },
  logoutLabel: {
    fontSize: 10,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#FF4444',
    marginLeft: 12,
    fontWeight: '500',
  },
});
export default styles;
