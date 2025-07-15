import {Platform, StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  safeArea: {
    padding: 16,
    backgroundColor: '#F8F8F8',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  containerx: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  item: {
    alignItems: 'center',
    width: '23%',
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
    fontFamily: Fonts.JakartaMedium,
  },
  priscriptionContainer: {
    width: '99%',
    alignSelf: 'center',
    backgroundColor: '#0088B1',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    marginVertical: 20,
  },
  priscriptionText: {
    flex: 1,
    color: '#F8F8F8',
    fontFamily: Fonts.JakartaSemiBold,
  },
  subtitle: {
    color: '#F8F8F8',
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
  },
  uploadButton: {
    borderRadius: 8,
    backgroundColor: '#E8F4F7',
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    fontWeight: '600',
    color: '#0088B1',
    fontSize: 10,
    fontFamily: Fonts.JakartaMedium,
  },
  gradientBox: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 0,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 10,

    marginBottom: 20,
  },
  vector1: {
    position: 'absolute',
    top: 30,
    left: 0,
  },
  vector2: {
    position: 'absolute',
    top: 10,
    left: 100,
  },
  vector3: {
    position: 'absolute',
    top: 10,
    left: 50,
  },
  vector5: {
    position: 'absolute',
    top: 30,
    right: 0,
  },
  vector4: {
    position: 'absolute',
    top: 15,
    right: 100,
  },
  vector6: {
    position: 'absolute',
    top: 10,
    right: 50,
  },
  gradientContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  title: {
    marginTop: 24,
    fontSize: 14,
    color: '#EB5757',
    marginBottom: 4,
    fontFamily: Fonts.JakartaSemiBold,
  },
  highlight: {
    fontSize: 20,
    color: '#EB5757',
    marginBottom: 6,
    fontFamily: Fonts.JakartaBoldItalic,
  },
  subtext: {
    fontSize: 10,
    color: '#000',
    textAlign: 'center',
    fontFamily: Fonts.JakartaRegular,
  },
  productList: {
    paddingVertical: 10,
  },
  separator: {
    width: 12,
  },
  buttonContainer: {
    backgroundColor: '#E8F4F7',
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: Platform.OS === 'android' ? 16 : 16,
  },
  buttonText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
  },
  imagecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    marginBottom: Platform.OS === 'android' ? 45 : 30,
    padding: 25,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
export default styles;
