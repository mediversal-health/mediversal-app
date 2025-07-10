import { StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '../../styles/fonts';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  backgroundDecoration: {
    position: 'absolute',
    top: -height * 0.15,
    right: -width * 0.2,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: '#E6F4F8',
    opacity: 0.5,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: height * 0.1,
    paddingBottom: 40,
    alignItems: 'center',
  },
  iconContainer: {
    marginTop: -80,
    // alignItems: 'center',
    // position: 'relative',
  },

  title: {
    fontSize: 24,
    fontFamily: Fonts.JakartaBold,
    color: '#0088B1',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: -50,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
    color: '#161D1F',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
    maxWidth: '80%',
  },
  detailsCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardHeader: {
    marginBottom: 20,
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#1A1A1A',
  },
  amountSection: {
    alignItems: 'center',
  },
  lottie: {
    width: 300,
    height: 300,
  },
  amountLabel: {
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
    color: '#64748B',
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 24,
    fontFamily: Fonts.JakartaBold,
    color: '#0088B1',
  },
  separator: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: Fonts.JakartaMedium,
    color: '#475569',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#1A1A1A',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#0088B1',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#0088B1',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#0088B1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#0088B1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginBottom: 20,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#FFFFFF',
  },
  supportLink: {
    paddingVertical: 8,
  },
  supportText: {
    fontSize: 14,
    fontFamily: Fonts.JakartaBold,
    color: '#000',
    textDecorationLine: 'underline',
  },
});
