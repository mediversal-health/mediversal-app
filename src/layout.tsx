/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import {Bell, ChevronDown, Mic, Search, ShoppingBag} from 'lucide-react-native';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BottomTabNavigator from './navigation/BottomTabBarNavigation';
import CustomDrawer from './components/common/CustomDrawer';

const layout = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingBottom: 10,
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
                gap: 90,
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
            {' '}
            Get Medicine reminderds and other updates{' '}
          </Text>
          <View style={{flexDirection: 'row', gap: 3}}>
            {' '}
            <Text style={{fontSize: 12, marginLeft: 5}}>
              via notification
            </Text>{' '}
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>
                View More{' '}
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
      <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#e8f4f7',
            borderRadius: 12,
            paddingVertical: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#ccc',
            justifyContent: 'space-between',
          }}
          //  onPress={handleNavigate}
        >
          {' '}
          <View style={{flexDirection: 'row', gap: 5}}>
            <Search color={'#0088B1'} size={20} />
            <Text style={{color: '#999'}}>
              Search for <Text style={{color: '#0088B1'}}>Medicines</Text>{' '}
            </Text>
          </View>
          <Mic color={'#0088B1'} />
        </TouchableOpacity>
      </View>

      <BottomTabNavigator />

      {drawerVisible && (
        <CustomDrawer onClose={() => setDrawerVisible(false)} />
      )}
    </SafeAreaView>
  );
};

export default layout;
