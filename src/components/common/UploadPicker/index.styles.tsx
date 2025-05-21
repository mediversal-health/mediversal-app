// src/app/component/styles/TakePhotoCapture.styles.ts

import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },

  cameraBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#888',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cameraText: {
    fontSize: 16,
    color: '#333',
  },

  reviewContainer: {
    alignItems: 'center',
  },

  previewImage: {
    width: 250,
    height: 350,
    borderRadius: 12,
    marginBottom: 16,
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
    fontFamily: Fonts.JakartaBold,
    color: '#0088B1',
    textAlign: 'center',
  },

  modalMessage: {
    fontSize: 14,
    color: '#899193',
    marginTop: 8,
    fontWeight: '400',
    flex: 1,
    fontFamily: Fonts.JakartaRegular,
  },

  // Updated to vertical layout for modal buttons
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
    fontFamily: Fonts.JakartaBold,
  },

  modalCancelBtn: {
    borderColor: '#0088B1',
    borderWidth: 1,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontFamily: Fonts.JakartaRegular,
  },

  modalCancelText: {
    color: '#0088B1',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  pickerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#6D7578',
    fontSize: 16,
    fontFamily: Fonts.JakartaRegular,
  },
  previewContainer: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  previewTitle: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
    fontFamily: Fonts.JakartaBold,
  },
  fileName: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
});
