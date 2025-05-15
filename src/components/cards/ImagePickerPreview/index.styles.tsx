import {StyleSheet} from 'react-native';

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

  uploadMore: {
    alignItems: 'center',
    marginTop: 10,
  },

  uploadMoreText: {
    color: '#0088B1',
    fontSize: 12,
    marginBottom: 10,
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
    fontWeight: '600',
    color: '#0088B1',
    textAlign: 'center',
  },

  modalMessage: {
    fontSize: 14,
    color: '#899193',
    marginTop: 8,
    fontWeight: '400',
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
    fontWeight: '500',
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
    fontWeight: '500',
  },
});
