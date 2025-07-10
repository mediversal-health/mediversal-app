import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

export const styles = StyleSheet.create({
  card: {
    height: 52,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E8E9',
    marginHorizontal: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 12,
  },
  title: {
    fontSize: 14,
    color: '#161D1F',
    fontFamily: Fonts.JakartaSemiBold,
  },
  expandedContent: {
    marginHorizontal: 12,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
  },
  expandedText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
    fontFamily: Fonts.JakartaRegular,
  },
  terms: {
    color: 'green',
    fontWeight: '600',
  },
});
