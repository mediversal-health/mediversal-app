import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },

  uploadedImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    borderBlockColor: '#0088B1',
    borderWidth: 1,
  },
  galleryLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  uploadMore: {
    alignItems: 'center',
    marginTop: 10,
  },

  uploadMoreText: {
    color: '#0088B1',
    fontSize: 12,
    marginBottom: 10,
    fontFamily: Fonts.JakartaRegular,
  },

  footerButtonsColumn: {
    marginTop: 16,
    flexDirection: 'column',
    gap: 12,
  },

  proceed: {
    backgroundColor: '#0088B1',
    height: 44,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },

  proceedText: {
    color: '#F8F8F8',
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
  },

  cancel: {
    borderColor: '#0088B1',
    borderWidth: 1,
    height: 44,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelText: {
    color: '#0088B1',
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContainer: {
    width: '80%',
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'space-between',
  },

  modalTitle: {
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#0088B1',
    textAlign: 'center',
  },

  modalMessage: {
    fontSize: 14,
    color: '#899193',
    marginTop: 8,
    fontFamily: Fonts.JakartaRegular,
    flex: 1,
  },

  modalButtons: {
    flexDirection: 'column',
    gap: 10,
  },

  modalRemoveBtn: {
    backgroundColor: '#0088B1',
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  modalRemoveText: {
    color: '#F8F8F8',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: Fonts.JakartaSemiBold,
  },

  modalCancelBtn: {
    borderColor: '#0088B1',
    borderWidth: 1,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  modalCancelText: {
    color: '#0088B1',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: Fonts.JakartaSemiBold,
  },
});
