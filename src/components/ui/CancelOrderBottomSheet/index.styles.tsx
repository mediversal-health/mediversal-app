import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  modalContainer: {
    padding: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 600,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    minHeight: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.JakartaBold,
    color: '#0088B1',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 20,
    fontFamily: Fonts.JakartaRegular,
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  reasonContainer: {
    marginBottom: 24,
    minHeight: 300,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    minHeight: 48,
  },
  radioButton: {
    marginRight: 12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#0088B1',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0088B1',
  },
  reasonText: {
    fontSize: 12,
    color: '#374151',
    flex: 1,
    fontFamily: Fonts.JakartaRegular,
  },
  infoContainer: {
    backgroundColor: '#FEF3F2',
    borderRadius: 8,
    padding: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: Fonts.JakartaBold,
    color: '#EB5757',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EF4444',
    marginRight: 8,
    marginTop: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#EB5757',
    flex: 1,
    fontFamily: Fonts.JakartaRegular,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  keepOrderButton: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  keepOrderText: {
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
    color: '#374151',
  },
  cancelOrderButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelOrderButtonDisabled: {
    backgroundColor: '#F3F4F6',
    fontFamily: Fonts.JakartaRegular,
  },
  cancelOrderText: {
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
    color: '#fff',
  },
  cancelOrderTextDisabled: {
    color: '#9CA3AF',
  },
  otherReasonContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#E8F4F7',
    borderRadius: 8,
  },
  otherReasonTitle: {
    fontSize: 16,
    fontFamily: Fonts.JakartaBold,
    color: '#374151',
    marginBottom: 4,
  },
  otherReasonSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
    fontFamily: Fonts.JakartaRegular,
  },
  otherReasonInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    fontFamily: Fonts.JakartaRegular,
    color: '#374151',
    backgroundColor: '#fff',
  },
});
export default styles;
