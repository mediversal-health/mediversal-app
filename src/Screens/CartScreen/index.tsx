/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './index.styles';
import {
  Percent,
  ChevronRight,
  Truck,
  Wallet,
  Search,
  ChevronLeft,
  ShoppingBag,
} from 'lucide-react-native';
// import navigation from '../../navigation';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CartItemCard from '../../components/cards/CartItemCard';
import BillSummaryCard from '../../components/cards/BillSummaryCard';
import OtherDetailsCard from '../../components/cards/OtherDetailsCard';
import LocationModal from '../../components/ui/LocationModal';
import {RootStackParamList} from '../../navigation';
import NavigationImg from './assets/svgs/navigation.svg';

const CartPage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const route = useRoute<RouteProp<RootStackParamList, 'CartPage'>>();
  const formData = route.params?.formData;

  const pincode = formData?.pincode?.trim();
  const area = formData?.areaDetails?.trim();
  const landmark = formData?.landmark?.trim();

  const isValidAddress = pincode && area && landmark;

  const formattedAddress = isValidAddress
    ? `${pincode} - ${area}, ${landmark}`
    : '';
  console.log(formattedAddress);

  const showLocationModal = () => {
    setLocationModalVisible(true);
  };
  const hideLocationModal = () => {
    setLocationModalVisible(false);
  };

  const handleSelectCurrentLocation = () => {
    navigation.navigate('LocationMapScreen');
    hideLocationModal();
  };

  const handleEnterManually = () => {
    navigation.navigate('AddressBookScreen', {
      location: {
        title: '',
        address: '',
      },
    });
    hideLocationModal();
  };
  const [selectedRadio, setSelectedRadio] = useState(false);
  const medicines = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      quantity: 1,
      mrp: 99,
      price: 79,
      imageUrl:
        'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/29022d224cb249a98378af4a1b220191.jpg',
    },
    {
      id: 2,
      name: 'Vitamin C Tablets',
      quantity: 1,
      mrp: 150,
      price: 120,
      imageUrl:
        'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/29022d224cb249a98378af4a1b220191.jpg',
    },
    {
      id: 3,
      name: 'Cough Syrup 100ml',
      quantity: 2,
      mrp: 200,
      price: 160,
      imageUrl:
        'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/29022d224cb249a98378af4a1b220191.jpg',
    },
  ];

  return (
    <>
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={20} color="#0088B1" />
          </TouchableOpacity>
          <View style={styles.headerRightIcons}>
            <TouchableOpacity style={styles.iconSpacing}>
              <Search size={20} color="#161D1F" />
            </TouchableOpacity>
            <TouchableOpacity>
              <ShoppingBag size={20} color="#161D1F" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {formattedAddress.trim() !== '' && (
            <View style={styles.container}>
              <View
                style={{
                  backgroundColor: '#E8F4F7',
                  padding: 20,
                  flexDirection: 'row',
                  gap: 15,
                }}>
                <NavigationImg />
                <View style={{flexDirection: 'column'}}>
                  <Text style={{color: '#899193', fontSize: 10}}>
                    Deliver to {formData?.recipient}
                  </Text>
                  <Text style={{fontSize: 12}}>{formattedAddress}</Text>
                </View>
              </View>
            </View>
          )}
          {/* Apply Coupon Strip */}
          <LinearGradient
            colors={['#F8F8F8', '#FE90E2']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.couponStrip}>
            <View style={styles.couponLeft}>
              <Percent size={16} color="#000" style={styles.icon} />
              <Text style={styles.couponText}>Apply Coupon</Text>
            </View>
            <ChevronRight size={16} color="#000" />
          </LinearGradient>

          {/* Delivery Info */}
          <View style={styles.deliveryRow}>
            <Truck size={18} color="#000" style={styles.icon} />
            <Text style={styles.deliveryText}>By Sun, 11 May</Text>
          </View>
          {medicines.map(item => (
            <CartItemCard
              key={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
              quantity={item.quantity}
              mrp={item.mrp}
              price={item.price}
            />
          ))}

          {/* MediCash Card */}
          <View style={styles.mediCashCard}>
            <View style={styles.mediCashLeft}>
              <Wallet size={20} color="#B0B6B8" style={styles.icon} />
              <Text style={styles.mediCashText}>Use MediCash</Text>
            </View>
            <TouchableOpacity
              onPress={() => setSelectedRadio(!selectedRadio)}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.radioLabel, {marginRight: 8}]}>0MCs</Text>
              <View
                style={[
                  styles.radioCircle,
                  selectedRadio && {borderColor: '#0088B1'},
                ]}>
                {selectedRadio && <View style={styles.selectedDot} />}
              </View>
            </TouchableOpacity>
          </View>

          {/* Bill Summary Label */}
          <Text style={styles.billSummaryLabel}>Bill Summary</Text>
          <BillSummaryCard
            originalPrice={599}
            finalPrice={574}
            details={{
              cartTotal: 599,
              couponDiscount: 25,
              handlingFee: 5,
              platformFee: 0,
              deliveryCharges: 0,
            }}
          />
          <OtherDetailsCard />
        </ScrollView>

        {/* Sticky Bottom Section */}
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.amountLabel}>Amount to pay:</Text>
            <Text style={styles.amountText}>₹574</Text>
          </View>
          {formattedAddress.trim() !== '' ? (
            <TouchableOpacity style={styles.addressButton}>
              <Text style={styles.addressButtonText}>Checkout</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addressButton}
              onPress={showLocationModal}>
              <Text style={styles.addressButtonText}>Select / Add Address</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <LocationModal
        isVisible={isLocationModalVisible}
        onClose={hideLocationModal}
        onSelectCurrentLocation={handleSelectCurrentLocation}
        onEnterManually={handleEnterManually}
      />
    </>
  );
};

export default CartPage;
