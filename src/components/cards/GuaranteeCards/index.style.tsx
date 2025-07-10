import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    height: 140, // Container height for the scrollable area
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingRight: 24, // Extra padding on right for better UX when scrolling
  },
  guaranteeCard: {
    backgroundColor: '#e8f8f1',
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#50B57F',
    width: 250,
    flex: 1,
  },
  verifiedBadge: {
    backgroundColor: '#38B87C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 5,
    height: 20,
    width: 'auto',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontWeight: '300',
    marginLeft: 4,
    fontSize: 10,
    lineHeight: 8,
    fontFamily: Fonts.JakartaRegular,
  },
  guaranteeTitle: {
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#222222',
    marginBottom: 6,
  },
  guaranteeDescription: {
    fontSize: 8,
    color: '#161D1F',
    marginBottom: 2,
    fontFamily: Fonts.JakartaSemiBold,
    lineHeight: 12,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 2,
  },
  featureItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 4,
    borderRadius: 4,
    justifyContent: 'center',
  },
  featureText: {
    textAlign: 'center',
    fontSize: 6,
    color: '#555555',
    fontFamily: Fonts.JakartaRegular,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#d1e7dd',
  },
  personalizedCard: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#0088B1',
    width: 250,
    flex: 1,
  },
  personalizedTitle: {
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#111111',
    marginBottom: 4,
  },
  personalizedSubtitle: {
    fontSize: 8,
    color: '#555555',
    marginBottom: 8,
    fontFamily: Fonts.JakartaSemiBold,
  },
  personalizedFeatures: {
    marginTop: 4,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    backgroundColor: '#ffffff',
    paddingVertical: 4,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  personalizedFeatureText: {
    marginLeft: 6,
    fontSize: 8,
    color: '#444444',
    fontFamily: Fonts.JakartaRegular,
  },
});
