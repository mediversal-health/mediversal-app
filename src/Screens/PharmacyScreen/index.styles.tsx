import {Platform, StyleSheet} from 'react-native';
import {FontColors, Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: FontColors.tertiary,
    marginTop: 16,
    paddingHorizontal: 24,
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
    backgroundColor: FontColors.primary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priscriptionText: {
    flex: 1,
    color: FontColors.tertiary,
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
  },
  subtitle: {
    color: FontColors.tertiary,
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
  },
  uploadButton: {
    borderRadius: 8,
    backgroundColor: FontColors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: FontColors.primary,
    fontSize: 10,
    fontFamily: Fonts.JakartaSemiBold,
  },
  gradientBox: {
    width: '100%',
    borderRadius: 12,
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
    fontFamily: Fonts.JakartaSemiBoldItalic,
  },
  productList: {
    paddingLeft: 24,
  },
  separator: {
    width: 12,
  },
  buttonContainer: {
    backgroundColor: FontColors.secondary,
    marginTop: 24,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  buttonText: {
    color: FontColors.primary,
    fontFamily: Fonts.JakartaMedium,
    fontSize: 12,
  },
  imagecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: FontColors.tertiary,
    marginBottom: Platform.OS === 'android' ? 45 : 30,
    padding: 25,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
export default styles;
