import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

export const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#B0B6B8',
    borderRadius: 10,
    marginHorizontal: 12,
    justifyContent: 'center',
    paddingHorizontal: 5,
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
    color: '#161D1F',
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
  },
  finalPrice: {
    fontSize: 12,
    color: '#161D1F',
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
    paddingHorizontal: 10,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  inclCharges: {
    color: '#6C7375',
    fontSize: 10,
    fontFamily: Fonts.JakartaSemiBold,
  },

  detailsHeading: {
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
    marginVertical: 6,
    color: '#161D1F',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  leftText: {
    fontSize: 13,
    fontFamily: Fonts.JakartaRegular,
    color: '#333',
  },
  rightText: {
    color: '#333',
    fontFamily: Fonts.JakartaRegular,
  },
  rightTextlinethrough: {
    fontSize: 13,
    color: '#333',
    fontFamily: Fonts.JakartaRegular,
    textDecorationLine: 'line-through',
  },
  totalToPay: {
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
    color: '#161D1F',
    marginBottom: 2,
  },
});
