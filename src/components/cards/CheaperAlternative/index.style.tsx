import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#0088B1',
    position: 'relative',
    zIndex: 1,
    height: 80,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  arrowImage: {
    width: '100%', // or specific width
    height: '100%', // or specific height
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    zIndex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  arrowPatternContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '35%',
    height: 80,
    zIndex: 2,
    overflow: 'hidden',
    pointerEvents: 'none', // This allows touches to pass through to components beneath
  },
});

export default styles;
