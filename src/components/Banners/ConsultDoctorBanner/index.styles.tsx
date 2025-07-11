import {Platform, StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Platform.OS === 'ios' ? -10 : 16,
    marginVertical: Platform.OS === 'ios' ? 0 : 8,
    borderRadius: 12,
  },
  gradientContainer: {
    padding: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: Platform.OS === 'ios' ? 16 : 0,
    marginBottom: Platform.OS === 'ios' ? 30 : 0,
  },
  imageTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
    paddingRight: 16,
  },
  HeaderText: {
    fontSize: 14,
    fontFamily: Fonts.JakartaBold,
    color: '#EB5757',
    marginBottom: 4,
  },
  subTittleText: {
    fontSize: 10,
    color: '#161D1F',
    fontFamily: Fonts.JakartaSemiBold,
    marginBottom: 4,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Platform.OS === 'ios' ? 30 : 0,
    backgroundColor: '#FFEBD4',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  consultButton: {
    backgroundColor: '#FFE3C1',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: Platform.OS === 'ios' ? 16 : 0,
  },
  consultButtonText: {
    fontSize: 10,
    fontFamily: Fonts.JakartaBold,
    color: '#EB5757',
  },
});

export default styles;
