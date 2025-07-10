import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#E8F4F7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
    marginRight: 12,
    justifyContent: 'center',
  },
  nameSection: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontFamily: Fonts.JakartaSemiBold,
  },
  pharmacistLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  labelText: {
    fontSize: 12,
    color: '#161D1F',
    fontFamily: Fonts.JakartaRegular,
  },
  avatarContainer: {
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginRight: 8,
  },
  statusDot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    backgroundColor: '#C9FFD7',
    borderRadius: 100,
    padding: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  onlineText: {
    fontSize: 8,
    color: '#50B57F',
    fontFamily: Fonts.JakartaRegular,
    marginLeft: 4,
  },
  expandedContent: {
    marginTop: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    flex: 1,
  },
  expandedSection: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expLabel: {
    fontSize: 12,
    color: '#161D1F',
    fontFamily: Fonts.JakartaRegular,
    textAlign: 'left',
    flexDirection: 'row',
  },
  expValue: {
    fontSize: 14,
    color: '#161D1F',
    fontFamily: Fonts.JakartaBold,
  },
  xpandedContent: {
    marginTop: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    flex: 1,
  },

  verificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },

  verificationTextLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  verificationTextRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  verificationIconText: {
    fontSize: 12,
    color: '#161D1F',
    fontFamily: Fonts.JakartaRegular,
    marginLeft: 4,
  },
});
export default styles;
