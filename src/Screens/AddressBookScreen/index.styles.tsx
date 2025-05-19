import {Platform, StatusBar, StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    gap: 10,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8f4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    color: '#212121',
    fontFamily: Fonts.JakartaBold,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.JakartaBold,
    color: '#212121',
    marginBottom: 12,
  },
  contactTitle: {
    marginTop: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#606060',
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.JakartaRegular,
  },
  inputFilled: {
    backgroundColor: '#D3D7D8',
    borderWidth: 0,
  },
  inputFocused: {
    borderColor: '#0088B1',
    backgroundColor: '#E8F4F7',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  addressTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  addressTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    backgroundColor: 'transparent',
    minWidth: 80,
  },
  selectedAddressType: {
    borderColor: '#0088B1',
    backgroundColor: '#0088B1',
  },
  addressTypeText: {
    fontSize: 10,
    color: '#000',
    marginLeft: 4,
    fontFamily: Fonts.JakartaRegular,
  },
  selectedAddressTypeText: {
    color: '#FFFFFF',
  },
  infoText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 8,
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: '#0088B1',
    height: 52,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default styles;
