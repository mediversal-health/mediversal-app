/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState} from 'react';
import {
  View,
  Text as RNText,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import MedicineDetail from '../../components/cards/MedicineDetails';
import GuaranteeCards from '../../components/cards/GuaranteeCards';
import ProductInfo from '../../components/cards/ProductInformation/ProductInfo';
import CheaperAlternative from '../../components/cards/CheaperAlternative';
import {Clock, Search, ChevronLeft, ShoppingBag} from 'lucide-react-native';
import {styles} from './index.style';
import ProductCard from '../../components/cards/ProductCard';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {addToCart} from '../../Services/cart';
import {useAuthStore} from '../../store/authStore';
import {Product} from '../../types';
import {useCartStore} from '../../store/cartStore';

const medicineImages = [
  {
    uri: 'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/29022d224cb249a98378af4a1b220191.jpg',
  },
  {
    uri: 'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/f1745262e65c4f50af6f84563f620847.jpg',
  },
  {
    uri: 'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/27f73dcc240841458f7715501428eff7.jpg',
  },
  {
    uri: 'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/6fe50245c5a64d258f3d6ca7622b3546.jpg',
  },
];

const products = [
  {
    id: '123',
    name: 'Lacto Calamine SPF 50',
    description: 'PA+++ UVA/UVB\nSunscreen Lotion. 50gm',
    quantity: 'Tube · 50 gm',
    delivery: 'By Sun, 13 Apr',
    originalPrice: 499,
    discountedPrice: 349,
    discountPercentage: 30,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    onAddToCart: (id: string, quantity: number) => {
      console.log(`Product ${id} added to cart: ${quantity} items`);
    },
  },
  {
    id: '124',
    name: 'Lacto Calamine SPF 50',
    description: 'PA+++ UVA/UVB\nSunscreen Lotion. 50gm',
    quantity: 'Tube · 50 gm',
    delivery: 'By Sun, 13 Apr',
    originalPrice: 499,
    discountedPrice: 349,
    discountPercentage: 30,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    onAddToCart: (id: string, quantity: number) => {
      console.log(`Product ${id} added to cart: ${quantity} items`);
    },
  },
  {
    id: '125',
    name: 'Lacto Calamine SPF 50',
    description: 'PA+++ UVA/UVB\nSunscreen Lotion. 50gm',
    quantity: 'Tube · 50 gm',
    delivery: 'By Sun, 13 Apr',
    originalPrice: 499,
    discountedPrice: 349,
    discountPercentage: 30,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    onAddToCart: (id: string, quantity: number) => {
      console.log(`Product ${id} added to cart: ${quantity} items`);
    },
  },
];

type UploadScreenRouteProp = RouteProp<RootStackParamList, 'UploadScreen'>;

const UploadScreen = ({route}: {route: UploadScreenRouteProp}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {product} = route.params;
  const customer_id = useAuthStore(state => state.customer_id);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const handleAddToCart = async () => {
    try {
      setAddingToCart(product?.productId?.toString() ?? null);

      // Get current quantity from store
      const currentQuantity = useCartStore
        .getState()
        .getProductQuantity(
          customer_id?.toString() ?? '',
          product?.productId ?? 0,
        );
      const newQuantity = currentQuantity + 1;

      const productData = {
        ...product,
        quantity: newQuantity,
      };

      const cartResponse = await addToCart(customer_id, productData as Product);
      console.log('Product added to cart successfully:', cartResponse);

      useCartStore
        .getState()
        .setProductQuantity(
          customer_id?.toString() ?? '',
          product?.productId ?? 0,
          newQuantity,
        );

      Alert.alert(
        'Success',
        `${
          productData.ProductName || 'Product'
        } has been added to your cart! (Quantity: ${newQuantity})`,
        [{text: 'OK'}],
      );
    } catch (error) {
      console.error('Error adding product to cart:', error);
      Alert.alert('Error', 'Failed to add product to cart. Please try again.', [
        {text: 'OK'},
      ]);
    } finally {
      setAddingToCart(null);
    }
  };
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
            <TouchableOpacity
              onPress={() => navigation.navigate('CartPage', {})}>
              <ShoppingBag size={20} color="#161D1F" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <MedicineDetail
              images={medicineImages}
              productId={product?.productId}
              rating={4.5}
              name={product?.ProductName}
              packInfo="Strip of 10 Tablets"
              saltComposition="Paracetamol (650mg)"
              currentPrice="₹ 165"
              originalPrice="₹ 195"
              discount="15% OFF"
              deliveryTime="Get by 9pm, Tomorrow"
              onAddToCart={handleAddToCart}
              isAddingToCart={!!addingToCart}
            />
            <View style={styles.cheaperAlternativeContainer}>
              <CheaperAlternative discountPercentage={5}>
                <View style={styles.productCardsContainer}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.productCardsContainer}>
                    {products.map(product => (
                      <View key={product.id} style={styles.productCard}>
                        <ProductCard
                          product={product}
                          onAddToCart={product.onAddToCart}
                          borderColor={'#2D9CDB'}
                          buttonColor={'#2D9CDB'}
                        />
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </CheaperAlternative>
            </View>
            {/* Guarantee cards positioned immediately below medicine details */}
            <View style={styles.guaranteeSection}>
              <GuaranteeCards />
            </View>

            <ProductInfo />

            {/* Related Products Section */}
            <RNText style={styles.relatedProductsHeading}>
              Related Products
            </RNText>
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.productCardsContainer}>
                {products.map(product => (
                  <View key={product.id} style={styles.productCard}>
                    <ProductCard
                      product={product}
                      onAddToCart={product.onAddToCart}
                      borderColor={'#2D9CDB'}
                      buttonColor={'#2D9CDB'}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>

        {/* Fixed bottom buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.reminderButton}>
            <Clock size={18} color="#0088B1" />
            <RNText style={styles.reminderButtonText}>Set Reminder</RNText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton}>
            <RNText style={styles.buyButtonText}>Buy Now</RNText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default UploadScreen;
