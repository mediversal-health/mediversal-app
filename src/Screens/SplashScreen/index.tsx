import {Dimensions, Animated} from 'react-native';
import React, {useRef} from 'react';
import LottieView from 'lottie-react-native';
import styles from './index.styles';

type SplashScreenProps = {
  onFadeOutComplete?: () => void;
};

export default function SplashScreen({onFadeOutComplete}: SplashScreenProps) {
  const animationRef = useRef<LottieView | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const {width, height} = Dimensions.get('window');

  const handleAnimationFinish = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500, // duration for smooth fade-out
      useNativeDriver: true,
    }).start(() => {
      onFadeOutComplete?.(); // Notify App.tsx to proceed
    });
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <LottieView
        ref={animationRef}
        autoPlay
        loop={false}
        onAnimationFinish={handleAnimationFinish}
        style={{width, height}}
        resizeMode="cover"
        source={require('../../assests/lottie/Mediversal Splash Screen - Test - 01.json')}
      />
    </Animated.View>
  );
}
