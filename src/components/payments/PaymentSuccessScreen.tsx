/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from './PaymentSuccessScreen.styles';
import {useAuthStore} from '../../store/authStore';
import {createOrder} from '../../Services/order';
import {DeleteFromCart} from '../../Services/cart';

import {useCartStore} from '../../store/cartStore';
import {useToastStore} from '../../store/toastStore';
import LottieView from 'lottie-react-native';
import {ScrollView} from 'react-native-gesture-handler';

Dimensions.get('window');

const PaymentSuccessScreen = ({route}: any) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {customer_id, email, phoneNumber, first_name, last_name} =
    useAuthStore();
  const {paymentId, amount, cartItems, address} = route.params;
  const {removeFromCart} = useCartStore.getState();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const showToast = useToastStore(state => state.showToast);
  const setProductQuantity = useCartStore(state => state.setProductQuantity);
  console.log(cartItems);
  useEffect(() => {
    const handleCreateOrder = async () => {
      if (orderCreated || isCreatingOrder) {
        return;
      }

      setIsCreatingOrder(true);

      try {
        const orderData = {
          customer: {
            customerId: parseInt(String(customer_id ?? ''), 10),
            name: (first_name ?? '') + '' + (last_name ?? ''),
            address: address || '',
            phone: phoneNumber || '',
            email: email || '',
          },
          payment: {
            status: 'Paid',
            method: 'Prepaid',
            time: new Date().toISOString(),
            details: {
              transactionId: paymentId || '',
            },
          },

          products:
            cartItems?.map((item: any) => ({
              productId: item.productId || item.id,
              productName: item.name,
              sku: item.sku,
              sellingPrice: parseInt(item.price),
              tax: item.tax,
              quantity: item.quantity || 1,
            })) || [],
          totalOrderAmount: amount,
          deliveryStatus: 'ON GOING',
        };

        console.log('Creating order with data:', orderData);

        const response = await createOrder(orderData);

        console.log('Order created successfully:', response);

        const productIds = cartItems.map(
          (item: any) => item.productId || item.id,
        );
        await DeleteFromCart(customer_id, productIds);
        productIds.map((productId: number) => {
          removeFromCart(customer_id?.toString() ?? '', productId);
        });

        cartItems.forEach((item: any) => {
          setProductQuantity(customer_id?.toString() ?? '', item.productId, 0);
        });

        // showToast('Your Order is Created', 'success');
        setOrderCreated(true);
      } catch (error) {
        console.error('Failed to create order or remove from cart:', error);
        showToast('Failed to complete order process', 'error');
      } finally {
        setIsCreatingOrder(false);
      }
    };

    handleCreateOrder();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <LottieView
              source={require('./animations/Animation - 1750918868941.json')}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
          </View>

          {/* Success Message */}
          <Text style={styles.title}>Payment Successful!</Text>
          <Text style={styles.subtitle}>
            Your transaction has been completed successfully
            {isCreatingOrder && '\nProcessing your order...'}
          </Text>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Transaction Details</Text>
          </View>
          {/* Payment Details Card */}
          <View style={styles.detailsCard}>
            <View style={styles.amountSection}>
              <Text style={styles.amountLabel}>Amount Paid</Text>
              <Text style={styles.amountValue}>
                ₹{amount?.toFixed(2) || '0.00'}
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transaction ID</Text>
              <Text
                style={styles.detailValue}
                numberOfLines={1}
                ellipsizeMode="tail">
                {paymentId || 'N/A'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Method</Text>
              <Text style={styles.detailValue}>UPI</Text>
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

          {/* Primary Action Button */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Layout')}>
            <Text style={styles.primaryButtonText}>Continue Shopping</Text>
          </TouchableOpacity>

          {/* Support Link */}
          <TouchableOpacity style={styles.supportLink}>
            <Text style={styles.supportText}>Need help? Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentSuccessScreen;
