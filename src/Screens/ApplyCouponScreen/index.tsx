import {ChevronLeft} from 'lucide-react-native';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import styles from './index.styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import CouponCard from '../../components/cards/CouponCard';
import {useCouponStore} from '../../store/couponStore';
import {Coupon} from '../../types';
const ApplyCouponScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const {setSelectedCoupon} = useCouponStore();

  const topCoupons: Coupon[] = [
    {
      couponCode: 'GETMED',
      title: 'Save ₹50 + Earn 10+2 MC',
      description:
        '15% Cashback on Medicine* and upto 5% cashback on non-medicine item + Delivery Fees Savings on adding circle membership(worth ₹149 or ₹199) to cart.',
    },
    {
      couponCode: 'GETHEALTH',
      title: 'Save ₹ 100 + Earn 20+4 MC',
      description:
        '20% Cashback on Supplements* and upto 10% cashback on fitness products + Free Shipping on orders above ₹ 999.',
    },
  ];

  const moreCoupons: Coupon[] = [
    {
      couponCode: 'GETWELL',
      title: 'Save ₹ 75 + Earn 15+3 MC',
      description:
        '18% Cashback on Personal Care* and upto 7% cashback on wellness items + Exclusive Discounts on first order.',
    },
    {
      couponCode: 'WELLNESS25',
      title: '25% Off on Wellness',
      description:
        'Get 25% discount on wellness products. Maximum discount of ₹150.',
    },
    {
      couponCode: 'FIRSTORDER',
      title: 'First Order Special',
      description:
        'Special discount for first-time customers. Flat ₹100 off on orders above ₹800.',
    },
  ];

  const allCoupons = [...topCoupons, ...moreCoupons];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleApplyCoupon = (coupon: Coupon) => {
    console.log('Applied coupon:', coupon.couponCode);
    navigation.goBack();
  };

  const handleRemoveCoupon = (coupon: Coupon) => {
    console.log('Removed coupon:', coupon.couponCode);
  };

  const handleApplySearchedCoupon = () => {
    if (searchQuery.trim() === '') {
      Alert.alert('Error', 'Please enter a coupon code');
      return;
    }

    // Check if the searched coupon exists in our coupon list
    const foundCoupon = allCoupons.find(
      coupon => coupon.couponCode.toLowerCase() === searchQuery.toLowerCase(),
    );

    if (foundCoupon) {
      setSelectedCoupon(foundCoupon);
      console.log('Applied searched coupon:', foundCoupon.couponCode);
      navigation.goBack();
    } else {
      Alert.alert(
        'Invalid Coupon',
        'The coupon code you entered is not valid or has expired.',
      );
    }
  };

  const filteredTopCoupons = topCoupons.filter(
    coupon =>
      coupon.couponCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredMoreCoupons = moreCoupons.filter(
    coupon =>
      coupon.couponCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const showSearchResults = searchQuery.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color="#0088B1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apply Coupons</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter coupon code"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="characters"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <>
              <TouchableOpacity
                style={styles.applySearchButton}
                onPress={handleApplySearchedCoupon}>
                <Text style={styles.applySearchButtonText}>Apply</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {(!showSearchResults || filteredTopCoupons.length > 0) && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Top Coupons for You</Text>
            {(showSearchResults ? filteredTopCoupons : topCoupons).map(
              coupon => (
                <CouponCard
                  key={coupon.couponCode}
                  coupon={coupon}
                  onApply={handleApplyCoupon}
                  onRemove={handleRemoveCoupon}
                />
              ),
            )}
          </View>
        )}

        {(!showSearchResults || filteredMoreCoupons.length > 0) && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>More Coupons</Text>
            {(showSearchResults ? filteredMoreCoupons : moreCoupons).map(
              coupon => (
                <CouponCard
                  key={coupon.couponCode}
                  coupon={coupon}
                  onApply={handleApplyCoupon}
                  onRemove={handleRemoveCoupon}
                />
              ),
            )}
          </View>
        )}

        {showSearchResults &&
          filteredTopCoupons.length === 0 &&
          filteredMoreCoupons.length === 0 && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                No coupons found matching "{searchQuery}"
              </Text>
              <Text style={styles.noResultsSubText}>
                Try searching with a different coupon code
              </Text>
            </View>
          )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplyCouponScreen;
