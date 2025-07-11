import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEBD4',
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
    height: 83.5,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
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
