import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../Screens/LoginScreen';
import EmailSignup from '../components/auth/EmailSignUp';
// import Layout from '../Layout';
import UploadScreen from '../Screens/UploadScreen';
import AllProductsScreen from '../Screens/AllProductsScreen';
import UploadPrescription from '../Screens/UploadPrescription';
import AddressBookScreen from '../Screens/AddressBookScreen';
import CartPage from '../Screens/CartScreen';
import LocationMapScreen from '../Screens/LocationMapScreen';
import {AddressBookTypes, OrderData, Product} from '../types';
import SearchScreen from '../Screens/SearchScreen';
import {useAuthStore} from '../store/authStore'; // 🔐 added auth store
import PrescriptionVerification from '../Screens/PrescriptionVerificationScreen';
import OrdersScreen from '../Screens/OrdersScreen';
import PrescribedScreen from '../Screens/PrescribedScreen';
import ApplyCouponScreen from '../Screens/ApplyCouponScreen';
import Layout from '../layout';
import PaymentSuccessScreen from '../components/payments/PaymentSuccessScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import PrescriptionsScreen from '../Screens/PrescriptionsScreen';
import GlobalSearchScreen from '../Screens/GlobalSearchScreen';
import OrdersDetailsScreen from '../Screens/OrderDetailsScreen';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  HomeScreen: undefined;
  PrescriptionVerification: undefined;
  SuccessAnimation: undefined;
  Layout: undefined;
  UploadScreen: {product?: Product};
  AllProducts: undefined;
  UploadPrescription: undefined;
  PrescriptionScreen: undefined;
  CartPage: {
    formData?: AddressBookTypes;
  };
  AddressBookScreen: {
    location?: {
      title: string;
      address: string;
      coords?: {latitude: number; longitude: number};
      formattedAddress: {
        street: string;
        area: string;
        city: string;
        state: string;
        pincode: string;
      };
    };
    fromLocationMap?: boolean;
    isFromProfile?: boolean;
  };
  LocationMapScreen: undefined;
  SearchScreen: undefined;
  OrdersScreen: undefined;
  PrescribedScreen: undefined;
  ApplyCouponScreen: {cartTotal: number};
  PaymentSuccessScreen: {
    paymentId?: string;
    amount: number;
    address: string;
    cartItems: Array<{
      productId: string;
      name: string;
      price: number;
      quantity: number;
      imageUrl: string;
    }>;
    pincode: number;
    area: string;
    city: string | undefined;
    State: string;
    PhoneNumber: number;
  };
  ProfileScreen: undefined;
  GlobalSearchScreen: undefined;
  OrdersDetailsScreen: {
    order_data: OrderData;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const token = useAuthStore(state => state.token); // 🔐 get token from store

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {token ? (
          <>
            <Stack.Screen name="Layout" component={Layout} />
            <Stack.Screen name="AllProducts" component={AllProductsScreen} />
            <Stack.Screen name="UploadScreen" component={UploadScreen} />
            <Stack.Screen name="CartPage" component={CartPage} />
            <Stack.Screen
              name="UploadPrescription"
              component={UploadPrescription}
            />
            <Stack.Screen
              name="AddressBookScreen"
              component={AddressBookScreen}
            />
            <Stack.Screen
              name="LocationMapScreen"
              component={LocationMapScreen}
            />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen
              name="PrescriptionVerification"
              component={PrescriptionVerification}
            />
            <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
            <Stack.Screen
              name="PrescribedScreen"
              component={PrescribedScreen}
            />
            <Stack.Screen
              name="ApplyCouponScreen"
              component={ApplyCouponScreen}
            />
            <Stack.Screen
              name="PaymentSuccessScreen"
              component={PaymentSuccessScreen}
            />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen
              name="PrescriptionScreen"
              component={PrescriptionsScreen}
            />
            <Stack.Screen
              name="GlobalSearchScreen"
              component={GlobalSearchScreen}
            />
            <Stack.Screen
              name="OrdersDetailsScreen"
              component={OrdersDetailsScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={EmailSignup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
