import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  gradientBox: {
    flex: 1,
    height: 220,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  onboardingContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleText: {
    fontSize: 18,
    fontFamily: Fonts.JakartaBold,
    color: '#fff',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
    color: '#fff',
  },
  stepsRow: {
    backgroundColor: '#E8F4F7',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  stepLabel: {
    color: '#0088B1',
    fontSize: 10,
    fontFamily: Fonts.JakartaSemiBold,
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  stepBox: {
    backgroundColor: '#E8F4F7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,

    marginHorizontal: 4,
  },
  stepText: {
    color: '#0088B1',
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
    marginTop: 6,
    textAlign: 'center',
  },
});
export default styles;
