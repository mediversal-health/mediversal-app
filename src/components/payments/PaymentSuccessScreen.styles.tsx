import { StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '../../styles/fonts';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 24,
    width: '100%',
  },
  amountLabel: {
    color: '#64748B',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
    marginBottom: 8,
  },
  amountSection: {
    alignItems: 'center',
  },
  amountValue: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
    fontSize: 24,
  },

  backgroundDecoration: {
    backgroundColor: '#E6F4F8',
    borderRadius: width * 0.3,
    height: width * 0.6,
    opacity: 0.5,
    position: 'absolute',
    right: -width * 0.2,
    top: -height * 0.15,
    width: width * 0.6,
  },
  cardHeader: {
    justifyContent: 'flex-start',
    marginBottom: 20,
  },

  cardTitle: {
    color: '#1A1A1A',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 18,
  },
  container: {
    backgroundColor: '#F7F7F7',
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 40,
    paddingHorizontal: 24,
    paddingTop: height * 0.1,
  },
  detailLabel: {
    color: '#475569',
    flex: 1,
    fontFamily: Fonts.JakartaMedium,
    fontSize: 14,
  },
  detailRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  detailValue: {
    color: '#1A1A1A',
    flex: 1,
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
    marginLeft: 16,
    textAlign: 'right',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 4,
    marginBottom: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: '100%',
  },
  iconContainer: {
    marginTop: -80,
    // alignItems: 'center',
    // position: 'relative',
  },
  lottie: {
    height: 300,
    width: 300,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 12,
    elevation: 4,
    marginBottom: 20,
    paddingVertical: 16,
    shadowColor: '#0088B1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: '100%',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 16,
  },
  safeArea: {
    backgroundColor: '#F7F7F7',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#0088B1',
    borderRadius: 12,
    borderWidth: 1.5,
    elevation: 2,
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  secondaryButtonText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
  },
  separator: {
    backgroundColor: '#E2E8F0',
    height: 1,
    marginVertical: 16,
  },
  subtitle: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    lineHeight: 24,
    marginBottom: 20,
    maxWidth: '80%',
    textAlign: 'center',
  },
  supportLink: {
    paddingVertical: 8,
  },
  supportText: {
    color: '#000',
    fontFamily: Fonts.JakartaBold,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  title: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
    fontSize: 24,
    marginBottom: 8,
    marginTop: -50,
    textAlign: 'center',
  },
});
