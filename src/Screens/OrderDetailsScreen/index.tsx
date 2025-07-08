/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {NavigationProp} from '@react-navigation/native';
import {trackOrders} from '../../Services/order';
import {
  Box,
  ChevronLeft,
  Truck,
  MapPin,
  ChevronRight,
  IndianRupee,
  FileText,
} from 'lucide-react-native';
import {Fonts} from '../../styles/fonts';
import OrderTrackingProgress from '../../components/ui/OrderTrackingProgress';
import CartItemCard from '../../components/cards/CartItemCard';
import styles from './index.styles';
import Whatsapp from '../PrescribedScreen/assets/svgs/Whatsapp.svg';
import {TrackScan} from '../../types';

type OrdersDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'OrdersDetailsScreen'
>;

const OrdersDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<OrdersDetailsScreenRouteProp>();
  const {order_data} = route.params;
  console.log('abcgd', order_data);

  const [trackingData, setTrackingData] = useState<TrackScan[] | []>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Format date functions
  const formatOrderDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatEstimatedDeliveryDate = (dateString: string) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 3); // Adding 3 days for estimated delivery
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTransactionTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    if (order_data.rapidshypAwb) {
      fetchTrackingDetails();
    }
  }, []);

  const fetchTrackingDetails = async () => {
    try {
      if (!order_data.rapidshypAwb) {
        throw new Error('AWB is missing');
      }
      const data = await trackOrders(
        order_data.orderId,
        order_data.rapidshypAwb,
      );
      setTrackingData(
        data.records[0].shipment_details[0].track_scans as TrackScan[],
      );
    } catch (err) {
      console.error('Error fetching tracking details:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTrackingDetails();
  };

  const handleCancelOrder = () => {
    console.log('Cancel order pressed');
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0088B1']}
            tintColor="#0088B1"
          />
        }>
        <View style={styles.headerWrapper}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <ChevronLeft size={20} color="#0088B1" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Order Details</Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 10}}>
          <View style={styles.orderInfoContainer}>
            <View style={styles.orderInfoBorder}>
              <Text style={{marginBottom: 5, fontFamily: Fonts.JakartaBold}}>
                Order ID:ORD-{order_data.orderId}
              </Text>
            </View>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={styles.orderInfoText}>
                <Text style={styles.orderInfoLabel}>Order date:</Text>{' '}
                {formatOrderDate(order_data.createdAt)}
              </Text>
              <View style={{flexDirection: 'row', gap: 5, marginTop: 5}}>
                <Truck size={18} color={'#12B76A'} />
                <Text style={styles.deliveryEstimate}>
                  Estimated delivery:{' '}
                  {formatEstimatedDeliveryDate(order_data.createdAt)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {trackingData && <OrderTrackingProgress trackingData={trackingData} />}

        <View style={{flexDirection: 'row', marginLeft: 20, gap: 5}}>
          <Box />
          <Text style={styles.orderItemsHeader}>Order Items</Text>
        </View>

        {order_data.items.map(item => (
          <CartItemCard
            key={item.orderId}
            productId={item.productId}
            name={item.productName}
            mrp={item.sellingPrice ?? 0}
            price={100}
            fromOrderDesc={true}
          />
        ))}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Medicines Subtotal</Text>
            <Text style={styles.summaryValue}>
              ₹{Number(order_data.TotalOrderAmount) - 45}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>₹45.00</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>₹{order_data.TotalOrderAmount}</Text>
          </View>
        </View>

        <View style={styles.addressCard}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <MapPin size={20} color="#667085" />
            <Text style={styles.addressTitle}>Delivery Address</Text>
          </View>

          <Text style={styles.customerName}>{order_data.customerName}</Text>
          <Text style={styles.customerAddress}>
            {order_data.customerAddress}
          </Text>
          <Text style={styles.summaryLabel}>
            +91 - {order_data.customerPhone}
          </Text>
        </View>

        <View style={styles.paymentCard}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <IndianRupee size={16} color="#667085" />
            <Text style={styles.paymentTitle}>Payment Details</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Payment Method</Text>
            <Text style={styles.summaryValue}>{order_data.paymentMethod}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Transaction ID</Text>
            <Text style={styles.summaryValue}>{order_data.transactionId}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Transaction Time</Text>
            <Text style={styles.summaryValue}>
              {formatTransactionTime(order_data.paymentTime)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Payment Status</Text>
            <Text style={[styles.summaryValue, {color: '#10B981'}]}>
              Completed
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelOrder}>
          <Text style={styles.cancelButtonText}>Cancel Order</Text>
          <ChevronRight size={20} color="#EF4444" />
        </TouchableOpacity>
      </ScrollView>

      <View>
        <View style={styles.buttonContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.contactButton}>
              <Whatsapp />
              <Text style={styles.contactButtonText}>Contact us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkoutButton}>
              <FileText color={'#fff'} size={16} />
              <Text style={styles.checkoutButtonText}>Download Invoice</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default OrdersDetailsScreen;
