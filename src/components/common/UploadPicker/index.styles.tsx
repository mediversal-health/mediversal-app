// src/app/component/styles/TakePhotoCapture.styles.ts

import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },

  cameraBox: {
    alignItems: 'center',
    borderColor: '#888',
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 2,
    justifyContent: 'center',
    padding: 40,
  },
  cameraLoading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  cameraText: {
    color: '#333',
    fontSize: 16,
  },

  reviewContainer: {
    alignItems: 'center',
  },

  previewImage: {
    borderRadius: 12,
    height: 350,
    marginBottom: 16,
    width: 250,
  },

  uploadedImage: {
    borderBlockColor: '#0088B1',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    height: 150,
    marginBottom: 10,
    width: 100,
  },

  uploadMore: {
    alignItems: 'center',
    marginTop: 10,
  },

  uploadMoreText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    marginBottom: 10,
  },

  footerButtonsColumn: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 16,
  },

  proceed: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 10,
    height: 44,
    justifyContent: 'center',
    marginVertical: 8,
    width: '100%',
  },

  proceedText: {
    color: '#F8F8F8',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
  },

  cancel: {
    alignItems: 'center',
    borderColor: '#0088B1',
    borderRadius: 10,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: '100%',
  },

  cancelText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
  },

  modalOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 250,
    justifyContent: 'space-between',
    padding: 20,
    width: '80%',
  },

  modalTitle: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
    fontSize: 14,
    textAlign: 'center',
  },

  modalMessage: {
    color: '#899193',
    flex: 1,
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 8,
  },

  // Updated to vertical layout for modal buttons
  modalButtons: {
    flexDirection: 'column',
    gap: 10,
  },

  modalRemoveBtn: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 8,
    height: 44,
    justifyContent: 'center',
    width: '100%',
  },

  modalRemoveText: {
    color: '#F8F8F8',
    fontFamily: Fonts.JakartaBold,
    fontSize: 12,
    textAlign: 'center',
  },

  modalCancelBtn: {
    alignItems: 'center',
    borderColor: '#0088B1',
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: Fonts.JakartaRegular,
    height: 44,
    justifyContent: 'center',
    width: '100%',
  },

  modalCancelText: {
    color: '#0088B1',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  pickerLoading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#6D7578',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
    marginTop: 10,
  },
  previewContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginTop: 16,
    padding: 16,
  },
  previewTitle: {
    color: '#333',
    fontFamily: Fonts.JakartaBold,
    fontSize: 16,
    marginBottom: 6,
  },
  fileName: {
    color: '#555',
    fontSize: 14,
    marginBottom: 12,
  },
  imageContainer: {
    margin: 4,
    position: 'relative',
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    position: 'absolute',
    right: -8,
    top: -8,
    width: 24,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
