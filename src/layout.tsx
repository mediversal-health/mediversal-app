import {ChevronDown} from 'lucide-react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomTabNavigator from './navigation/BottomTabBarNavigation';
import CustomDrawer from './components/common/CustomDrawer';
import {useScreenStore} from './store/screenSelector';
import SearchBar from './components/common/SearchBar';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './navigation';
import {Fonts} from './styles/fonts';
import {getProducts} from './Services/pharmacy';
import useProductStore from './store/productsStore';
import {useAddressBookStore} from './store/addressStore';
import CartIconWithBadge from './components/ui/CartIconWithBadge';
import {useAuthStore} from './store/authStore';
import {requestLocationPermission} from './utils/permissions';
import {useToastStore} from './store/toastStore';
import HeaderSkeleton from './components/common/layoutSkeleton';

const Layout = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const currentScreen = useScreenStore(state => state.currentScreen);
  const {customerAddressMap} = useAddressBookStore();
  const customer_id = useAuthStore(state => state.customer_id);
  const currentCustomerAddress = customer_id
    ? customerAddressMap[customer_id]
    : null;
  const showToast = useToastStore(state => state.showToast);
  const {profileImage, email, isAuthenticated, setIsAuthenticated} =
    useAuthStore();
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const {setProducts} = useProductStore();

  useEffect(() => {
    if (isAuthenticated) {
      showToast('Welcome to Mediversal!', 'success', 3000, true);
      setIsAuthenticated(false);
    }
  }, [isAuthenticated, setIsAuthenticated, showToast]);

  useEffect(() => {
    const initLocationServices = async () => {
      try {
        await requestLocationPermission();
      } catch (err) {
        console.error('Location setup error:', err);
      }
    };

    initLocationServices();
  }, []);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    getProducts()
      .then(response => {
        console.log(response.data.products, 'response data');
        if (response.data && response.data.products) {
          setProducts(response.data.products);
        } else {
          console.error('Unexpected API response structure:', response);
        }
        setLoading(false);

        console.log('Products:', response.data);
      })
      .catch(error => {
        setLoading(false);

        console.error('Error fetching products:', error);
      });
  }, [setProducts]);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderHomeHeader = () => {
    if (loading) {
      return <HeaderSkeleton />;
    }

    return (
      <>
        <View style={styles.headerContainer}>
          <View style={styles.profileContainer}>
            <TouchableWithoutFeedback onPress={() => setDrawerVisible(true)}>
              {profileImage && !imageError ? (
                <Image
                  source={{
                    uri:
                      typeof profileImage === 'string'
                        ? profileImage
                        : profileImage?.uri,
                  }}
                  style={styles.profileImage}
                  onError={() => setImageError(true)}
                />
              ) : (
                <View style={styles.profilePlaceholder}>
                  <Text style={styles.profileInitial}>
                    {email ? email.charAt(0).toUpperCase() : 'GU'}
                  </Text>
                </View>
              )}
            </TouchableWithoutFeedback>

            <View style={styles.addressContainer}>
              <Text style={styles.deliveringText}>Delivering to</Text>
              <View style={styles.locationContainer}>
                <View style={styles.locationTextContainer}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SearchScreen')}>
                    <Text style={styles.locationText}>
                      {currentCustomerAddress
                        ? `${
                            currentCustomerAddress.Area_details
                              ? currentCustomerAddress.Area_details + ', '
                              : ''
                          }${currentCustomerAddress.City} - ${
                            currentCustomerAddress.State
                          }`
                        : 'Select Location'}
                    </Text>
                  </TouchableOpacity>
                  <ChevronDown size={20} color={'#161D1F'} strokeWidth={2} />
                </View>
                <View style={styles.iconsContainer}>
                  <CartIconWithBadge />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.notificationContainer}>
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationText}>
              Get Medicine reminders and other updates
            </Text>
            <View style={styles.notificationLinkContainer}>
              <Text style={styles.notificationSubText}>via notification</Text>
              <TouchableOpacity>
                <Text style={styles.viewMoreText}>View More</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Switch
            value={isEnabled}
            onValueChange={setIsEnabled}
            trackColor={{false: '#ccc', true: '#ccc'}}
            thumbColor={isEnabled ? '#0088B1' : '#ccc'}
          />
        </View>

        <TouchableOpacity style={styles.searchBarContainer}>
          <SearchBar />
        </TouchableOpacity>
      </>
    );
  };

  const renderPharmacyHeader = () => (
    <>
      <View style={styles.pharmacyHeader}>
        <View style={styles.pharmacyTitleContainer}>
          <Text style={styles.pharmacyTitle}>Pharmacy</Text>
        </View>
        <CartIconWithBadge />
      </View>
      <View style={styles.pharmacySearchContainer}>
        <SearchBar />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        backgroundColor="#0088B1"
        barStyle="light-content"
        translucent={true}
        showHideTransition={'fade'}
      />

      {currentScreen === 'Home' && renderHomeHeader()}
      {currentScreen === 'Pharmacy' && renderPharmacyHeader()}

      <BottomTabNavigator />
      {drawerVisible && (
        <CustomDrawer onClose={() => setDrawerVisible(false)} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 0,
    marginTop: 10,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  profilePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  profileInitial: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 18,
    color: '#F8F8F8',
  },
  addressContainer: {
    flexDirection: 'column',
  },
  deliveringText: {
    fontSize: 12,
    fontFamily: Fonts.JakartaBold,
    color: '#161D1F',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  locationTextContainer: {
    flexDirection: 'row',
    gap: 3,
  },
  locationText: {
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
  },
  iconsContainer: {
    gap: 12,
    flexDirection: 'row',
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  notificationTextContainer: {
    flexDirection: 'column',
  },
  notificationText: {
    fontSize: 12,
    fontFamily: Fonts.JakartaRegular,
  },
  notificationLinkContainer: {
    flexDirection: 'row',
    gap: 3,
  },
  notificationSubText: {
    fontSize: 12,
    marginLeft: 5,
    fontFamily: Fonts.JakartaRegular,
  },
  viewMoreText: {
    fontSize: 12,
    textDecorationLine: 'underline',
    fontFamily: Fonts.JakartaBold,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  pharmacyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginTop: 10,
  },
  pharmacyTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pharmacyTitle: {
    fontSize: 16,
    fontFamily: Fonts.JakartaSemiBold,
  },
  pharmacySearchContainer: {
    paddingHorizontal: 20,
    marginBottom: 5,
  },
});

export default Layout;
