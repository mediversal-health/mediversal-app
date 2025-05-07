import React, {useState, useMemo, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  UIManager,
  Platform,
  BackHandler,
  Alert,
  Text,
  Image,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import ToggleButtons from '../../components/ui/ToggleButton';
import styles from './index.styles';
import EmailSignup from '../../components/auth/EmailSignUp';
import MobileLogin from '../../components/auth/MobileLogIn';
import EmailLogin from '../../components/auth/EmailLogIn';
import Carosel from '../../assests/svgs/Carosel.svg';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LoginScreen = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [isSignup, setIsSignup] = useState(false);

  const headerText = useMemo(
    () => (isSignup ? 'Welcome Aboard!!' : 'Welcome To'),
    [isSignup],
  );
  const subHeaderText = useMemo(
    () => (isSignup ? 'Create Account' : 'Please, Log In.'),
    [isSignup],
  );

  // Handle Android Back Button
  useEffect(() => {
    const handleBackPress = () => {
      if (isSignup) {
        setIsSignup(false);
        setIsMobile(false);
        return true;
      }

      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ]);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, [isSignup]);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topSection}>
          {(isMobile || isSignup) && (
            <View style={styles.carouselContainer}>
              <Carosel width={280} height={280} />
            </View>
          )}
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcomeText}>{headerText}</Text>

            {!isSignup ? (
              <>
                <Text style={styles.appNameText}>Mediversal</Text>
                <Text style={styles.taglineText}>
                  Easy Healthcare, In Your Hands
                </Text>
              </>
            ) : (
              <Text style={styles.appNameText}>{subHeaderText}</Text>
            )}
          </View>
        </View>

        <View style={styles.bottomSection}>
          {isSignup ? (
            <EmailSignup />
          ) : (
            <>
              <ToggleButtons isMobile={isMobile} setIsMobile={setIsMobile} />
              {isMobile ? <MobileLogin /> : <EmailLogin />}

              {!isMobile && (
                <View style={styles.createAccountContainer}>
                  <Text style={styles.noAccountText}>
                    Don't have an Account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setIsSignup(true);
                      setIsMobile(false);
                    }}>
                    <Text style={styles.createOneText}> Create One</Text>
                  </TouchableOpacity>
                </View>
              )}
              {!isMobile && (
                <Text style={styles.termsText}>
                  By logging in, you agree to our{' '}
                  <Text style={styles.termsHighlight}>Terms & Conditions</Text>
                </Text>
              )}
            </>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginScreen;
