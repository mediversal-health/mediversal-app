import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarContainer: {
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
    height: 40,
    justifyContent: 'center',
    marginRight: 8,
    width: 40,
  },
  cardContainer: {
    backgroundColor: '#E8F4F7',
    borderRadius: 12,
    marginBottom: 20,
    padding: 12,
  },
  cardContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  expLabel: {
    color: '#161D1F',
    flexDirection: 'row',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    textAlign: 'left',
  },
  expValue: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaBold,
    fontSize: 14,
  },
  expandedContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    flex: 1,
    marginBottom: 12,
    marginHorizontal: 5,
    marginTop: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  expandedSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  labelText: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
  },
  nameSection: {
    flex: 1,
  },
  nameText: {
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 16,
  },
  onlineText: {
    color: '#50B57F',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
    marginLeft: 4,
  },
  pharmacistLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },
  statusDot: {
    alignItems: 'center',
    backgroundColor: '#C9FFD7',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 'auto',
    padding: 4,
    paddingHorizontal: 8,
  },
  verificationIconText: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    marginLeft: 4,
  },

  verificationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
  },

  verificationTextLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  verificationTextRight: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  xpandedContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    flex: 1,
    marginBottom: 12,
    marginHorizontal: 5,
    marginTop: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
});
export default styles;
