import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  gradientBox: {
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
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 10,

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
    fontWeight: '500',
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
    fontWeight: '500',
    marginTop: 6,
    textAlign: 'center',
  },
});
export default styles;
