import {StyleSheet} from 'react-native';
import {FontColors, Fonts} from '../../../styles/fonts';

export const styles = StyleSheet.create({
  card: {
    height: 52,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E8E9',
    marginHorizontal: 24,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 24,
  },
  title: {
    fontSize: 12,
    color: FontColors.textBlack,
    fontFamily: Fonts.JakartaMedium,
  },
  expandedContent: {
    marginHorizontal: 24,
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 4,
    borderRadius: 8,
  },
  expandedText: {
    fontSize: 10,
    color: FontColors.textBlack,
    lineHeight: 18,
    fontFamily: Fonts.JakartaRegular,
  },
  terms: {
    color: 'green',
    fontWeight: '600',
  },
});
