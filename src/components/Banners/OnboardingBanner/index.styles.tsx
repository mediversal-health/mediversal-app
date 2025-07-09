import { Platform, StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
  gradientBox: {
    borderRadius: 12,
    elevation: 5,
    flex: 1,
    height: 230,
    overflow: 'hidden',
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  onboardingContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 0,
    width: '100%',
  },
  stepBox: {
    alignItems: 'center',
    backgroundColor: '#E8F4F7',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 4,

    padding: 12,
  },
  stepLabel: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 10,
  },
  stepText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  stepsRow: {
    alignItems: 'center',
    backgroundColor: '#E8F4F7',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    width: '100%',
  },
  subtitleText: {
    color: '#fff',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleText: {
    color: '#fff',
    fontFamily: Fonts.JakartaBold,
    fontSize: 18,
    marginBottom: 4,
  },
});
export default styles;
