import {Bell, ChevronDown} from 'lucide-react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
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

  const [imageError, setImageError] = useState(false);
  const {setProducts} = useProductStore();
  useEffect(() => {
    if (isAuthenticated) {
      showToast('Welcome to Mediversal!', 'success', 3000, true);
    }
    setIsAuthenticated(false);
  }, []);
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} edges={['top']}>
      <StatusBar
        backgroundColor="#0088B1"
        barStyle="light-content"
        translucent={true}
        showHideTransition={'fade'}
      />
      {currentScreen === 'Home' ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingBottom: 0,
              marginBottom: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableWithoutFeedback onPress={() => setDrawerVisible(true)}>
                {profileImage && !imageError ? (
                  <Image
                    source={{
                      uri:
                        typeof profileImage === 'string'
                          ? profileImage
                          : profileImage?.uri,
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 25,
                      marginRight: 10,
                      borderWidth: 2,
                      borderColor: '#ccc',
                    }}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 25,
                      marginRight: 10,
                      borderWidth: 2,
                      borderColor: '#ccc',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#ccc',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts.JakartaRegular,
                        fontSize: 18,
                        color: '#fff',
                      }}>
                      {email ? email.charAt(0).toUpperCase() : 'GU'}
                    </Text>
                  </View>
                )}
              </TouchableWithoutFeedback>

              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: Fonts.JakartaBold,
                  }}>
                  Delivering to
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                  }}>
                  <View style={{flexDirection: 'row', gap: 3}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SearchScreen')}>
                      <Text
                        style={{
                          fontFamily: Fonts.JakartaRegular,
                          fontSize: 12,
                        }}>
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
                    <ChevronDown size={20} />
                  </View>
                  <View style={{gap: 12, flexDirection: 'row'}}>
                    <Bell size={20} />
                    <CartIconWithBadge />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 12, fontFamily: Fonts.JakartaRegular}}>
                Get Medicine reminderds and other updates{' '}
              </Text>
              <View style={{flexDirection: 'row', gap: 3}}>
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 5,
                    fontFamily: Fonts.JakartaRegular,
                  }}>
                  via notification
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 12,
                      textDecorationLine: 'underline',
                      fontFamily: Fonts.JakartaBold,
                    }}>
                    View More
                  </Text>
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
          <TouchableOpacity style={{paddingHorizontal: 20}}>
            <SearchBar />
          </TouchableOpacity>
        </>
      ) : currentScreen === 'Pharmacy' ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingBottom: 10,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Text style={{fontSize: 16, fontFamily: Fonts.JakartaSemiBold}}>
                Pharmacy
              </Text>
            </View>
            <CartIconWithBadge />
          </View>
          <View style={{paddingHorizontal: 20, marginBottom: 5}}>
            <SearchBar />
          </View>
        </>
      ) : currentScreen === 'Profile' ? (
        <View />
      ) : null}
      <BottomTabNavigator />
      {drawerVisible && (
        <CustomDrawer onClose={() => setDrawerVisible(false)} />
      )}
    </SafeAreaView>
  );
};

export default Layout;
