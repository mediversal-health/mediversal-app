import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

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
    backgroundColor: '#50B57F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 5,

    width: 'auto',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontWeight: '300',
    marginLeft: 4,
    fontSize: 10,

    fontFamily: Fonts.JakartaRegular,
  },
  guaranteeTitle: {
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#161D1F',
    marginBottom: 6,
  },
  guaranteeDescription: {
    fontSize: 8,
    color: '#161D1F',
    marginBottom: 12,
    fontFamily: Fonts.JakartaSemiBold,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    backgroundColor: '#FFF',
    borderRadius: 8,
    alignItems: 'center',
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
    height: '75%',

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
    color: '#161D1F',
    marginBottom: 4,
  },
  personalizedSubtitle: {
    fontSize: 8,
    color: '#161D1F',
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
    color: '#B0B6B8',
    fontFamily: Fonts.JakartaRegular,
  },
});
