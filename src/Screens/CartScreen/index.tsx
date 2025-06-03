/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './index.styles';
import {
  Percent,
  ChevronRight,
  Truck,
  Wallet,
  Search,
  ChevronLeft,
  ShoppingBag,
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

const CartPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const route = useRoute<RouteProp<RootStackParamList, 'CartPage'>>();

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
  const {selectedCoupon, setSelectedCoupon} = useCouponStore();
  const handleCouponRemove = () => {
    setSelectedCoupon(null);
  };
  const fetchProductDetails = useCallback(async () => {
    try {
      setLoading(true);

      const apiItems = await getCartItems(customer_id);
      setApiProductDetails(apiItems);
    } catch (err) {
      setError('Failed to load product details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [customer_id]);

  useEffect(() => {
    if (customer_id) {
      fetchProductDetails();
    }
  }, [customer_id, fetchProductDetails]);

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

  const [selectedRadio, setSelectedRadio] = useState(false);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0088B1" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
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
          <View style={styles.headerRightIcons}>
            <TouchableOpacity style={styles.iconSpacing}>
              <Search size={20} color="#161D1F" />
            </TouchableOpacity>
            <TouchableOpacity>
              <ShoppingBag size={20} color="#161D1F" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.container}>
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
                      style={{fontSize: 12, fontFamily: Fonts.JakartaRegular}}>
                      {formattedAddress}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.replace('AddressBookScreen', {
                      fromLocationMap: false,
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
          {apiProductDetails.length > 0 && (
            <TouchableOpacity
              onPress={() => navigation.navigate('ApplyCouponScreen')}>
              <LinearGradient
                colors={['#F8F8F8', '#FE90E2']}
                start={{x: 1, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.couponStrip}>
                <View style={styles.couponLeft}>
                  <Percent size={16} color="#000" style={styles.icon} />
                  <Text style={styles.couponText}>Apply Coupon</Text>
                </View>
                <ChevronRight size={16} color="#000" />
              </LinearGradient>
            </TouchableOpacity>
          )}

          {selectedCoupon && (
            <LinearGradient
              colors={['#FFFFFF', '#0088B1']}
              start={{x: 1, y: 1}}
              end={{x: 0, y: 1}}
              style={styles.appliedCouponContainer}>
              <View style={styles.appliedCouponLeft}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.appliedCouponText}>Coupon Applied:</Text>
                  <Text style={styles.appliedCouponCode}>
                    {selectedCoupon?.couponCode}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleCouponRemove}>
                <Text style={styles.removeCouponText}>Remove</Text>
              </TouchableOpacity>
            </LinearGradient>
          )}
          {apiProductDetails.length > 0 && (
            <View style={styles.deliveryRow}>
              <Truck size={18} color="#000" style={styles.icon} />
              <Text style={styles.deliveryText}>By Sun, 11 May</Text>
            </View>
          )}
          {apiProductDetails.length > 0 ? (
            apiProductDetails.map(item => (
              <CartItemCard
                key={item.id}
                productId={item.productId}
                imageUrl={item.imageUrl}
                name={item.ProductName}
                mrp={item.SellingPrice}
                price={item.CostPrice}
                onRemove={fetchProductDetails}
              />
            ))
          ) : (
            <View style={styles.emptyCartContainer}>
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
            </View>
          )}

          {/* MediCash Card */}
          <View style={styles.mediCashCard}>
            <View style={styles.mediCashLeft}>
              <Wallet size={20} color="#B0B6B8" style={styles.icon} />
              <Text style={styles.mediCashText}>Use MediCash</Text>
            </View>
            <TouchableOpacity
              onPress={() => setSelectedRadio(!selectedRadio)}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.radioLabel, {marginRight: 8}]}>0MCs</Text>
              <View
                style={[
                  styles.radioCircle,
                  selectedRadio && {borderColor: '#0088B1'},
                ]}>
                {selectedRadio && <View style={styles.selectedDot} />}
              </View>
            </TouchableOpacity>
          </View>
          {/* Bill Summary Label */}
          <Text style={styles.billSummaryLabel}>Bill Summary</Text>
          <BillSummaryCard
            originalPrice={599}
            finalPrice={574}
            details={{
              cartTotal: 599,
              couponDiscount: 25,
              handlingFee: 5,
              platformFee: 0,
              deliveryCharges: 0,
            }}
          />
          <OtherDetailsCard />
        </ScrollView>

        {/* Sticky Bottom Section */}
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.amountLabel}>Amount to pay:</Text>
            <Text style={styles.amountText}>₹574</Text>
          </View>
          {formattedAddress !==
          'undefined - undefined, undefined, undefined' ? (
            <TouchableOpacity style={styles.addressButton}>
              <Text style={styles.addressButtonText}>Checkout</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addressButton}
              onPress={showLocationModal}>
              <Text style={styles.addressButtonText}>Select / Add Address</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <LocationModal
        isVisible={isLocationModalVisible}
        onClose={hideLocationModal}
        onSelectCurrentLocation={handleSelectCurrentLocation}
        onEnterManually={handleEnterManually}
      />
    </>
  );
};

export default CartPage;
