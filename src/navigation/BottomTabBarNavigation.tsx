/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import {Home, User} from 'lucide-react-native';
import {View} from 'react-native';
import Menu from './assests/svgs/Menu 3.svg'; // your custom SVG
import Pharmacy from './assests/svgs/Layer 2.svg';
import Homecare from './assests/svgs/homecare.svg';
import PharmacyScreen from '../Screens/PharmacyScreen';
import {useScreenStore} from '../store/screenSelector';
import {Fonts} from '../styles/fonts';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const setcurrentScreen = useScreenStore(state => state.setCurrentScreen);
  const EmptyScreen = () => <View />;

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let IconComponent;

          switch (route.name) {
            case 'Home':
              IconComponent = Home;
              break;
            case 'Pharmacy':
              return (
                <View>
                  <Pharmacy />
                </View>
              );
            case 'Menu':
              return (
                <View>
                  <Menu />
                </View>
              );
            case 'Homecare':
              return (
                <View>
                  <Homecare />
                </View>
              );
            case 'Profile':
              IconComponent = User;
              break;
            default:
              IconComponent = Home;
          }

          return IconComponent ? (
            <IconComponent color={color} size={size} />
          ) : null;
        },
        tabBarActiveTintColor: '#0088B1',
        tabBarInactiveTintColor: '#B0B6B8',
        headerShown: false,
        fontFamily: Fonts.JakartaRegular,
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 5,
          position: 'absolute',
          backgroundColor: '#E8F4F7',
          height: 70,
        },
        tabBarLabel: route.name === 'Menu' ? () => null : undefined,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        listeners={{
          focus: () => setcurrentScreen('Home'),
        }}
      />
      <Tab.Screen
        name="Pharmacy"
        component={PharmacyScreen}
        listeners={{
          focus: () => setcurrentScreen('Pharmacy'),
        }}
      />
      <Tab.Screen name="Menu" component={EmptyScreen} />
      <Tab.Screen name="Homecare" component={EmptyScreen} />
      <Tab.Screen name="Profile" component={EmptyScreen} />
    </Tab.Navigator>
  );
}
