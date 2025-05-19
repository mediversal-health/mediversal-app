import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEBD4',
    borderRadius: 8,

    overflow: 'hidden',
    width: 83.5,
    height: 83.5,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    display: 'flex',
  },
  title: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
  },
});
export default styles;
