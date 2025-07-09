import { StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

export const styles = StyleSheet.create({
  arrowImage: {
    width: '100%', // or specific width
    height: '100%', // or specific height
  },
  arrowPatternContainer: {
    height: 80,
    left: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    width: '35%',
    zIndex: 2, // This allows touches to pass through to components beneath
  },
  backgroundGradient: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  container: {
    overflow: 'hidden',
    width: '100%',
  },
  content: {
    paddingBottom: 16,
    paddingHorizontal: 16,
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#0088B1',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    position: 'relative',
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 16,
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    height: 28,
    justifyContent: 'center',
    marginRight: 12,
    width: 28,
  },
});

export default styles;
