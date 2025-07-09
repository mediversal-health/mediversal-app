import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    height: 140, // Container height for the scrollable area
  },
  divider: {
    backgroundColor: '#d1e7dd',
    height: '100%',
    width: 1,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 2,
  },
  featureItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 4,
  },
  featureRow: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    flexDirection: 'row',
    marginBottom: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  featureText: {
    color: '#555555',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 6,
    textAlign: 'center',
  },
  guaranteeCard: {
    backgroundColor: '#e8f8f1',
    borderColor: '#50B57F',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    marginRight: 12,
    padding: 16,
    width: 250,
  },
  guaranteeDescription: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 8,
    lineHeight: 12,
    marginBottom: 2,
  },
  guaranteeTitle: {
    color: '#222222',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
    marginBottom: 6,
  },
  personalizedCard: {
    backgroundColor: '#f0f8ff',
    borderColor: '#0088B1',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 16,
    width: 250,
  },
  personalizedFeatureText: {
    color: '#444444',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
    marginLeft: 6,
  },
  personalizedFeatures: {
    marginTop: 4,
  },
  personalizedSubtitle: {
    color: '#555555',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 8,
    marginBottom: 8,
  },
  personalizedTitle: {
    color: '#111111',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
    marginBottom: 4,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingRight: 24, // Extra padding on right for better UX when scrolling
  },
  verifiedBadge: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#38B87C',
    borderRadius: 6,
    flexDirection: 'row',
    height: 20,
    marginBottom: 5,
    paddingHorizontal: 5,
    paddingVertical: 6,
    width: 'auto',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    fontWeight: '300',
    lineHeight: 8,
    marginLeft: 4,
  },
});
