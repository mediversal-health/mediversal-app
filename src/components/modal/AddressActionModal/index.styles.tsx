import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  modalCancel: {
    paddingVertical: 15,
  },
  modalCancelText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalIcon: {
    marginRight: 15,
  },
  modalOption: {
    alignItems: 'center',
    backgroundColor: '#E8F4F7',
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  modalOptionText: {
    color: '#000',
    flex: 1,
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 16,
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalTitle: {
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
    fontSize: 24,
    marginBottom: 20,
    paddingBottom: 15,
  },
});

export default styles;
