import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../Screens/LoginScreen';
import EmailSignup from '../components/auth/EmailSignUp';
import layout from '../layout';
import UploadScreen from '../Screens/UploadScreen';
import AllProductsScreen from '../Screens/AllProductsScreen';
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  HomeScreen: undefined;
  SuccessAnimation: undefined;
  Layout: undefined;
  UploadScreen: undefined;
  AllProducts: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={EmailSignup} />
        <Stack.Screen name="Layout" component={layout} />
        <Stack.Screen name="AllProducts" component={AllProductsScreen} />
        <Stack.Screen
          name="UploadScreen"
          component={UploadScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
