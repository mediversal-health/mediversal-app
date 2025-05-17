import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from '../Screens/LoginScreen';
import EmailSignup from '../components/auth/EmailSignUp';
import Layout from '../Layout';
import UploadScreen from '../Screens/UploadScreen';
import AllProductsScreen from '../Screens/AllProductsScreen';
import UploadPrescription from '../Screens/UploadPrescription';
import AddressBookScreen from '../Screens/AddressBookScreen';
import CartPage from '../Screens/CartScreen';
import LocationMapScreen from '../Screens/LocationMapScreen';
import {AddressBookTypes, Product} from '../types';
import SearchScreen from '../Screens/SearchScreen';
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  HomeScreen: undefined;
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
    };
  };
  LocationMapScreen: undefined;
  SearchScreen: undefined;
};

import {useAuthStore} from '../store/authStore';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={EmailSignup} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Layout" component={Layout} />
    <Stack.Screen name="AllProducts" component={AllProductsScreen} />
    <Stack.Screen name="UploadScreen" component={UploadScreen} />
    <Stack.Screen name="CartPage" component={CartPage} />
    <Stack.Screen name="UploadPrescription" component={UploadPrescription} />
    <Stack.Screen name="AddressBookScreen" component={AddressBookScreen} />
    <Stack.Screen name="LocationMapScreen" component={LocationMapScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const token = useAuthStore(state => state.token);

  return (
    <NavigationContainer>
      {token ? <AppStack /> : <AuthStack />}
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={EmailSignup} /> */}
        <Stack.Screen name="Layout" component={Layout} />
        <Stack.Screen name="AllProducts" component={AllProductsScreen} />
        <Stack.Screen
          name="UploadScreen"
          component={UploadScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CartPage"
          component={CartPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UploadPrescription"
          component={UploadPrescription}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AddressBookScreen"
          component={AddressBookScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LocationMapScreen"
          component={LocationMapScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
