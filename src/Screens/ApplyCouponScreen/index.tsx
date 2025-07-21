import {ChevronLeft} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  // Alert,
} from 'react-native';
import styles from './index.styles';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import CouponCard from '../../components/cards/CouponCard';
import {useCouponStore} from '../../store/couponStore';
import {Coupon} from '../../types';
import {useAuthStore} from '../../store/authStore';
import {fetchCoupons} from '../../Services/coupons';

type ApplyCouponScreenRouteProp = RouteProp<
  RootStackParamList,
  'ApplyCouponScreen'
>;

const ApplyCouponScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const customer_id = useAuthStore(state => state.customer_id);
  const [searchQuery, setSearchQuery] = useState('');
  const [topCoupons, setTopCoupons] = useState<Coupon[]>([]);
  const [moreCoupons, setMoreCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const route = useRoute<ApplyCouponScreenRouteProp>();
  const cartTotal = route.params?.cartTotal || 0;
  const {setSelectedCoupon} = useCouponStore();

  useEffect(() => {
    const loadCoupons = async () => {
      try {
        setLoading(true);
        setError(false);
        console.log(customer_id, cartTotal);
        const response = await fetchCoupons(customer_id, cartTotal, '');
        console.log(response);
        // Check if response is null, undefined, or failed
        if (!response) {
          setError(true);
          setTopCoupons([]);
          setMoreCoupons([]);
          return;
        }

        if (response.topCoupons && response.moreCoupons) {
          setTopCoupons(response.topCoupons);
          setMoreCoupons(response.moreCoupons);
        } else if (response.coupons) {
          const allCoupons = response.coupons;
          const midIndex = Math.ceil(allCoupons.length / 2);
          setTopCoupons(allCoupons.slice(0, midIndex));
          setMoreCoupons(allCoupons.slice(midIndex));
        } else {
          setTopCoupons(response.slice(0, 2) || []);
          setMoreCoupons(response.slice(2) || []);
        }
      } catch (err) {
        console.error('Error fetching coupons:', err);
        setError(true);
        setTopCoupons([]);
        setMoreCoupons([]);
      } finally {
        setLoading(false);
      }
    };

    if (customer_id) {
      loadCoupons();
    }
  }, [customer_id, cartTotal]);

  // const allCoupons = [...topCoupons, ...moreCoupons];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleApplyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(String(customer_id), coupon);
    console.log(
      `Applied coupon ${coupon.coupon_name} for customer ${String(
        customer_id,
      )}`,
    );
    navigation.goBack();
  };

  const handleRemoveCoupon = () => {
    setSelectedCoupon(String(customer_id), null);
    console.log(`Removed coupon for customer ${String(customer_id)}`);
  };

  // const handleApplySearchedCoupon = () => {
  //   const trimmedQuery = searchQuery.trim();
  //   if (trimmedQuery === '') {
  //     Alert.alert('Error', 'Please enter a coupon code');
  //     return;
  //   }

  //   const foundCoupon = allCoupons.find(
  //     coupon => coupon.coupon_name.toLowerCase() === trimmedQuery.toLowerCase(),
  //   );

  //   if (foundCoupon) {
  //     setSelectedCoupon(String(customer_id), foundCoupon);
  //     console.log(
  //       `Applied searched coupon ${
  //         foundCoupon.coupon_name
  //       } for customer ${String(customer_id)}`,
  //     );
  //     navigation.goBack();
  //   } else {
  //     Alert.alert(
  //       'Invalid Coupon',
  //       'The coupon code you entered is not valid or has expired.',
  //     );
  //   }
  // };

  const searchCoupons = (coupons: Coupon[], query: string) => {
    if (!query.trim()) {
      return coupons;
    }

    const searchTerm = query.toLowerCase().trim();

    return coupons.filter(coupon => {
      const nameMatch = coupon.coupon_name.toLowerCase().includes(searchTerm);

      const descriptionMatch = coupon.description
        ? coupon.description.toLowerCase().includes(searchTerm)
        : false;

      const codeMatch = coupon.coupon_code
        ? coupon.coupon_code.toLowerCase().includes(searchTerm)
        : false;

      const discountMatch = coupon.discount_value
        ? coupon.discount_value.toLowerCase().includes(searchTerm)
        : false;

      return nameMatch || descriptionMatch || codeMatch || discountMatch;
    });
  };

  const filteredTopCoupons = searchCoupons(topCoupons, searchQuery);
  const filteredMoreCoupons = searchCoupons(moreCoupons, searchQuery);

  const showSearchResults = searchQuery.trim().length > 0;
  const hasNoCoupons = topCoupons.length === 0 && moreCoupons.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color="#0088B1" />
          <Text style={{}}>Back</Text>
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
          {/* {searchQuery.trim().length > 0 && (
            <TouchableOpacity
              style={styles.applySearchButton}
              onPress={handleApplySearchedCoupon}>
              <Text style={styles.applySearchButtonText}>Apply</Text>
            </TouchableOpacity>
          )} */}
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {!loading && (error || hasNoCoupons) && !showSearchResults && (
          <View style={styles.noCouponsContainer}>
            <Text style={styles.noCouponsText}>
              No coupons are available for you currently
            </Text>
            <Text style={styles.noCouponsSubText}>
              Check back later for new offers and discounts
            </Text>
          </View>
        )}

        {!loading && !error && !hasNoCoupons && (
          <>
            {(!showSearchResults || filteredTopCoupons.length > 0) && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Top Coupons for You</Text>
                {(showSearchResults ? filteredTopCoupons : topCoupons).map(
                  coupon => (
                    <CouponCard
                      key={coupon.coupon_name}
                      coupon={coupon}
                      onApply={handleApplyCoupon}
                      onRemove={handleRemoveCoupon}
                    />
                  ),
                )}
              </View>
            )}

            {!showSearchResults && moreCoupons.length > 0 && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>More Coupons</Text>
                {(showSearchResults ? filteredMoreCoupons : moreCoupons).map(
                  coupon => (
                    <CouponCard
                      key={coupon.coupon_name}
                      coupon={coupon}
                      onApply={handleApplyCoupon}
                      onRemove={handleRemoveCoupon}
                    />
                  ),
                )}
              </View>
            )}
          </>
        )}

        {showSearchResults &&
          filteredTopCoupons.length === 0 &&
          filteredMoreCoupons.length === 0 && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                No coupons found matching "{searchQuery.trim()}"
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
