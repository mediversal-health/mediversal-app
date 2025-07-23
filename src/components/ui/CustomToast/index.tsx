import React, {useState, useEffect, useRef} from 'react';
import {Text, Animated, View} from 'react-native';
import {CheckCircle, XCircle, AlertCircle, Info} from 'lucide-react-native';
import styles from './GlobalCustomToast.styles';

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
  const [slideAnim] = useState(new Animated.Value(100)); // Start from bottom
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          iconColor: '#34C759',
          textColor: '#34C759',
          contentBg: '#E6F4EA',
        };
      case 'error':
        return {
          iconColor: '#EF4444',
          textColor: '#EF4444',
          contentBg: '#FFD0D0',
        };
      case 'warning':
        return {
          iconColor: '#F59E0B',
          textColor: '#F59E0B',
          contentBg: '#FEF3C7',
        };
      case 'info':
        return {
          iconColor: '#3B82F6',
          textColor: '#3B82F6',
          contentBg: '#DBEAFE',
        };
      default:
        return {
          iconColor: '#34C759',
          textColor: '#34C759',
          contentBg: '#E6F4EA',
        };
    }
  };

  const {iconColor, textColor, contentBg} = getTypeStyles();

  const getIcon = () => {
    if (!showIcon) return null;

    const iconProps = {
      size: 20,
      color: 'white',
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
      // Slide up animation sequence
      animationRef.current = Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(slideAnim, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]);

      animationRef.current.start(({finished}) => {
        if (finished) {
          timeoutRef.current = setTimeout(() => {
            onHide();
          }, 0);
        }
      });
    } else {
      slideAnim.setValue(100);
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
      style={[styles.toast, {transform: [{translateY: slideAnim}]}]}>
      {showIcon && (
        <View style={[styles.iconContainer, {backgroundColor: iconColor}]}>
          {getIcon()}
        </View>
      )}
      <View style={[styles.content, {backgroundColor: contentBg}]}>
        <Text style={[styles.message, {color: textColor}]}>{message}</Text>
      </View>
    </Animated.View>
  );
};

export default GlobalCustomToast;
