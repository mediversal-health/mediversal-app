/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';

import {styles} from './PaymentSuccessScreen.styles';
import {useAuthStore} from '../../store/authStore';
import {createOrder} from '../../Services/order';
import {DeleteFromCart} from '../../Services/cart';
import {useCartStore} from '../../store/cartStore';
import {useToastStore} from '../../store/toastStore';
import LottieView from 'lottie-react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {uploadPrescriptions} from '../../Services/prescription';
import {usePrescriptionStore} from '../../store/prescriptionStore';
import {useCouponStore} from '../../store/couponStore';

Dimensions.get('window');

const PaymentSuccessScreen = ({route}: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {customer_id, email, phoneNumber} = useAuthStore();
  const {
    name,
    paymentId,
    amount,
    cartItems,
    address,
    coupon_id,
    couponDiscount,
  } = route.params;
  const isCOD = !paymentId;
  const {removeFromCart} = useCartStore.getState();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const showToast = useToastStore(state => state.showToast);
  const setProductQuantity = useCartStore(state => state.setProductQuantity);
  const {clearPrescriptions, getFiles} = usePrescriptionStore.getState();
  const setSelectedCoupon = useCouponStore(state => state.setSelectedCoupon);

  let prescriptionId: number = 0;
  console.log(couponDiscount, 'couponDiscount');
  console.log(coupon_id, 'coupon_id');
  useEffect(() => {
    const handleCreateOrder = async () => {
      if (orderCreated || isCreatingOrder) {
        return;
      }

      setIsCreatingOrder(true);

      try {
        const currentCustomerPrescriptions = customer_id
          ? getFiles(customer_id.toString())
          : [];

        if (currentCustomerPrescriptions.length > 0 && customer_id) {
          try {
            const uploadResponse = await uploadPrescriptions(
              customer_id.toString(),
              currentCustomerPrescriptions,
            );

            if (uploadResponse && uploadResponse.data.prescription_id) {
              prescriptionId = uploadResponse.data.prescription_id;
            }
          } catch (uploadError) {
            console.error('Prescription upload failed:', uploadError);
          }
        }

        const orderData = {
          customer: {
            customerId: parseInt(String(customer_id ?? ''), 10),
            name: name,
            address: address || '',
            phone: phoneNumber || '',
            email: email || '',
          },
          coupon: {
            applied_discount_value: Number(couponDiscount),
            coupon_id: Number(coupon_id) || null,
          },
          payment: {
            status: isCOD ? 'Pending' : 'Paid',
            method: isCOD ? 'COD' : 'Prepaid',
            time: new Date().toISOString(),
            details: isCOD
              ? {}
              : {
                  transactionId: paymentId || '',
                },
          },
          products:
            cartItems?.map((item: any) => ({
              productId: item.productId || item.id,
              productName: item.name,
              sku: item.sku,
              sellingPrice: parseInt(item.price, 10),
              tax: item.tax,
              quantity: item.quantity || 1,
            })) || [],
          totalOrderAmount: amount,
          deliveryStatus: 'ON GOING',
          prescriptionId: prescriptionId.toString(),
        };

        const response = await createOrder(orderData);

        if (customer_id && currentCustomerPrescriptions.length > 0) {
          clearPrescriptions(customer_id.toString());
        }
        setSelectedCoupon(customer_id?.toString() ?? '', null);
        const productIds = cartItems.map(
          (item: any) => item.productId || item.id,
        );
        await DeleteFromCart(customer_id, productIds);
        productIds.forEach((productId: number) => {
          removeFromCart(customer_id?.toString() ?? '', productId);
        });

        cartItems.forEach((item: any) => {
          setProductQuantity(customer_id?.toString() ?? '', item.productId, 0);
        });

        setOrderCreated(true);
      } catch (error) {
        console.error('Order creation failed:', error);
        showToast('Failed to complete order process', 'error');
      } finally {
        setIsCreatingOrder(false);
      }
    };

    handleCreateOrder();
  }, []);

  const handleNavigate = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Layout'}],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <LottieView
              source={require('./animations/Animation - 1750918868941.json')}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
          </View>

          <Text style={styles.title}>
            {isCOD ? 'Order Placed Successfully!' : 'Payment Successful!'}
          </Text>
          <Text style={styles.subtitle}>
            {isCOD
              ? 'Your order has been placed successfully!'
              : 'Your transaction has been completed successfully'}
            {isCreatingOrder && '\nProcessing your order...'}
          </Text>

          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Order Details</Text>
          </View>

          <View style={styles.detailsCard}>
            <View style={styles.amountSection}>
              <Text style={styles.amountLabel}>Order Amount</Text>
              <Text style={styles.amountValue}>
                ₹{amount?.toFixed(2) || '0.00'}
              </Text>
            </View>

            <View style={styles.separator} />

            {!isCOD && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Transaction ID</Text>
                <Text
                  style={styles.detailValue}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {paymentId || 'N/A'}
                </Text>
              </View>
            )}

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Method</Text>
              <Text style={styles.detailValue}>
                {isCOD ? 'Cash on Delivery' : 'UPI'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>
                {new Date().toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Order Status</Text>
              <Text
                style={[
                  styles.detailValue,
                  {
                    color: orderCreated
                      ? '#4CAF50'
                      : isCreatingOrder
                      ? '#FF9800'
                      : '#F44336',
                  },
                ]}>
                {orderCreated
                  ? 'Created'
                  : isCreatingOrder
                  ? 'Processing...'
                  : 'Pending'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => handleNavigate()}>
            <Text style={styles.primaryButtonText}>Continue Shopping</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportLink}>
            <Text style={styles.supportText}>Need help? Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentSuccessScreen;
