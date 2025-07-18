/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {ArrowRight} from 'lucide-react-native';

import styles from './index.styles';
import PriscriptionSVG from './assets/svgs/priscription-icon.svg';
import InfoBox from '../../components/cards/InfoCard';
import SVG1 from './assets/svgs/f-1 1.svg';
import SVG2 from './assets/svgs/oc-m-1 1.svg';
import SVG3 from './assets/svgs/m-1 1.svg';
import SVG4 from './assets/svgs/hc-1 1.svg';
import SVG5 from './assets/svgs/ecp-2 1.svg';
import SVG6 from './assets/svgs/surgeries-1 1.svg';
// import LinearGradient from 'react-native-linear-gradient';
// import PriceCard from '../../components/cards/PriceCard';
import OrderNowCard from '../../components/cards/OrderCard';
import {RootStackParamList} from '../../navigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import PriceCard from '../../components/cards/PriceCard';
import DoctorsCardSkeleton from '../../components/cards/DoctorsCard/skeletons';
import OrderNowCardSkeleton from '../../components/cards/OrderCard/skeleton';
import PrescriptionSkeleton from './skeletons/uploadPrescription';
import InfoBoxSkeleton from '../../components/cards/InfoCard/skeletons';
import PriceCardSkeleton from '../../components/cards/PriceCard/skeletons';
import UpcomingOrdersCard from '../../components/cards/UpcomingOrderCard';
import {getOrders} from '../../Services/order';
import {OrderData} from '../../types';
import {useAuthStore} from '../../store/authStore';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const customer_id = useAuthStore(state => state.customer_id);
  const [loadingOrders, setLoadingOrders] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      if (customer_id) {
        try {
          setLoadingOrders(true);
          const response = await getOrders(customer_id.toString());
          setOrders(response.data);
          setLoadingOrders(false);
        } catch (error) {
          console.log('Error fetching orders:', error);
          setLoadingOrders(false);
        }
      }
    };

    fetchOrders();
  }, [customer_id]);
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 300);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />
        {!loadingOrders && (
          <View style={styles.headerContainer}>
            <Text style={styles.sectionLabel}>Upcoming</Text>
            <View style={styles.headerRow}>
              <View style={styles.orderInfo}>
                <Text style={styles.boldText}>Orders & Schedules</Text>
                <Text style={styles.countText}>(4)</Text>
              </View>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <ArrowRight
                  size={12}
                  style={styles.arrowIcon}
                  color={'#161d1f'}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <ScrollView
          horizontal
          style={styles.horizontalScroll}
          showsHorizontalScrollIndicator={false}>
          {loadingOrders ? (
            <>
              <DoctorsCardSkeleton />
              <DoctorsCardSkeleton />
              <DoctorsCardSkeleton />
            </>
          ) : orders.length > 0 ? (
            orders
              .filter(order => order.deliverystatus === 'ON GOING')
              .reverse()
              .map(order => (
                <UpcomingOrdersCard
                  key={order.orderId}
                  order={order}
                  onPress={() =>
                    navigation.navigate('OrdersDetailsScreen', {
                      order_data: order,
                    })
                  }
                />
              ))
          ) : (
            <View style={styles.noOrdersContainer}>
              <Text style={styles.noOrdersText}>No upcoming orders</Text>
            </View>
          )}
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 24,
            paddingHorizontal: Platform.OS === 'ios' ? 10 : 0,
          }}>
          {isLoading ? (
            <>
              <OrderNowCardSkeleton />
            </>
          ) : (
            <>
              <OrderNowCard />
            </>
          )}
        </View>
        {isLoading ? (
          <PrescriptionSkeleton />
        ) : (
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
        )}
        {isLoading ? (
          <View style={styles.gridWrap}>
            <InfoBoxSkeleton />
            <InfoBoxSkeleton />
            <InfoBoxSkeleton />
          </View>
        ) : (
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
        )}
        {isLoading ? (
          <View style={styles.gridWrap}>
            <InfoBoxSkeleton />
            <InfoBoxSkeleton />
            <InfoBoxSkeleton />
          </View>
        ) : (
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
        )}
        {!isLoading && (
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
        )}
        {isLoading ? (
          <View style={styles.gridWrap}>
            <PriceCardSkeleton />
            <PriceCardSkeleton />
          </View>
        ) : (
          <>
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
          </>
        )}
        {/* <View style={styles.imagecontainer}>
          <Text style={{fontSize: 8}}>Powered By</Text>
          <MediversalLogo style={styles.logo} />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
