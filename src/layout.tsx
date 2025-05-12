/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import {Bell, ChevronDown, ChevronLeft, ShoppingBag} from 'lucide-react-native';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BottomTabNavigator from './navigation/BottomTabBarNavigation';
import CustomDrawer from './components/common/CustomDrawer';
import {useScreenStore} from './store/screenSelector';
import SearchBar from './components/common/CustomDrawer/SearchBar';
const layout = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const currentScreen = useScreenStore(state => state.currentScreen);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',

        //marginBottom: StatusBar.currentHeight,
      }}>
      <StatusBar
        backgroundColor="#0088B1" // Change to your desired color
        barStyle="light-content" // Options: 'default', 'light-content', 'dark-content'
        translucent={true}
      />

      {currentScreen === 'Home' ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingBottom: 10,
              marginTop: '11%',
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
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                  Delivering to
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                  }}>
                  <View style={{flexDirection: 'row', gap: 3}}>
                    <Text>Gandhi Maidan 800024</Text>
                    <ChevronDown size={20} />
                  </View>
                  <View style={{gap: 12, flexDirection: 'row'}}>
                    <Bell size={20} />
                    <ShoppingBag size={20} />
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
              <Text style={{fontSize: 12}}>
                Get Medicine reminderds and other updates{' '}
              </Text>
              <View style={{flexDirection: 'row', gap: 3}}>
                <Text style={{fontSize: 12, marginLeft: 5}}>
                  via notification
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
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
          <SearchBar />
        </>
      ) : currentScreen === 'Pharmacy' ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              marginTop: '11%',
              paddingBottom: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#e8f4f7',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ChevronLeft size={20} color="#0088B1" />
              </View>
              <Text style={{fontSize: 16}}>Pharmacy</Text>
            </View>
            <ShoppingBag size={20} />
          </View>
          <SearchBar />
        </>
      ) : null}
      <BottomTabNavigator />

      {drawerVisible && (
        <CustomDrawer onClose={() => setDrawerVisible(false)} />
      )}
    </SafeAreaView>
  );
};

export default layout;
