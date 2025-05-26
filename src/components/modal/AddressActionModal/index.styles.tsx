import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: Fonts.JakartaBold,
    color: '#0088B1',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingBottom: 15,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#E8F4F7',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  modalIcon: {
    marginRight: 15,
  },
  modalOptionText: {
    fontSize: 16,
    flex: 1,
    color: '#000',
    fontFamily: Fonts.JakartaSemiBold,
  },
  modalCancel: {
    paddingVertical: 15,
  },
  modalCancelText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default styles;
