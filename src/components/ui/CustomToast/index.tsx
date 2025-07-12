import React, {useState, useEffect, useRef} from 'react';
import {Text, Animated, View} from 'react-native';
import {CheckCircle, XCircle, AlertCircle, Info} from 'lucide-react-native';
import {styles} from './GlobalCustomToast.styles';

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

  const getIcon = () => {
    if (!showIcon) return null;

    const iconProps = {
      size: 18,
      color: 'white',
      style: styles.icon,
    };

    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} />;
      case 'error':
        return <XCircle {...iconProps} />;
      case 'warning':
        return <AlertCircle {...iconProps} />;
      case 'info':
        return <Info {...iconProps} />;
      default:
        return null;
    }
  };

  const getTypeStyle = () => {
    switch (type) {
      case 'success':
        return styles.success;
      case 'error':
        return styles.error;
      case 'warning':
        return styles.warning;
      case 'info':
        return styles.info;
      default:
        return styles.success;
    }
  };

  useEffect(() => {
    // Cleanup existing animations and timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }

    if (visible) {
      // Slide down animation sequence
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
          timeoutRef.current = setTimeout(() => {
            onHide();
          }, 0);
        }
      });
    } else {
      slideAnim.setValue(-100);
    }

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
        getTypeStyle(),
        {transform: [{translateY: slideAnim}]},
      ]}>
      <View style={styles.content}>
        {getIcon()}
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

export default GlobalCustomToast;
