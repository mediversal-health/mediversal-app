import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet, Animated, View} from 'react-native';
import {CheckCircle, XCircle} from 'lucide-react-native';

// Import your SVG components - replace these with your actual imports
import SvgIcon from './assets/svgs/Vector (1).svg';
import SvgIcon2 from './assets/svgs/Asset 2 1.svg';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface GlobalCustomToastProps {
  message: string;
  visible: boolean;
  type?: ToastType;
  onHide: () => void;
  duration?: number;
  showIcon?: boolean;
}

const GlobalCustomToast: React.FC<GlobalCustomToastProps> = ({
  message,
  visible,
  type = 'success',
  onHide,
  duration = 3000,
  showIcon = true,
}) => {
  const [slideAnim] = useState(new Animated.Value(-100));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    // Clear any existing timeout and animation
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }

    if (visible) {
      // Slide down animation
      animationRef.current = Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]);

      animationRef.current.start(finished => {
        if (finished) {
          // Use setTimeout to defer the state update
          timeoutRef.current = setTimeout(() => {
            onHide();
          }, 0);
        }
      });
    } else {
      slideAnim.setValue(-100);
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, [visible, duration, slideAnim, onHide]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.toast,
        styles[type],
        {transform: [{translateY: slideAnim}]},
      ]}>
      <View style={styles.toastContent}>
        {type === 'success' && showIcon && (
          <CheckCircle size={20} color="white" style={styles.statusIcon} />
        )}
        {type === 'error' && showIcon && (
          <XCircle size={20} color="white" style={styles.statusIcon} />
        )}
        <Text style={styles.toastText}>{message}</Text>
        {showIcon && (
          <View style={styles.iconContainer}>
            <SvgIcon width={50} height={50} fill="white" />
            <View style={styles.overlayIconContainer}>
              <SvgIcon2 width={20} height={20} fill="white" />
            </View>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    paddingHorizontal: 20,
    // paddingVertical: 12,
    borderRadius: 12,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  toastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  statusIcon: {
    marginRight: 8,
  },
  overlayIconContainer: {
    position: 'absolute',
    bottom: 2,
    right: -2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  error: {
    backgroundColor: '#F44336',
  },
  warning: {
    backgroundColor: '#FF9800',
  },
  info: {
    backgroundColor: '#2196F3',
  },
  toastText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});

export default GlobalCustomToast;
