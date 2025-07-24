import {StatusBar, StyleSheet, Platform} from 'react-native';
import {FontColors, Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FontColors.tertiary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 10,
  },

  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: FontColors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
    color: FontColors.textBlack,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    marginBottom: 10,
    marginTop: 16,
  },
  searchContainer: {
    backgroundColor: FontColors.secondary,
    borderRadius: 12,
    paddingVertical: Platform.OS === 'android' ? 3 : 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Platform.OS === 'android' ? 0 : 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
    color: FontColors.textBlack,
  },
  filterChipsWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 0.3,
    marginRight: 10,
  },
  activeChip: {
    backgroundColor: FontColors.primary,
  },
  chipText: {
    fontSize: 10,
    color: FontColors.textBlack,
    fontFamily: Fonts.JakartaRegular,
    textAlign: 'center',
  },
  activeChipText: {
    color: FontColors.tertiary,
    fontFamily: Fonts.JakartaMedium,
    textAlign: 'center',
    fontSize: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 16,
    marginTop: 10,
  },
  orderList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
export default styles;
