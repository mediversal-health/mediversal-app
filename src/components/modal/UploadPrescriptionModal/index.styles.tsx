import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '5%',
    minHeight: '55%',
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 24,
  },
  title: {
    marginBottom: 6,
    fontSize: 24,
    fontFamily: Fonts.JakartaBold,
    color: '#0088B1',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: Fonts.JakartaRegular,
  },
  buttonContainer: {
    width: '100%',
    gap: 5,
    marginBottom: 20,
  },
  uploadOption: {
    width: '100%',
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0088B1',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  uploadOptionText: {
    color: '#0088B1',
    fontSize: 16,
    fontFamily: Fonts.JakartaRegular,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#666',
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
  },
  previewContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    // Removed maxHeight to allow expansion
  },
  filePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 8,
  },
  imagePreview: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 10,
  },
  fileName: {
    flex: 1,
    fontFamily: Fonts.JakartaRegular,
    color: '#111827',
    marginRight: 10,
  },
  removeButton: {
    padding: 4,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#E5E7EB',
  },
  cancelButtonText: {
    color: '#111827',
    fontFamily: Fonts.JakartaSemiBold,
  },
  proceedButton: {
    backgroundColor: '#0088B1',
  },
  proceedButtonText: {
    color: 'white',
    fontFamily: Fonts.JakartaSemiBold,
  },
  confirmationModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmationTitle: {
    fontSize: 18,
    fontFamily: Fonts.JakartaBold,
    color: '#111827',
    marginBottom: 8,
  },
  confirmationText: {
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  confirmationButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelConfirmButton: {
    backgroundColor: '#E5E7EB',
  },
  cancelConfirmButtonText: {
    color: '#111827',
    fontFamily: Fonts.JakartaSemiBold,
  },
  confirmButton: {
    backgroundColor: '#0088b1',
  },
  confirmButtonText: {
    color: 'white',
    fontFamily: Fonts.JakartaSemiBold,
  },
  uploadMethodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
  },
  recentListContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 175,
    padding: 10,
    marginTop: 8,
  },
  uploadCard: {
    flex: 1,
    height: 110,
    backgroundColor: '#E8F4F7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconWrapper: {
    backgroundColor: '#0088B129',
    padding: 12,
    borderRadius: 50,
    marginBottom: 8,
  },
  methodLabel: {
    fontSize: 8,
    color: '#161D1F',
    marginBottom: 16,
    fontFamily: Fonts.JakartaRegular,
  },
  successStrip: {
    position: 'absolute',
    bottom: 0,
    height: 12,
    width: '100%',
    backgroundColor: '#50B57F',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 8,
    color: '#FFFFFF',
    fontFamily: Fonts.JakartaRegular,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#161D1F',
    marginTop: 8,
    textAlign: 'left',
  },
});

export default styles;
