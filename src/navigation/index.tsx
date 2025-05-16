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

import {useAuthStore} from '../store/authStore'; // adjust path as needed

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={EmailSignup} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Layout" component={layout} />
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
    </NavigationContainer>
  );
};

export default AppNavigator;
