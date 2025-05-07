import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    backgroundColor: '#f8f8f8',
    padding: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0088B1',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  changeEmail: {
    marginBottom: 16,
  },
  grayText: {
    fontSize: 14,
    color: '#666',
  },
  linkText: {
    color: '#0088B1',
    fontWeight: '600',
  },
  emailBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  emailText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '600',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  timerText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  filledButton: {
    backgroundColor: '#0088B1',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#0088B1',
  },
  buttonText: {
    fontSize: 16,
    color: '#f8f8f8',
    fontWeight: '600',
  },
  primaryText: {
    color: '#0088B1',
  },
});
export default styles;
