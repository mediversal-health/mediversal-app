import { StyleSheet } from 'react-native';
import { Fonts } from '../../styles/fonts';

const styles = StyleSheet.create({
  activeChip: {
    backgroundColor: '#0088B1',
  },
  activeChipText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: '#e8f4f7',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  chip: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chipText: {
    color: '#374151',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 11,
  },
  container: {
    backgroundColor: '#f9fafb',
    flex: 1,
  },
  divider: {
    backgroundColor: '#e5e7eb',
    height: 1,
    marginBottom: 16,
    marginTop: 10,
  },
  filterChipsWrapper: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  headerTitle: {
    color: '#111827',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 16,
  },
  headerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '11%',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  orderList: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: '#e8f4f7',
    borderColor: '#ccc',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  searchInput: {
    color: '#111827',
    flex: 1,
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
  },
  searchTextWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    gap: 5,
  },
  searchWrapper: {
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
});
export default styles;
