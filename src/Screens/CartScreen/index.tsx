/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './index.styles';
import {
  Percent,
  ChevronRight,
  Truck,
  Wallet,
  ChevronLeft,
} from 'lucide-react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import CartItemCard from '../../components/cards/CartItemCard';
import BillSummaryCard from '../../components/cards/BillSummaryCard';
import OtherDetailsCard from '../../components/cards/OtherDetailsCard';
import LocationModal from '../../components/modal/LocationModal';
import { RootStackParamList } from '../../navigation';
import NavigationImg from './assets/svgs/navigation.svg';
import { Fonts } from '../../styles/fonts';
import { useAuthStore } from '../../store/authStore';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback } from 'react';
import { getCartItems } from '../../Services/cart';
import { useCouponStore } from '../../store/couponStore';
import { useCartStore } from '../../store/cartStore';
import RazorpayCheckout from 'react-native-razorpay';
import useProductStore from '../../store/productsStore';
import { getProducts } from '../../Services/pharmacy';
import { useToastStore } from '../../store/toastStore';
import Config from 'react-native-config';
import PaymentMethodModal from '../../components/modal/PaymentMethodModal';
const CartPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const route = useRoute<RouteProp<RootStackParamList, 'CartPage'>>();
  const RAZORPAY_KEY = Config.RAZORPAY_KEY;

  const formData = route.params?.formData;
  const customer_id = useAuthStore(state => state.customer_id);

  const pincode = formData?.PinCode;
  const area = formData?.Area_details;
  const City = formData?.City;
  const State = formData?.State;

  const formattedAddress = `${pincode} - ${area}, ${City}, ${State}`;

  const [apiProductDetails, setApiProductDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getSelectedCoupon, setSelectedCoupon } = useCouponStore();
  const selectedCoupon = getSelectedCoupon(String(customer_id));
  const { originalProducts, setProducts } = useProductStore();
  const [hasOutOfStockItems, setHasOutOfStockItems] = useState(false);
  const [isPaymentMethodVisible, setPaymentMethodVisible] = useState(false);
  const showToast = useToastStore(state => state.showToast);
  const handleCouponRemove = () => {
    setSelectedCoupon(String(customer_id), null);
  };
  const checkOutOfStockItems = (items: any[]) => {
    return items.some((item: any) => item.StockAvailableInInventory === 0);
  };
  const fetchProducts = useCallback(() => {
    getProducts()
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [setProducts]);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const apiItems = await getCartItems(customer_id);
      console.log(apiItems);
      const mergedItems = apiItems.map((cartItem: any) => {
        const matchedProduct = originalProducts.find(
          (prod: any) => prod.productId === cartItem.productId,
        );
        console.log(matchedProduct?.ProductName);
        return {
          ...cartItem,
          StockAvailableInInventory:
            matchedProduct?.StockAvailableInInventory ?? 0,
        };
      });
      console.log('Merged Items:', mergedItems);

      setApiProductDetails(mergedItems);
      setHasOutOfStockItems(checkOutOfStockItems(mergedItems));

      console.log(customer_id);
    } catch (err) {
      setError('Failed to load product details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  console.log('hasOutOfStockItems', hasOutOfStockItems);
  useEffect(() => {
    if (customer_id) {
      fetchProductDetails();
    }
  }, []);
  const handleCheckoutPress = () => {
    setPaymentMethodVisible(true);
  };

  const handleSelectCOD = () => {
    setPaymentMethodVisible(false);
    const cartItems = apiProductDetails.map(item => ({
      productId: item.productId,
      name: item.ProductName,
      price: item.SellingPrice,
      sku: item.SKU,
      tax: item.tax,
      quantity: getProductQuantity(
        customer_id?.toString() ?? '',
        item.productId,
      ),
      imageUrl: item.imageUrl,
    }));
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'PaymentSuccessScreen',
          params: {
            amount: cartTotal - couponDiscount + 5 + 40,
            cartItems: cartItems,
            address: formattedAddress,
            pincode: formData?.PinCode ?? 0,

            area: formData?.Area_details ?? '',
            city: formData?.City,
            State: formData?.State ?? '',
            PhoneNumber: Number(formData?.PhoneNumber) || 0,
          },
        },
      ],
    });
  };

  const handlePayOnline = () => {
    setPaymentMethodVisible(false);
    handleCheckout();
  };

  console.log('API product details:', apiProductDetails);

  const showLocationModal = () => {
    setLocationModalVisible(true);
  };

  const hideLocationModal = () => {
    setLocationModalVisible(false);
  };

  const handleSelectCurrentLocation = () => {
    navigation.navigate('LocationMapScreen');
    hideLocationModal();
  };

  const handleEnterManually = () => {
    navigation.navigate('AddressBookScreen', {
      location: {
        title: '',
        address: '',
        formattedAddress: {
          street: '',
          area: '',
          city: '',
          state: '',
          pincode: '',
        },
      },
    });
    hideLocationModal();
  };
  const getProductQuantity = useCartStore(state => state.getProductQuantity);
  const [version, setVersion] = useState(0);
  useEffect(() => {}, [version]);
  const handleQuantityChange = () => {
    setVersion(prev => prev + 1);
  };

  const cartTotal = apiProductDetails.reduce((total, item) => {
    const qty = getProductQuantity(
      customer_id?.toString() ?? '',
      item.productId,
    );
    // console.log('ABCD', qty);
    return total + item.SellingPrice * qty;
  }, 0);

  let couponDiscount = 0;
  if (selectedCoupon) {
    const discountValue = parseFloat(selectedCoupon.discount_value || '0');
    if (selectedCoupon.discount_type === 'fixed') {
      couponDiscount = discountValue;
    } else if (selectedCoupon.discount_type === 'percentage') {
      couponDiscount = Math.round((cartTotal * discountValue) / 100);
    }
  }

  const [selectedRadio, setSelectedRadio] = useState(false);

  const handleCheckout = async () => {
    if (!RAZORPAY_KEY) {
      showToast('Razorpay key is missing.', 'error', 1000, true);
      return;
    }

    if (hasOutOfStockItems) {
      showToast(
        'Remove out-of-stock items from your cart before proceeding.',
        'warning',
        1000,
        true,
      );
      return;
    }

    setIsProcessingPayment(true);

    try {
      const options = {
        description: 'Test Payment',
        image: Image.resolveAssetSource(require('../../assests/svgs/Logo.svg'))
          .uri,
        currency: 'INR',
        key: RAZORPAY_KEY as string,
        amount: (cartTotal - couponDiscount + 5 + 40) * 100,
        name: 'Mediversal APP',
        theme: { color: '#0088B1' },
      };
      const cartItems = apiProductDetails.map(item => ({
        productId: item.productId,
        name: item.ProductName,
        price: item.SellingPrice,
        sku: item.SKU,
        tax: item.tax,
        quantity: getProductQuantity(
          customer_id?.toString() ?? '',
          item.productId,
        ),
        imageUrl: item.imageUrl,
      }));
      const data = await RazorpayCheckout.open(options);
      console.log(data);
      if (data.razorpay_payment_id) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'PaymentSuccessScreen',
              params: {
                paymentId: data.razorpay_payment_id,
                amount: cartTotal - couponDiscount + 5 + 40,
                cartItems: cartItems,
                address: formattedAddress,
                pincode: formData?.PinCode ?? 0,
                area: formData?.Area_details ?? '',
                city: formData?.City,
                State: formData?.State ?? '',
                PhoneNumber: Number(formData?.PhoneNumber) || 0,
              },
            },
          ],
        });
      }
    } catch (error: any) {
      if (error.code !== 0) {
        Alert.alert(
          'Payment Failed',
          'There was an issue processing your payment. Please try again.',
        );
      }
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          testID="ActivityIndicator"
          size="large"
          color="#0088B1"
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text testID="error-text" style={styles.errorText}>
          {error}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setError(null);
            setLoading(true);
            getCartItems(customer_id)
              .then(apiItems => {
                setApiProductDetails(apiItems);
              })
              .catch(err => {
                console.error(err);
                setError('Failed to load product details. Please try again.');
              })
              .finally(() => {
                setLoading(false);
              });
          }}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={20} color="#0088B1" />
          </TouchableOpacity>
          {/* <View style={styles.headerRightIcons}>
            <TouchableOpacity style={styles.iconSpacing}>
              <Search size={20} color="#161D1F" />
            </TouchableOpacity>
            <TouchableOpacity>
              <ShoppingBag size={20} color="#161D1F" />
            </TouchableOpacity>
          </View> */}
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {formattedAddress !==
            'undefined - undefined, undefined, undefined' && (
            <View style={styles.container}>
              <View
                style={{
                  backgroundColor: '#E8F4F7',
                  padding: 20,
                  flexDirection: 'row',
                  gap: 15,
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <NavigationImg />
                  <View style={{ flexDirection: 'column', width: '70%' }}>
                    <Text
                      style={{
                        color: '#899193',
                        fontSize: 10,
                        fontFamily: Fonts.JakartaRegular,
                      }}>
                      Deliver to {formData?.Recipient_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: Fonts.JakartaRegular,
                      }}>
                      {formattedAddress}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.replace('AddressBookScreen', {
                      fromLocationMap: false,
                      isFromProfile: false,
                    })
                  }>
                  <Text
                    style={{
                      justifyContent: 'flex-end',
                      fontFamily: Fonts.JakartaSemiBold,
                      color: '#50B57F',
                      fontSize: 12,
                    }}>
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {apiProductDetails.length === 0 ||
            (apiProductDetails && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ApplyCouponScreen', {
                    cartTotal: cartTotal,
                  })
                }>
                <LinearGradient
                  colors={['#F8F8F8', '#FE90E2']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.couponStrip}>
                  <View style={styles.couponLeft}>
                    <Percent size={16} color="#000" style={styles.icon} />
                    <Text style={styles.couponText}>Apply Coupon</Text>
                  </View>
                  <ChevronRight size={16} color="#000" />
                </LinearGradient>
              </TouchableOpacity>
            ))}

          {apiProductDetails.length === 0 ||
            (apiProductDetails && selectedCoupon && (
              <LinearGradient
                colors={['#FFFFFF', '#0088B1']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 1 }}
                style={styles.appliedCouponContainer}>
                <View style={styles.appliedCouponLeft}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.appliedCouponText}>
                      Coupon Applied:
                    </Text>
                    <Text style={styles.appliedCouponCode}>
                      {selectedCoupon?.coupon_code}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={handleCouponRemove}>
                  <Text style={styles.removeCouponText}>Remove</Text>
                </TouchableOpacity>
              </LinearGradient>
            ))}
          {apiProductDetails.length === 0 ||
            (apiProductDetails && (
              <View style={styles.deliveryRow}>
                <Truck size={18} color="#000" style={styles.icon} />
                <Text style={styles.deliveryText}>By Sun, 11 May</Text>
              </View>
            ))}
          {apiProductDetails.length > 0 ? (
            apiProductDetails.map(item => (
              <CartItemCard
                key={item.productId}
                productId={item.productId}
                imageUrl={item.imageUrl}
                name={item.ProductName}
                mrp={item.SellingPrice}
                price={item.CostPrice}
                onRemove={async () => {
                  // First update the product details
                  await fetchProductDetails();
                  // The fetchProductDetails function should automatically update hasOutOfStockItems
                  // But let's make sure by calling it explicitly after the state update
                }}
                onQuantityChange={handleQuantityChange}
                fromOrderDesc={false}
              />
            ))
          ) : (
            <View style={styles.emptyCartContainer}>
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
            </View>
          )}

          {/* MediCash Card */}
          {apiProductDetails.length === 0 ||
            (apiProductDetails && (
              <View style={styles.mediCashCard}>
                <View style={styles.mediCashLeft}>
                  <Wallet size={20} color="#B0B6B8" style={styles.icon} />
                  <Text style={styles.mediCashText}>Use MediCash</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setSelectedRadio(!selectedRadio)}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[styles.radioLabel, { marginRight: 8 }]}>
                    0MCs
                  </Text>
                  <View
                    style={[
                      styles.radioCircle,
                      selectedRadio && { borderColor: '#0088B1' },
                    ]}>
                    {selectedRadio && <View style={styles.selectedDot} />}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          {/* Bill Summary Label */}
          {apiProductDetails.length === 0 ||
            (apiProductDetails && (
              <>
                <Text style={styles.billSummaryLabel}>Bill Summary</Text>
                <BillSummaryCard
                  originalPrice={cartTotal}
                  finalPrice={cartTotal - couponDiscount + 5 + 40}
                  details={{
                    cartTotal: cartTotal,
                    couponDiscount: couponDiscount,
                    handlingFee: 5,
                    platformFee: 0,
                    deliveryCharges: 40,
                  }}
                />

                <OtherDetailsCard />
              </>
            ))}
        </ScrollView>

        {/* Sticky Bottom Section */}
        {apiProductDetails.length !== 0 && apiProductDetails && (
          <View style={styles.bottomBar}>
            <View>
              <Text style={styles.amountLabel}>Amount to pay:</Text>
              <Text style={styles.amountText}>
                {cartTotal - couponDiscount + 5 + 40}
              </Text>
            </View>
            {formattedAddress !==
            'undefined - undefined, undefined, undefined' ? (
              <TouchableOpacity
                style={styles.addressButton}
                onPress={handleCheckoutPress}
                disabled={isProcessingPayment}>
                {isProcessingPayment ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.addressButtonText}>Checkout</Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.addressButton}
                onPress={showLocationModal}>
                <Text style={styles.addressButtonText}>
                  Select / Add Address
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </SafeAreaView>

      <LocationModal
        isVisible={isLocationModalVisible}
        onClose={hideLocationModal}
        onSelectCurrentLocation={handleSelectCurrentLocation}
        onEnterManually={handleEnterManually}
      />

      <PaymentMethodModal
        isVisible={isPaymentMethodVisible}
        onClose={() => setPaymentMethodVisible(false)}
        onSelectCOD={handleSelectCOD}
        onPayOnline={handlePayOnline}
      />
    </>
  );
};

export default CartPage;
