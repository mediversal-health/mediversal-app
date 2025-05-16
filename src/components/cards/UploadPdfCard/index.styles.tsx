import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  previewContainer: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  fileName: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
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
  },
});

export default styles;
