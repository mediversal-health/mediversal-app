import {Platform, StatusBar, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  progressCircle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 15,
    borderColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  uploadText: {
    marginTop: 4,
    fontSize: 12,
    color: '#6D7578',
    fontWeight: 'regular',
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    borderBottomWidth: 4,
    borderBottomColor: '#0088B1',
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: '#E8F4F7',
    borderStartEndRadius: 8,
    borderBottomEndRadius: 8,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardTextContainer: {
    flexDirection: 'column',
  },
  cardTextTop: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  cardTextBottom: {
    fontSize: 11,
    color: '#000',
  },
  heading: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  description: {
    fontSize: 10,
    color: '#899193',
    marginBottom: 20,
  },
  bottomCard: {
    backgroundColor: '#0088B1',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  bottomCardText: {
    color: '#F8F8F8',
    fontSize: 13,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#161D1F',
    marginTop: 16,
  },
  uploadMethodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  recentListContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 175,
    padding: 10,
    marginTop: 8,
  },

  uploadCard: {
    width: 116,
    height: 110,
    backgroundColor: '#E8F4F7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconWrapper: {
    backgroundColor: '#0088B129',
    padding: 12,
    borderRadius: 50,
    marginBottom: 8,
  },
  methodLabel: {
    fontSize: 8,
    color: '#161D1F',
    marginBottom: 16,
  },
  successStrip: {
    position: 'absolute',
    bottom: 0,
    height: 12,
    width: '100%',
    backgroundColor: '#50B57F',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 8,
    color: '#FFFFFF',
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  viewAll: {
    fontSize: 12,
    color: '#0088B1',
    fontWeight: '600',
  },
  noPrescriptionSection: {
    marginTop: 16,
  },
  noPrescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 6,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0088B114',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  noPrescriptionText: {
    fontSize: 12,
    color: '#0088B1',
    fontWeight: '500',
  },
  consultCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  consultCard: {
    width: 122,
    height: 87,
    backgroundColor: '#E8F4F7',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    padding: 8,
  },
  consultIconWrapper: {
    backgroundColor: '#0088B114',
    padding: 8,
    borderRadius: 24,
    marginBottom: 6,
  },
  consultText: {
    fontSize: 10,
    color: '#161D1F',
  },
  consultTime: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#161D1F',
  },
  consultButton: {
    height: 47,
    backgroundColor: '#0088B1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  consultButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  consultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 16,
  },

  consultTitle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#161D1F',
  },

  consultSubtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#161D1F',
  },
});

export default styles;
