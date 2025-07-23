import {StyleSheet} from 'react-native';
import {FontColors, Fonts} from '../../../styles/fonts';

export const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#B0B6B8',
    borderRadius: 10,
    marginHorizontal: 24,
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginTop: 12,
    backgroundColor: '#fff',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  billTitle: {
    color: FontColors.textBlack,
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cutPrice: {
    color: '#B0B6B8',
    textDecorationLine: 'line-through',
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
  },
  finalPrice: {
    fontSize: 12,
    color: FontColors.textBlack,
    fontFamily: Fonts.JakartaSemiBold,
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 14,
    marginVertical: 6,
  },
  savingsText: {
    color: '#161D1F',
    fontSize: 10,
    fontFamily: Fonts.JakartaSemiBold,
  },
  detailsSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginHorizontal: 24,
    borderRadius: 10,
    marginTop: 12,
  },
  inclCharges: {
    color: '#6D7578',
    fontSize: 10,
    fontFamily: Fonts.JakartaMedium,
  },

  detailsHeading: {
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
    marginVertical: 6,
    color: FontColors.textBlack,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderColor: '#D3D7D8',
    marginVertical: 8,
  },
  leftText: {
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
    color: FontColors.textBlack,
  },
  rightText: {
    color: FontColors.textBlack,
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
  },
  rightTextlinethrough: {
    fontSize: 13,
    color: FontColors.textBlack,
    fontFamily: Fonts.JakartaRegular,
    textDecorationLine: 'line-through',
  },
  totalToPay: {
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
    color: '#161D1F',
  },
  totalAmount: {
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
    color: FontColors.primary,
  },
  rowTotal: {
    borderColor: '#D3D7D8',
    borderTopWidth: 1,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
