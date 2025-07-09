import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Fonts } from '../../styles/fonts';

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: '#e8f4f7',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  bottomCard: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
  },
  bottomCardText: {
    color: '#F8F8F8',
    fontSize: 13,
  },
  cardItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  cardTextBottom: {
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 11,
  },
  cardTextContainer: {
    flexDirection: 'column',
  },
  cardTextTop: {
    color: '#000',
    fontFamily: Fonts.JakartaBold,
    fontSize: 12,
  },
  consultButton: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 8,
    height: 47,
    justifyContent: 'center',
  },
  consultButtonText: {
    color: '#FFFFFF',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
  },
  consultCard: {
    alignItems: 'center',
    backgroundColor: '#E8F4F7',
    borderRadius: 8,
    flex: 1,
    height: 87,
    justifyContent: 'center',
    paddingVertical: 12,
    padding: 8,
  },
  consultCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  consultIconWrapper: {
    backgroundColor: '#0088B114',
    borderRadius: 24,
    marginBottom: 6,
    padding: 8,
  },
  consultRow: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 12,
  },
  consultSubtitle: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
  },
  consultText: {
    color: '#161D1F',
    fontSize: 10,
  },
  consultTime: {
    color: '#161D1F',
    fontSize: 12,
    fontWeight: 'bold',
  },
  consultTitle: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  description: {
    color: '#899193',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    marginBottom: 20,
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
    paddingBottom: 10,

    paddingHorizontal: 20,
  },
  heading: {
    color: '#000000',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
    marginBottom: 8,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: '#0088B114',
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    marginRight: 8,
    width: 24,
  },
  iconWrapper: {
    backgroundColor: '#0088B129',
    borderRadius: 50,
    marginBottom: 8,
    padding: 12,
  },
  infoCard: {
    alignItems: 'center',
    backgroundColor: '#E8F4F7',
    borderBottomColor: '#0088B1',
    borderBottomEndRadius: 8,
    borderBottomWidth: 4,
    borderStartEndRadius: 8,
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  methodLabel: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
    marginBottom: 16,
  },
  noPrescriptionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
    marginLeft: 6,
  },
  noPrescriptionSection: {
    marginTop: 16,
  },
  noPrescriptionText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
  },
  progressCircle: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'pink',
    borderRadius: 100,
    borderWidth: 15,
    height: 150,
    justifyContent: 'center',
    marginBottom: 20,
    width: 150,
  },
  recentHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  recentListContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 175,
    marginTop: 8,
    padding: 10,
  },
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  sectionTitle: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
    marginTop: 16,
  },
  successStrip: {
    alignItems: 'center',
    backgroundColor: '#50B57F',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    bottom: 0,
    height: 12,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  successText: {
    color: '#FFFFFF',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
  },
  underline: {
    fontFamily: Fonts.JakartaRegular,
    textDecorationLine: 'underline',
  },
  uploadCard: {
    alignItems: 'center',
    backgroundColor: '#E8F4F7',
    borderRadius: 8,
    flex: 1,
    height: 110,
    justifyContent: 'center',
    position: 'relative',
  },
  uploadMethodsRow: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
    justifyContent: 'space-between',
    marginTop: 12,
  },

  uploadText: {
    color: '#6D7578',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    marginTop: 4,
  },

  viewAll: {
    color: '#0088B1',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default styles;
