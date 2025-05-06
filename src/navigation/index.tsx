import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../Screens/LoginScreen';
import EmailSignup from '../components/auth/EmailSignUp';
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  HomeScreen: undefined;
  SuccessAnimation: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={EmailSignup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
