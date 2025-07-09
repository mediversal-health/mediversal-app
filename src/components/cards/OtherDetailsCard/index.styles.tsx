import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

export const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#E5E8E9',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    height: 52,
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 12,
    paddingHorizontal: 12,
  },
  expandedContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 12,
    marginVertical: 4,
    padding: 10,
  },
  expandedText: {
    color: '#333',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 13,
    lineHeight: 18,
  },
  terms: {
    color: 'green',
    fontWeight: '600',
  },
  title: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
  },
});
