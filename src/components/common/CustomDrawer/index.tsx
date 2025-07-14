/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  PanResponder,
  Linking,
} from 'react-native';
import {ChevronRight, Bell} from 'lucide-react-native';
import OptiionsItem from '../../ui/Drawer/ServiceOptions';
import OtherOptionsItem from '../../ui/Drawer/OtherOptions';
import styles from './index.styles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
  withSpring,
} from 'react-native-reanimated';
import {useAuthStore} from '../../../store/authStore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation';

const {width} = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

const CustomDrawer = ({onClose}: {onClose: () => void}) => {
  // const clearAuthentication = useAuthStore(state => state.clearAuthentication);
  const {first_name, last_name, phoneNumber, email, profileImage} =
    useAuthStore();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const translateX = useSharedValue(-width);
  const startX = useSharedValue(0);
  const [imageError, setImageError] = useState(false);
  const drawerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });
  // const handleLogout = () => {
  //   clearAuthentication();
  //   onClose();
  // };

  const handleClose = () => {
    translateX.value = withTiming(
      -width,
      {
        duration: 250,
        easing: Easing.out(Easing.cubic),
      },
      () => {
        runOnJS(onClose)();
      },
    );
  };

  useEffect(() => {
    translateX.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      // Only respond to horizontal swipes
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 3);
    },
    onPanResponderGrant: () => {
      startX.value = translateX.value;
    },
    onPanResponderMove: (_, gestureState) => {
      const newX = startX.value + gestureState.dx;

      if (newX <= 0) {
        translateX.value = newX;
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx < -SWIPE_THRESHOLD) {
        handleClose();
      } else {
        translateX.value = withSpring(0, {
          damping: 15,
          stiffness: 100,
        });
      }
    },
  });

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.drawer, drawerAnimatedStyle]}
          {...panResponder.panHandlers}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 60}}>
            <View style={styles.header}>
              <View style={styles.profileRow}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProfileScreen')}>
                  {profileImage && !imageError ? (
                    <Image
                      source={{
                        uri:
                          typeof profileImage === 'string'
                            ? profileImage
                            : profileImage?.uri,
                      }}
                      style={styles.avatar}
                      onError={() => setImageError(true)}
                      defaultSource={require('../../../assests/pngs/MainAvatar.png')}
                    />
                  ) : (
                    <View style={styles.fallbackAvatar}>
                      <Text style={styles.fallbackText}>
                        {email ? email.charAt(0).toUpperCase() : 'GU'}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>

                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.greeting}>
                    {(() => {
                      if (first_name && first_name !== 'Guest') {
                        if (last_name && last_name !== 'User') {
                          return `${first_name} ${last_name}`;
                        }
                        return first_name;
                      }
                      return 'Guest User';
                    })()}
                  </Text>

                  <TouchableOpacity
                    style={styles.profileProgress}
                    onPress={() => navigation.navigate('ProfileScreen')}>
                    <Text style={styles.completeText}>
                      Naviagte to your account
                    </Text>
                    <ChevronRight size={20} color={'#0088B1'} />
                  </TouchableOpacity>
                  {email != null ? (
                    <Text style={styles.percentComplete}>Email:{email}</Text>
                  ) : (
                    <Text style={styles.percentComplete}>
                      Phone number: {phoneNumber}
                    </Text>
                  )}
                </View>
              </View>

              {/* <View style={styles.familySection}>
                <View style={styles.familyHeader}>
                  <Text style={styles.familyTitle}>Family members</Text>
                  <TouchableOpacity style={styles.addNew}>
                    <Plus size={10} style={{marginTop: 3}} color={'#B0B6B8'} />
                    <Text style={styles.addNewText}>Add New</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.familyTags}>
                  {['Spouse', 'Mom', 'Dad'].map((label, index) => (
                    <View key={index} style={styles.familyTag}>
                      <Text style={styles.tagText}>{label}</Text>
                      <Check size={12} style={{marginTop: 3}} color={'#fff'} />
                    </View>
                  ))}
                </View>
              </View> */}
            </View>

            <Text style={styles.sectionHeader}>Our Services</Text>
            <OptiionsItem
              title="Buy Medicines"
              description="Get Medicine at 25% OFF"
              onPress={() => {
                navigation.navigate('AllProducts');
              }}
            />
            {/* <OptiionsItem
              title="Homecare"
              description="Medical Care & Support at Home"
            />
            <OptiionsItem
              title="Online Consultation"
              description="Talk to Doctor in 10 minute"
            />
            <OptiionsItem
              title="Lab & Diagnostic Tests"
              description="(NABL Certified) Reliable & Quick Reports"
            />
            <OptiionsItem
              title="Health Checkups"
              description="Full Health Checks for your Family"
            />
            <OptiionsItem
              title="Elder Care Program"
              description="Personalized Senior Care at Home"
            />
            <OptiionsItem
              title="Surgeries"
              description="(NABH Accredited) Safe Surgeries by Experts"
            /> */}

            <Text style={styles.sectionHeader}>Records</Text>
            <OtherOptionsItem
              title="My Orders"
              onPress={() => {
                navigation.navigate('OrdersScreen');
              }}
            />
            <OtherOptionsItem
              title="My Prescriptions"
              onPress={() => {
                navigation.navigate('PrescriptionScreen');
              }}
            />
            {/* <OtherOptionsItem title="Health Reports" />
            <OtherOptionsItem title="Bill & Invoice" /> */}

            <Text style={styles.sectionHeader}>About us</Text>
            <OtherOptionsItem
              title="Help & Support"
              onPress={() => navigation.navigate('HelpSupportScreen')}
            />
            <OtherOptionsItem
              title="About Us"
              onPress={() => navigation.navigate('AboutUsScreen')}
            />
            <OtherOptionsItem
              title="Terms & Conditions"
              onPress={() => navigation.navigate('TermsConditionsScreen')}
            />
            <OtherOptionsItem
              title="Privacy Policy"
              onPress={() => navigation.navigate('PrivacyPolicyScreen')}
            />
            {/* <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
              activeOpacity={0.7}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity> */}
          </ScrollView>
          <View style={styles.likeUsBanner}>
            <View style={styles.likeUsLeft}>
              <Bell size={20} color="#F8F8F8" />
              <Text style={styles.likeUsText}>Like Us? Give us 5 stars</Text>
            </View>
            <ChevronRight size={20} color="#F8F8F8" />
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomDrawer;
