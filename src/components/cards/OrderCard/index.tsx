import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BackgroundSVG from '../../../assests/svgs/Looper-1.svg';
import CartSVG from './assests/svgs/pharmacy-icon.svg';
import styles from './index.styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation';
const OrderNowCard = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.cardContainer}>
      <View style={styles.backgroundSVG}>
        <BackgroundSVG width={331.96} height={321.81} strokeWidth={2} />
      </View>

      <View style={styles.discountBanner}>
        <Text style={styles.discountText}>Save 25% on Medicines</Text>
      </View>

      <View style={styles.textContent}>
        <Text style={styles.heading}>Stay Healthy,</Text>
        <Text style={styles.heading}>Stay Happy</Text>
        <Text style={styles.subText}>Orders medicines easily from home</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AllProducts')}>
          <Text style={styles.buttonText}>Order Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cartSVG}>
        <CartSVG width={122} height={217} strokeWidth={2} />
      </View>
    </View>
  );
};

export default OrderNowCard;
