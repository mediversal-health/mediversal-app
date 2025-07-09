import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  buttonContainer: {
    gap: 5,
    width: '100%',
  },
  dividerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    width: '100%',
  },
  dividerLine: {
    backgroundColor: '#E0E0E0',
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: '#666',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
    paddingHorizontal: 16,
  },
  headerContainer: {
    alignItems: 'flex-start',
    marginBottom: 24,
    width: '100%',
  },
  locationButton: {
    alignItems: 'center',
    borderColor: '#0088B1',
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    paddingVertical: 12,
    width: '100%',
  },
  locationButtonText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
  },
  manuallocationButton: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    paddingVertical: 12,
    width: '100%',
  },
  manuallocationButtonText: {
    color: '#FFF',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 32,
  },
  subtitle: {
    color: '#666',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 16,
  },
  title: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
    fontSize: 24,
    marginBottom: 6,
  },
});

export default styles;
