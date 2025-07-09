import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

export const styles = StyleSheet.create({
  billTitle: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#B0B6B8',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    marginHorizontal: 12,
    marginTop: 12,
    paddingHorizontal: 5,
  },
  cardContent: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  cutPrice: {
    color: '#B0B6B8',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  detailsHeading: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
    marginVertical: 6,
  },
  detailsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 12,
    marginHorizontal: 12,
    paddingHorizontal: 10,
  },
  finalPrice: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
  },
  inclCharges: {
    color: '#6C7375',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
  },
  leftText: {
    color: '#333',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 13,
  },
  priceWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  rightText: {
    color: '#333',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  savingsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    marginLeft: 14,
    marginVertical: 6,
  },
  savingsText: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
  },
  totalToPay: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
    marginBottom: 2,
  },
});
