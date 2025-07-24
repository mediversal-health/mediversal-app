import React, {useEffect, useRef, useState} from 'react';
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
import {styles} from './index.styles';
import {
  ChevronRight,
  Truck,
  // Wallet,
  ChevronLeft,
  InfoIcon,
  Wallet,
} from 'lucide-react-native';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import CartItemCard from '../../components/cards/CartItemCard';
import BillSummaryCard from '../../components/cards/BillSummaryCard';
import OtherDetailsCard from '../../components/cards/OtherDetailsCard';
import LocationModal from '../../components/modal/LocationModal';
import {RootStackParamList} from '../../navigation';
import NavigationImg from './assets/svgs/navigation.svg';
import {Fonts} from '../../styles/fonts';
import {useAuthStore} from '../../store/authStore';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCallback} from 'react';
import {getCartItems} from '../../Services/cart';
import {useCouponStore} from '../../store/couponStore';
import {useCartStore} from '../../store/cartStore';
import RazorpayCheckout from 'react-native-razorpay';
import useProductStore from '../../store/productsStore';
import {getProducts} from '../../Services/pharmacy';
import {useToastStore} from '../../store/toastStore';
import Config from 'react-native-config';
import PaymentMethodModal from '../../components/modal/PaymentMethodModal';
import PinkDiscount from './assets/svgs/Group 6.svg';
import PrescriptionUploadModal from '../../components/modal/UploadPrescriptionModal';
import EmptyCartScreenSvg from './assets/svgs/Group 7.svg';
import {usePrescriptionStore} from '../../store/prescriptionStore';

const CartPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  // const [isPrescriptionItemsPresent, setisPrescriptionItemsPresent] =
  //   useState(false);
  const route = useRoute<RouteProp<RootStackParamList, 'CartPage'>>();
  const RAZORPAY_KEY = Config.RAZORPAY_KEY;
  const formData = route.params?.formData;
  const customer_id = useAuthStore(state => state.customer_id);

  const pincode = formData?.PinCode;
  const area = formData?.Area_details;
  const City = formData?.City;
  const State = formData?.State;
  const name = formData?.Recipient_name;

  const {clearPrescriptions, getFiles} = usePrescriptionStore();
  const currentCustomerPrescriptions = customer_id
    ? getFiles(customer_id.toString())
    : [];
  console.log(currentCustomerPrescriptions, 'currentCustomerPrescriptions');
  const hasPrescriptionFiles = currentCustomerPrescriptions.length > 0;

  const formattedAddress = `${pincode} - ${area}, ${City}, ${State}`;

  const [apiProductDetails, setApiProductDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {getSelectedCoupon, setSelectedCoupon} = useCouponStore();
  const selectedCoupon = getSelectedCoupon(String(customer_id));
  const {originalProducts, setProducts} = useProductStore();
  const [hasOutOfStockItems, setHasOutOfStockItems] = useState(false);
  const [isPaymentMethodVisible, setPaymentMethodVisible] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(false);
  const wasCartEmptyRef = useRef(apiProductDetails.length === 0);
  const [isPrescriptionModalVisible, setPrescriptionModalVisible] =
    useState(false);
  const showToast = useToastStore(state => state.showToast);
  const handleCouponRemove = () => {
    setSelectedCoupon(String(customer_id), null);
  };
  const checkOutOfStockItems = (items: any[]) => {
    return items.some((item: any) => item.StockAvailableInInventory === 0);
  };
  const getDeliveryDate = (daysToAdd: number) => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + daysToAdd);

    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };
  const fetchProducts = useCallback(() => {
    getProducts()
      .then(response => {
        setProducts(response.data.products);
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
  useEffect(() => {
    const isCartEmpty = apiProductDetails.length === 0;
    if (isCartEmpty && !wasCartEmptyRef.current) {
      console.log('Cart became empty, clearing prescriptions');
      clearPrescriptions(customer_id?.toString() ?? '');
    }
    wasCartEmptyRef.current = isCartEmpty;
  }, [apiProductDetails.length, clearPrescriptions]);
  console.log('hasOutOfStockItems', hasOutOfStockItems);
  useEffect(() => {
    if (customer_id) {
      fetchProductDetails();
    }
  }, []);

  const handleCheckoutPress = () => {
    if (hasOutOfStockItems) {
      showToast(
        'Remove out-of-stock items from your cart before proceeding.',
        'warning',
        1000,
        true,
      );
      return;
    }
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
            amount: Math.round(
              cartTotal - couponDiscount + 5 + 5 + (cartTotal > 499 ? 0 : 40),
            ),
            cartItems: cartItems,
            address: formattedAddress,
            pincode: formData?.PinCode ?? 0,
            name: formData?.Recipient_name,
            area: formData?.Area_details ?? '',
            city: formData?.City,
            State: formData?.State ?? '',
            PhoneNumber: Number(formData?.PhoneNumber) || 0,
            coupon_id: selectedCoupon?.id || null,
            couponDiscount: couponDiscount,
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

  const handleCheckout = async () => {
    if (!RAZORPAY_KEY) {
      showToast('Razorpay key is missing.', 'error', 1000, true);
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
        amount:
          Math.round(
            cartTotal - couponDiscount + 5 + 5 + (cartTotal > 499 ? 0 : 40),
          ) * 100,
        name: 'Mediversal APP',
        theme: {color: '#0088B1'},
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
                name: formData?.Recipient_name,
                amount: Math.round(
                  cartTotal -
                    couponDiscount +
                    5 +
                    5 +
                    (cartTotal > 499 ? 0 : 40),
                ),
                cartItems: cartItems,
                address: formattedAddress,
                pincode: formData?.PinCode ?? 0,
                area: formData?.Area_details ?? '',
                city: formData?.City,
                State: formData?.State ?? '',
                PhoneNumber: Number(formData?.PhoneNumber) || 0,
                coupon_id: selectedCoupon?.id || null,
                couponDiscount: couponDiscount,
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

  const isPrescriptionRequiredItemsPresent = apiProductDetails.some(
    item => item.PrescriptionRequired == 'Yes',
  );

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
          <Text style={styles.headerTitle}>Cart</Text>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {formattedAddress !== 'undefined - undefined, undefined, undefined' &&
            apiProductDetails.length > 0 && (
              <View style={styles.container}>
                <View
                  style={{
                    backgroundColor: '#E8F4F7',
                    padding: 20,
                    flexDirection: 'row',
                    gap: 15,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    <NavigationImg />
                    <View style={{flexDirection: 'column', width: '70%'}}>
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
                  colors={['#F8F8F8', '#0088B1']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.couponStrip}>
                  <View style={styles.couponLeft}>
                    <PinkDiscount />
                    <Text style={styles.couponText}>Apply Coupon</Text>
                  </View>
                  <View style={styles.iconIOS}>
                    <ChevronRight size={16} color="#F8F8F8" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}

          {apiProductDetails.length === 0 ||
            (apiProductDetails && selectedCoupon && (
              <LinearGradient
                colors={['#FFFFFF', '#0088B1']}
                start={{x: 1, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.appliedCouponContainer}>
                <View style={styles.appliedCouponLeft}>
                  <View style={{flexDirection: 'row'}}>
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
          {hasPrescriptionFiles &&
            isPrescriptionRequiredItemsPresent &&
            formattedAddress ===
              'undefined - undefined, undefined, undefined' && (
              <View
                style={{
                  backgroundColor: '#FFE0C5',
                  marginHorizontal: 24,
                  borderRadius: 6,
                  padding: 16,
                  marginTop: 24,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                  <InfoIcon color={'#EB5757'} />
                  <Text
                    style={{
                      color: '#EB5757',
                      fontFamily: Fonts.JakartaSemiBold,
                      fontSize: 14,
                    }}>
                    Warning
                  </Text>
                </View>
                <Text style={{fontFamily: Fonts.JakartaRegular, fontSize: 12}}>
                  Looks like you've uploaded prescriptions earlier. If you have
                  more to upload, feel free to do so. Otherwise, you may
                  proceed.
                </Text>
              </View>
            )}
          {apiProductDetails.length === 0 ||
            (apiProductDetails && (
              <View style={styles.deliveryRow}>
                <View style={styles.deliveryLeft}>
                  <Truck size={16} />
                </View>
                <Text style={styles.deliveryText}>
                  {`Delivery by ${getDeliveryDate(3)}`}
                </Text>
              </View>
            ))}
          {apiProductDetails.length > 0 ? (
            apiProductDetails.map(item => (
              <View style={{marginVertical: 4}}>
                <CartItemCard
                  key={item.productId}
                  productId={item.productId}
                  imageUrl={item.imageUrl}
                  name={item.ProductName}
                  mrp={item.SellingPrice}
                  price={item.CostPrice}
                  isPrescriptionRequired={item.PrescriptionRequired}
                  packSize={item.PackageSize}
                  onRemove={async () => {
                    await fetchProductDetails();
                  }}
                  onQuantityChange={handleQuantityChange}
                  fromOrderDesc={false}
                />
              </View>
            ))
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 100,
              }}>
              <EmptyCartScreenSvg />

              <Text
                style={{
                  fontFamily: Fonts.JakartaBold,
                  fontSize: 14,
                  color: '#899193',
                }}>
                No Items in Cart
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.JakartaBold,
                  fontSize: 12,
                  color: '#899193',
                }}>
                Go find the products you need
              </Text>
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
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={[styles.radioLabel, {marginRight: 8}]}>
                    0MCs
                  </Text>
                  <View
                    style={[
                      styles.radioCircle,
                      selectedRadio && {borderColor: '#0088B1'},
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
                  finalPrice={
                    cartTotal -
                    couponDiscount +
                    5 +
                    5 +
                    (cartTotal > 499 ? 0 : 40)
                  }
                  details={{
                    cartTotal: cartTotal,
                    couponDiscount: couponDiscount,
                    handlingFee: 5,
                    platformFee: 5,
                    deliveryCharges: cartTotal > 499 ? 0 : 40,
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
                ₹
                {Math.round(
                  cartTotal -
                    couponDiscount +
                    5 +
                    5 +
                    (cartTotal > 499 ? 0 : 40),
                )}
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
              <>
                {isPrescriptionRequiredItemsPresent ? (
                  // When prescription is required but no files exist - show upload button only
                  <TouchableOpacity
                    style={styles.addressButton}
                    onPress={() => setPrescriptionModalVisible(true)}>
                    <Text style={styles.addressButtonText}>
                      Upload/View Prescription
                    </Text>
                  </TouchableOpacity>
                ) : (
                  // When no prescription required - show address button only
                  <TouchableOpacity
                    style={styles.addressButton}
                    onPress={showLocationModal}>
                    <Text style={styles.addressButtonText}>
                      Select / Add Address
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        )}
      </SafeAreaView>
      <PrescriptionUploadModal
        isVisible={isPrescriptionModalVisible}
        onClose={() => setPrescriptionModalVisible(false)}
        onUploadSuccess={() => {
          const updatedProducts = apiProductDetails.map(item => ({
            ...item,
            PrescriptionRequired: 'No',
          }));
          setApiProductDetails(updatedProducts);
          // showToast('Prescription uploaded successfully!', 'success');
        }}
        isPrescriptionRequired={isPrescriptionRequiredItemsPresent}
        onNavigateToAddressBook={() => {
          navigation.navigate('AddressBookScreen', {
            fromLocationMap: false,
            isFromProfile: false,
          });
          // setLocationModalVisible(true);
        }}
      />
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
