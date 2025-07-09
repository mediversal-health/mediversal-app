import { Platform, StyleSheet } from 'react-native';
import { Fonts } from '../../styles/fonts';

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#E8F4F7',
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: Platform.OS === 'android' ? 0 : 10,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
  },
  containerx: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  gradientBox: {
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 10,
    paddingVertical: 0,

    width: '100%',
  },
  gradientContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    width: '100%',
  },
  highlight: {
    color: '#EB5757',
    fontFamily: Fonts.JakartaItalic,
    fontSize: 20,
    marginBottom: 6,
  },
  imagecontainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    marginBottom: Platform.OS === 'android' ? 45 : 30,
    padding: 25,
  },
  item: {
    alignItems: 'center',
    width: '23%',
  },
  logo: {
    height: 200,
    width: 200,
  },
  priscriptionContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '99%',
  },
  priscriptionText: {
    color: '#FFF',
    flex: 1,
    fontFamily: Fonts.JakartaSemiBold,
  },
  productList: {
    paddingVertical: 10,
  },
  safeArea: {
    backgroundColor: '#fff',
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  separator: {
    width: 12,
  },
  subtext: {
    color: '#000',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    textAlign: 'center',
  },
  subtitle: {
    color: '#FFF',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 8,
  },
  text: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  title: {
    color: '#EB5757',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 16,
    marginBottom: 4,
  },
  uploadButton: {
    alignItems: 'center',
    backgroundColor: '#E8F4F7',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  uploadButtonText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    fontWeight: '600',
  },
  vector1: {
    left: 0,
    position: 'absolute',
    top: 30,
  },
  vector2: {
    left: 100,
    position: 'absolute',
    top: 10,
  },
  vector3: {
    left: 50,
    position: 'absolute',
    top: 10,
  },
  vector4: {
    position: 'absolute',
    right: 100,
    top: 15,
  },
  vector5: {
    position: 'absolute',
    right: 0,
    top: 30,
  },
  vector6: {
    position: 'absolute',
    right: 50,
    top: 10,
  },
});
export default styles;
