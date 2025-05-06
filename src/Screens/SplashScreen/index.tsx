import {View, Dimensions} from 'react-native';
import React, {useRef, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import styles from './index.styles';
export default function SplashScreen() {
  const animationRef = useRef<LottieView | null>(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  const {width, height} = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        autoPlay
        loop
        style={{
          width: width,
          height: height,
        }}
        resizeMode="cover"
        source={require('../../assests/lottie/Mediversal Splash Screen - Test - 01.json')}
      />
    </View>
  );
}
