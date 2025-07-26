import {ChevronLeft, Search} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import styles from './index.styles';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import ProductCard from '../../components/cards/ProductCard';
import {Fonts} from '../../styles/fonts';
import CartIconWithBadge from '../../components/ui/CartIconWithBadge';

import useProductStore from '../../store/productsStore';
import {ProductCardProps} from '../../types';
import LinearGradient from 'react-native-linear-gradient';
import Chips from '../../components/ui/ProductTypeChips';
import CetaphilSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import BrandPromoBanner from '../../components/Banners/BrandPromoCard';

import AntibioticSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import PainRelieverSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import InhalerSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';

import HeartPlus from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import DiabetesSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import BrainSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';

import NutritionSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import BabySvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import LabTestSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';

import HerbalSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import WellnessSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import PersonalCareSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';

import ImmunityBoosterSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import HoneySvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import JuiceSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';

import MensHealthSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import WomensHealthSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import SexualHealthSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';

import AllProductsSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import BestSellerSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import NewArrivalSvg from './assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import {useAuthStore} from '../../store/authStore';
import {useToastStore} from '../../store/toastStore';
import {getProductsById} from '../../Services/pharmacy';
import {addToCart} from '../../Services/cart';
import {useCartStore} from '../../store/cartStore';
import {SvgProps} from 'react-native-svg';

const BrandFilterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const {brand_name} = route.params as {brand_name: string};
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const customer_id = useAuthStore(state => state.customer_id);
  const showToast = useToastStore(state => state.showToast);
  const {cardProducts} = useProductStore();
  const {setUserCart} = useCartStore.getState();
  const [filteredProducts, setFilteredProducts] = useState<
    ProductCardProps['product'][]
  >([]);
  console.log(filteredProducts);

  useEffect(() => {
    const fetchProductsByBrand = async () => {
      try {
        const filtered = cardProducts.filter(
          product => product.manufacturer_name === brand_name,
        );
        setFilteredProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductsByBrand();
  }, []);

  const brandProductTypesMap: Record<
    string,
    Array<{label: string; SvgComponent: React.FC<SvgProps>}>
  > = {
    Cipla: [
      {label: 'Antibiotics', SvgComponent: AntibioticSvg},
      {label: 'Pain Relief', SvgComponent: PainRelieverSvg},
      {label: 'Respiratory', SvgComponent: InhalerSvg},
    ],
    'Sun Pharma': [
      {label: 'Cardiac Care', SvgComponent: HeartPlus},
      {label: 'Diabetes', SvgComponent: DiabetesSvg},
      {label: 'Neuro Care', SvgComponent: BrainSvg},
    ],
    Abbott: [
      {label: 'Nutrition', SvgComponent: NutritionSvg},
      {label: 'Pediatrics', SvgComponent: BabySvg},
      {label: 'Diagnostics', SvgComponent: LabTestSvg},
    ],
    Himalaya: [
      {label: 'Ayurvedic', SvgComponent: HerbalSvg},
      {label: 'Wellness', SvgComponent: WellnessSvg},
      {label: 'Personal Care', SvgComponent: PersonalCareSvg},
    ],
    Dabur: [
      {label: 'Chyawanprash', SvgComponent: ImmunityBoosterSvg},
      {label: 'Honey', SvgComponent: HoneySvg},
      {label: 'Juices', SvgComponent: JuiceSvg},
    ],
    Mankind: [
      {label: "Men's Health", SvgComponent: MensHealthSvg},
      {label: "Women's Health", SvgComponent: WomensHealthSvg},
      {label: 'Sexual Wellness', SvgComponent: SexualHealthSvg},
    ],
    default: [
      {label: 'All Products', SvgComponent: AllProductsSvg},
      {label: 'Best Sellers', SvgComponent: BestSellerSvg},
      {label: 'New Arrivals', SvgComponent: NewArrivalSvg},
    ],
  };

  const productTypes =
    brandProductTypesMap[brand_name] || brandProductTypesMap.default;
  const [selectedProductType, setSelectedProductType] = useState<string>(
    productTypes[0].label,
  );
  const handleAddToCart = async (productId: string, quantity: number = 1) => {
    try {
      setAddingToCart(productId);
      const numericProductId = parseInt(productId, 10);

      const productResponse = await getProductsById(numericProductId);
      const productData = {
        ...productResponse.data,
        quantity: quantity,
      };

      const cartResponse = await addToCart(customer_id, productData);
      if (cartResponse.success && cartResponse.cart) {
        setUserCart(customer_id?.toString() ?? '', cartResponse.cart);
      }

      showToast(
        `${productData.name || 'Product'} added to cart!`,
        'success',
        1000,
        true,
      );
    } catch (error) {
      console.error('Error adding product to cart:', error);
      showToast('Failed to add product to cart', 'error');
    } finally {
      setAddingToCart(null);
    }
  };
  const renderProduct = ({item}: {item: ProductCardProps['product']}) => (
    <View style={{margin: 5}}>
      <ProductCard
        product={item}
        borderColor={'#2D9CDB'}
        buttonColor={'#2D9CDB'}
        backgroundColor={'#E8F4F7'}
        onAddToCart={handleAddToCart}
        addingToCart={addingToCart === item.id}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={20} color="#0088B1" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{brand_name} Products</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('GlobalSearchScreen')}>
            <Search size={20} color={'#899193'} strokeWidth={1.5} />
          </TouchableOpacity>
          <CartIconWithBadge />
        </View>
      </View>
      <ScrollView>
        <BrandPromoBanner
          discount="25% OFF"
          title="Summer Sale - All Skincare"
          validity="Valid till 30 Aug"
          SvgImage={CetaphilSvg}
        />
        <Text
          style={{
            fontFamily: Fonts.JakartaSemiBold,
            marginLeft: 10,
            marginTop: 10,
          }}>
          Recommended Products For You
        </Text>

        <FlatList
          data={cardProducts.filter(
            product =>
              product.manufacturer_name.includes(brand_name) && product.active,
          )}
          renderItem={renderProduct}
          keyExtractor={item => `horizontal-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{padding: 5}}
        />

        <LinearGradient
          colors={['#D9EAFF', '#FFFFFF']}
          locations={[0, 0.3, 1]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.gradientBox}>
          <Text
            style={{
              fontFamily: Fonts.JakartaSemiBold,
              marginLeft: 10,
              marginTop: 10,
            }}>
            Shop by product type
          </Text>

          <Chips
            items={productTypes}
            onItemPress={setSelectedProductType}
            selectedItem={selectedProductType}
          />

          <FlatList
            data={cardProducts.filter(
              product =>
                product.manufacturer_name === brand_name &&
                product.type === selectedProductType &&
                product.active,
            )}
            renderItem={renderProduct}
            keyExtractor={item => `horizontal-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{padding: 5}}
          />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BrandFilterScreen;
