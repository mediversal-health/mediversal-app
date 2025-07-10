/* eslint-disable react-native/no-inline-styles */
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ShoppingBag } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../../../store/authStore';
import { useCartStore } from '../../../store/cartStore';
import { RootStackParamList } from '../../../navigation';
import { Fonts } from '../../../styles/fonts';
import { useEffect, useState } from 'react';

const CartIconWithBadge = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const customer_id = useAuthStore(state => state.customer_id);
  const [totalItems, setTotalItems] = useState(0);
  const cartStore = useCartStore();

  useEffect(() => {
    const cartItems = cartStore.getUserCart(
      customer_id ? String(customer_id) : '',
    );
    setTotalItems(cartItems.reduce((total, item) => total + item.quantity, 0));

    const unsubscribe = cartStore.subscribe(() => {
      const updatedCartItems = cartStore.getUserCart(
        customer_id ? String(customer_id) : '',
      );
      const newTotal = updatedCartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      setTotalItems(newTotal);
    });

    return () => unsubscribe();
  }, [customer_id, cartStore]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CartPage', {})}
      style={{ position: 'relative' }}>
      <ShoppingBag size={20} />
      {totalItems > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -8,
            right: -8,
            backgroundColor: '#FF4444',
            borderRadius: 10,
            minWidth: 18,
            height: 18,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 4,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 10,
              fontFamily: Fonts.JakartaBold,
              textAlign: 'center',
            }}>
            {totalItems > 99 ? '99+' : totalItems}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartIconWithBadge;
