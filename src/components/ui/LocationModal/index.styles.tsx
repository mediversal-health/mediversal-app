import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  headerContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 24,
  },
  title: {
    marginBottom: 6,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0088B1',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
    gap: 5,
  },
  locationButton: {
    width: '100%',
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0088B1',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  locationButtonText: {
    color: '#0088B1',
    fontSize: 16,
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
    fontWeight: '500',
  },
  manuallocationButton: {
    width: '100%',
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#0088B1',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  manuallocationButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default styles;
