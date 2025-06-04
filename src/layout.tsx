/* eslint-disable react-native/no-inline-styles */
import {Bell, ChevronDown, ShoppingBag} from 'lucide-react-native';
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

const Layout = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const currentScreen = useScreenStore(state => state.currentScreen);

  const {setProducts} = useProductStore();
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
              // paddingTop:
              //   Platform.OS === 'ios' ? 40 : StatusBar.currentHeight || 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableWithoutFeedback onPress={() => setDrawerVisible(true)}>
                <Image
                  source={require('./assests/pngs/MainAvatar.png')}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 25,
                    marginRight: 10,
                    borderWidth: 2,
                    borderColor: '#ccc',
                  }}
                />
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
                        Gandhi Maidan 800024
                      </Text>
                    </TouchableOpacity>
                    <ChevronDown size={20} />
                  </View>
                  <View style={{gap: 12, flexDirection: 'row'}}>
                    <Bell size={20} />
                    <TouchableOpacity
                      onPress={() => navigation.navigate('CartPage', {})}>
                      <ShoppingBag size={20} />
                    </TouchableOpacity>
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
          <View style={{paddingHorizontal: 20}}>
            <SearchBar />
          </View>
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
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Text style={{fontSize: 16, fontFamily: Fonts.JakartaSemiBold}}>
                Pharmacy
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('CartPage', {})}>
              <ShoppingBag size={20} />
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal: 20, marginBottom: 5}}>
            <SearchBar />
          </View>
        </>
      ) : null}
      <BottomTabNavigator />
      {drawerVisible && (
        <CustomDrawer onClose={() => setDrawerVisible(false)} />
      )}
    </SafeAreaView>
  );
};

export default Layout;
