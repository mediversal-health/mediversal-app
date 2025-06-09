/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {ArrowRight} from 'lucide-react-native';
import DoctorsCard from '../../components/cards/DoctorsCard';
import styles from './index.styles';
import PriscriptionSVG from './assets/svgs/priscription-icon.svg';
import InfoBox from '../../components/cards/InfoCard';
import SVG1 from './assets/svgs/f-1 1.svg';
import SVG2 from './assets/svgs/oc-m-1 1.svg';
import SVG3 from './assets/svgs/m-1 1.svg';
import SVG4 from './assets/svgs/hc-1 1.svg';
import SVG5 from './assets/svgs/ecp-2 1.svg';
import SVG6 from './assets/svgs/surgeries-1 1.svg';
import LinearGradient from 'react-native-linear-gradient';
import PriceCard from '../../components/cards/PriceCard';
import OrderNowCard from '../../components/cards/OrderCard';
import messaging from '@react-native-firebase/messaging';
import {RootStackParamList} from '../../navigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        await requestNotificationPermissions();

        const token = await messaging().getToken();
        console.log('FCM Token:', token);

        // const unsubscribe = messaging().onMessage(async remoteMessage => {
        //   Alert.alert(
        //     'New Message',
        //     remoteMessage.notification?.body || 'You have a new notification',
        //   );
        // });

        // return unsubscribe;
      } catch (error) {
        console.error('Notification setup error:', error);
      }
    };

    setupNotifications();
  }, []);

  const requestNotificationPermissions = async () => {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }

      return true;
    }

    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

        <View style={styles.headerContainer}>
          <Text style={styles.sectionLabel}>Upcoming</Text>
          <View style={styles.headerRow}>
            <View style={styles.orderInfo}>
              <Text style={styles.boldText}>Orders & Schedules</Text>
              <Text style={styles.countText}>(4)</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <ArrowRight size={10} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          style={styles.horizontalScroll}
          showsHorizontalScrollIndicator={false}>
          <DoctorsCard />
          <DoctorsCard />
          <DoctorsCard />
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <OrderNowCard />
        </View>

        <View style={styles.priscriptionContainer}>
          <PriscriptionSVG width={25} height={32} strokeWidth={2} />
          <Text style={styles.priscriptionText}>
            Have a Doctor's Prescription?
          </Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => navigation.navigate('UploadPrescription')}>
            <Text style={styles.uploadButtonText}>Upload Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridWrap}>
          <InfoBox
            heading="Homecare"
            subHeading="Medical care at home"
            colors="#61C8E3"
            SvgComponent={SVG1}
            flag="Homecare"
          />
          <InfoBox
            heading="Online Consultation"
            subHeading="Doctor's at your fingertip"
            colors="#C686FF"
            SvgComponent={SVG2}
            flag="Online"
          />
          <InfoBox
            heading="Lab Tests"
            subHeading="100% Accurate Reports"
            colors="#FCFF9B"
            SvgComponent={SVG3}
            flag="Tests"
          />
        </View>

        <View style={styles.gridWrap}>
          <InfoBox
            heading="Health Checkup"
            subHeading="(NABH) Trusted and Reliable Tests"
            colors="#FF9966"
            SvgComponent={SVG4}
            flag="Checkup"
          />
          <InfoBox
            heading="Elder Care Program"
            subHeading="Personalized Support for Aging Loved Ones"
            colors="#FFC4BD"
            SvgComponent={SVG5}
          />
          <InfoBox
            heading="Surgeries"
            subHeading="Expert Surgical Care with Trusted Experts"
            colors="#61C8E3"
            SvgComponent={SVG6}
            flag="Surgeries"
          />
        </View>

        <View style={styles.separatorContainer}>
          <LinearGradient
            colors={['#00FF80', 'transparent']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            style={styles.line}
          />
          <View style={styles.separatorTextContainer}>
            <Text style={styles.smallHeading}>Frequently Booked</Text>
            <Text style={styles.greenHeading}>Homecare Services</Text>
          </View>
          <LinearGradient
            colors={['transparent', '#00FF80']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            style={styles.line}
          />
        </View>

        <View style={styles.gridWrap}>
          <PriceCard
            heading="Care Takers"
            subHeading="Trained personnel for daily assistance"
            offer="FLAT 25% OFF"
            price="₹5999"
            onPress={() => console.log('Buy Now Pressed')}
          />
          <PriceCard
            heading="Nursing Care"
            subHeading="Expert nurses at home"
            offer="FLAT 30% OFF"
            price="₹9999"
            onPress={() => console.log('Buy Now Pressed')}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>See All</Text>
          <ArrowRight color="#ccc" height={10} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
