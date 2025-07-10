import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  timelineContainer: {
    height: 80,
    justifyContent: 'center',
  },
  timelineBackground: {
    position: 'absolute',
    height: 4,
    width: '100%',
    backgroundColor: '#E5E8E9',
    borderRadius: 2,
  },
  timelineActive: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#12B76A',
    borderRadius: 2,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  step: {
    alignItems: 'center',
  },
  stepIcon: {
    width: 18,
    height: 18,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepIconText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 10,
    fontFamily: Fonts.JakartaSemiBold,
    marginBottom: 4,
    textAlign: 'center',
  },
  stepDate: {
    fontSize: 10,
    fontFamily: Fonts.JakartaRegular,
    color: '#667085',
    textAlign: 'center',
  },
});
export default styles;
