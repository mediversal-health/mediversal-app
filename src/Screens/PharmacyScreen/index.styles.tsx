import {StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

const styles = StyleSheet.create({
  safeArea: {
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  containerx: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  item: {
    alignItems: 'center',
    width: '23%',
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
    fontFamily: Fonts.JakartaRegular,
  },
  priscriptionContainer: {
    width: '100%',
    backgroundColor: '#E8F4F7',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    marginVertical: 20,
  },
  priscriptionText: {
    flex: 1,
    color: '#FFF',
    fontFamily: Fonts.JakartaSemiBold,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 8,
    fontFamily: Fonts.JakartaRegular,
  },
  uploadButton: {
    borderRadius: 12,
    backgroundColor: '#E8F4F7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    fontWeight: '600',
    color: '#0088B1',
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
  },
  gradientBox: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 10,

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
    fontSize: 16,
    color: '#EB5757',
    marginBottom: 4,
    fontFamily: Fonts.JakartaSemiBold,
  },
  highlight: {
    fontSize: 20,
    color: '#EB5757',
    marginBottom: 6,
    fontFamily: Fonts.JakartaItalic,
  },
  subtext: {
    fontSize: 12,
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
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
  },
  imagecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
export default styles;
