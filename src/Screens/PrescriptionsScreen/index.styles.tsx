import {Platform, StatusBar, StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',

    gap: 10,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8f4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#111827',
  },
  searchWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  searchContainer: {
    backgroundColor: '#e8f4f7',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-between',
  },
  searchTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.JakartaRegular,
    color: '#111827',
  },
  filterChipsWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 8,
  },
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  activeChip: {
    backgroundColor: '#0088B1',
  },
  chipText: {
    fontSize: 11,
    color: '#374151',
    fontFamily: Fonts.JakartaRegular,
  },
  activeChipText: {
    color: '#ffffff',
    fontWeight: '500',
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
  text: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 10,
  },
});
export default styles;
