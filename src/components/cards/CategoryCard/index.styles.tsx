import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEBD4',
    borderRadius: 8,
    flex: 1,
    height: 83.5,
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingHorizontal: 20,
  },
  imageContainer: {
    display: 'flex',
    flex: 1,
    width: '100%',
  },
  title: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    marginTop: 8,
    textAlign: 'center',
  },
});
export default styles;
