import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../Screens/LoginScreen';
import EmailSignup from '../components/auth/EmailSignUp';
import layout from '../layout';
import UploadScreen from '../Screens/UploadScreen';
import AllProductsScreen from '../Screens/AllProductsScreen';
import UploadPrescription from '../Screens/UploadPrescription';
import AddressBookScreen from '../Screens/AddressBookScreen';
import CartPage from '../Screens/CartScreen';
import LocationMapScreen from '../Screens/LocationMapScreen';
import {AddressBookTypes, Product} from '../types';
import SearchScreen from '../Screens/SearchScreen';
import {useAuthStore} from '../store/authStore'; // 🔐 added auth store
import PrescriptionVerification from '../components/cards/PrescriptionVerification';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  HomeScreen: undefined;
  PrescriptionVerification: {
    pdfs: string[];
    pdfName: string | null;
  };
  SuccessAnimation: undefined;
  Layout: undefined;
  UploadScreen: {product?: Product};
  AllProducts: undefined;
  UploadPrescription: undefined;
  CartPage: {
    formData?: AddressBookTypes;
  };
  AddressBookScreen: {
    location?: {
      title: string;
      address: string;
      coords?: {
        // Make coords optional in case you navigate without it sometimes
        latitude: number;
        longitude: number;
      };
    };
  };
  LocationMapScreen: undefined;
  SearchScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const token = useAuthStore(state => state.token); // 🔐 get token from store

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {token ? (
          <>
            <Stack.Screen name="Layout" component={layout} />
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
