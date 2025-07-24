/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {NavigationProp} from '@react-navigation/native';
import {trackOrders} from '../../Services/rapidshyp';
import {
  Box,
  ChevronLeft,
  Truck,
  MapPin,
  ChevronRight,
  IndianRupee,
  FileText,
} from 'lucide-react-native';
import {FontColors, Fonts} from '../../styles/fonts';
import OrderTrackingProgress from '../../components/ui/OrderTrackingProgress';
import CartItemCard from '../../components/cards/CartItemCard';
import OrderCancelBottomSheet from '../../components/modal/CancelOrderBottomSheet'; // Import the bottom sheet
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

  const [trackingData, setTrackingData] = useState<TrackScan[] | []>([]);
  const [edd, setEdd] = useState<string | null>(' ');
  const [refreshing, setRefreshing] = useState(false);
  const [isCancelBottomSheetVisible, setIsCancelBottomSheetVisible] =
    useState(false);

  // Format date functions
  const formatOrderDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // const formatEstimatedDeliveryDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   date.setDate(date.getDate() + 3);
  //   return date.toLocaleDateString('en-IN', {
  //     day: 'numeric',
  //     month: 'short',
  //     year: 'numeric',
  //   });
  // };

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
  console.log(trackingData);
  const isOrderCancelled = () => {
    return order_data.deliverystatus == 'Order cancelled successfully.';
  };
  const isOutForDelivery = () => {
    return trackingData.some(scan => scan.scan === 'Out for delivery');
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
      console.log(
        'Fetching tracking details for AWB:',
        order_data.rapidshypAwb,
      );
      const data = await trackOrders(
        order_data.orderId,
        order_data.rapidshypAwb,
      );

      console.log(data, 'data from rapidshyp');

      if (
        data.records &&
        data.records.length > 0 &&
        data.records[0].shipment_details &&
        data.records[0].shipment_details.length > 0
      ) {
        const shipment = data.records[0].shipment_details[0];

        setTrackingData(shipment.track_scans as TrackScan[]);
        setEdd(shipment.edd ?? null);
      } else {
        throw new Error('No shipment details found');
      }
    } catch (err) {
      console.error('Error fetching tracking details:', err);
      setEdd(null);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTrackingDetails();
  };

  const handleCancelOrder = () => {
    setIsCancelBottomSheetVisible(true);
  };

  const handleCloseCancelBottomSheet = () => {
    setIsCancelBottomSheetVisible(false);
  };

  const handleConfirmCancelOrder = (reason: string) => {
    console.log('Order cancelled with reason:', reason);

    setIsCancelBottomSheetVisible(false);
  };

  const handleKeepOrder = () => {
    console.log('User decided to keep the order');
    setIsCancelBottomSheetVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color="#0088B1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>

      <ScrollView
        style={{backgroundColor: FontColors.tertiary}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0088B1']}
            tintColor="#0088B1"
          />
        }>
        {order_data.deliverystatus === 'Order cancelled successfully.' ? (
          <View
            style={{
              padding: 20,
              alignItems: 'center',
              backgroundColor: '#FFD0D0',
              margin: 25,
              borderRadius: 16,
            }}>
            <Text
              style={{
                fontFamily: Fonts.JakartaRegular,
                fontSize: 16,
                color: '#EB5757',
              }}>
              Order Cancelled
            </Text>
          </View>
        ) : trackingData && trackingData.length > 0 ? (
          <OrderTrackingProgress trackingData={trackingData} />
        ) : (
          <View
            style={{
              padding: 20,
              alignItems: 'center',
            }}>
            <Text style={{fontFamily: Fonts.JakartaRegular, fontSize: 16}}>
              No tracking data available
            </Text>
          </View>
        )}
        <View
          style={{
            paddingHorizontal: 24,
            marginBottom: 24,
          }}>
          <View style={styles.orderInfoContainer}>
            <View style={styles.orderInfoBorder}>
              <Text
                style={{
                  marginBottom: 5,
                  fontFamily: Fonts.JakartaSemiBold,
                  fontSize: 14,
                }}>
                Order ID:ORD-{order_data.orderId}
              </Text>
            </View>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={styles.orderInfoText}>
                <Text style={styles.orderInfoLabel}>Order date:</Text>{' '}
                {formatOrderDate(order_data.createdAt)}
              </Text>
              {isOrderCancelled() ? (
                <View style={{flexDirection: 'row', gap: 5, marginTop: 5}}>
                  <Text style={styles.OrderCancelled}>Order Cancelled</Text>
                </View>
              ) : (
                <View style={{flexDirection: 'row', gap: 5, marginTop: 5}}>
                  <Truck size={16} color={'#12B76A'} strokeWidth={1.25} />

                  <Text style={styles.deliveryEstimate}>
                    Estimated delivery:
                    {edd && edd == null ? edd : 'Updating Soon'}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            marginHorizontal: 24,
            marginBottom: 12,
          }}>
          <View
            style={{backgroundColor: '#E8F4F7', padding: 4, borderRadius: 5}}>
            <Box strokeWidth={1.25} size={20} color={'#0088B1'} />
          </View>
          <Text style={styles.orderItemsHeader}>Order Items</Text>
        </View>

        {order_data.items.map(item => (
          <CartItemCard
            key={item.productId}
            productId={item.productId}
            name={item.productName}
            imageUrl={item.imageUrl}
            mrp={item.sellingPrice ?? 0}
            price={100}
            quantityOrg={item.quantity}
            fromOrderDesc={true}
          />
        ))}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Medicines Subtotal</Text>
            <Text style={styles.summaryValue}>
              ₹{Number(order_data.TotalOrderAmount)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            {Number(order_data.TotalOrderAmount) > 499 ? (
              <Text style={styles.summaryValue}>Free</Text>
            ) : (
              <Text style={styles.summaryValue}>₹40.00</Text>
            )}
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Handling & Packaging Fee</Text>
            <Text style={styles.summaryValue}>₹5.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Plaform Fee</Text>
            <Text style={styles.summaryValue}>₹5.00</Text>
          </View>
          {order_data.applied_discount_value && (
            <View style={styles.summaryRow}>
              <Text style={styles.discountLabel}>Discount</Text>
              <Text style={styles.discountValue}>
                -₹{order_data.applied_discount_value}
              </Text>
            </View>
          )}
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
              gap: 8,
            }}>
            <MapPin size={18} color="#667085" strokeWidth={1.25} />
            <Text style={styles.addressTitle}>Delivery Address</Text>
          </View>

          <Text style={styles.customerName}>{order_data.customerName}</Text>
          <Text style={styles.customerAddress}>
            {order_data.customerAddress}
          </Text>
          <Text style={styles.phoneText}>+91 - {order_data.customerPhone}</Text>
        </View>

        <View style={styles.paymentCard}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <IndianRupee size={18} color="#667085" strokeWidth={1.25} />
            <Text style={styles.paymentTitle}>Payment Details</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.customerAddress}>Payment Method</Text>
            <Text style={styles.customerName}>{order_data.paymentMethod}</Text>
          </View>
          {order_data.paymentMethod !== 'COD' && (
            <View style={styles.summaryRow}>
              <Text style={styles.customerAddress}>Transaction ID</Text>
              <Text style={styles.customerName}>
                {order_data.transactionId}
              </Text>
            </View>
          )}
          {order_data.paymentMethod !== 'COD' && (
            <View style={styles.summaryRow}>
              <Text style={styles.customerAddress}>Transaction Time</Text>
              <Text style={styles.customerName}>
                {formatTransactionTime(order_data.paymentTime)}
              </Text>
            </View>
          )}
          <View style={styles.summaryRow}>
            <Text style={styles.customerAddress}>Payment Status</Text>
            <Text style={[styles.customerName, {color: '#10B981'}]}>
              {order_data.paymentMethod !== 'COD' ? 'Completed' : 'Pending '}
            </Text>
          </View>
        </View>

        {!isOrderCancelled() && !isOutForDelivery() && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelOrder}>
            <Text style={styles.cancelButtonText}>Cancel Order</Text>
            <ChevronRight size={20} color="#EF4444" />
          </TouchableOpacity>
        )}
      </ScrollView>

      <View>
        <View style={styles.buttonContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.contactButton}>
              <Whatsapp />
              <Text style={styles.contactButtonText}>Contact us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkoutButton}>
              <FileText color={'#fff'} size={18} strokeWidth={1.25} />
              <Text style={styles.checkoutButtonText}>Download Invoice</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <OrderCancelBottomSheet
        isVisible={isCancelBottomSheetVisible}
        onClose={handleCloseCancelBottomSheet}
        onCancel={handleConfirmCancelOrder}
        onKeepOrder={handleKeepOrder}
        orderId={order_data.orderId}
      />
    </SafeAreaView>
  );
};

export default OrdersDetailsScreen;
