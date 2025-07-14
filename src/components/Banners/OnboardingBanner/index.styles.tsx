import {Platform, StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
  },
  gradientBox: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 16,
    overflow: 'hidden',
    height: Platform.OS === 'ios' ? 220 : 195,
  },
  onboardingContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 0,
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleText: {
    fontSize: 14,
    fontFamily: Fonts.JakartaBold,
    color: '#F8F8F8',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 11,
    fontFamily: Fonts.JakartaRegular,
    color: '#F8F8F8',
  },
  stepsRow: {
    backgroundColor: '#E8F4F7',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
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
    gap: 12,
  },
  stepBox: {
    backgroundColor: '#E8F4F7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  stepText: {
    color: '#0088B1',
    fontSize: 10,
    fontFamily: Fonts.JakartaSemiBold,
    marginTop: 6,
    textAlign: 'center',
  },
});
export default styles;
