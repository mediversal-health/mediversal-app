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

  const toastTypeStyles: Record<ToastType, object> = {
    success: styles.success,
    error: styles.error,
    warning: styles.warning,
    info: styles.info,
  };

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
        toastTypeStyles[type],
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
  error: {
    backgroundColor: '#F44336',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  info: {
    backgroundColor: '#2196F3',
  },
  overlayIconContainer: {
    alignItems: 'center',
    bottom: 2,
    justifyContent: 'center',
    position: 'absolute',
    right: -2,
  },
  statusIcon: {
    marginRight: 8,
  },
  success: {
    backgroundColor: '#4CAF50',
  },
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toastText: {
    color: 'white',
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  warning: {
    backgroundColor: '#FF9800',
  },
});

export default GlobalCustomToast;
