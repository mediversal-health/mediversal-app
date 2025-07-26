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
import FaceCleanserSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import MoisturizerSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import SunscreenSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import TonerSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import SerumSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import {useAuthStore} from '../../store/authStore';
import {useToastStore} from '../../store/toastStore';
import {getProductsById} from '../../Services/pharmacy';
import {addToCart} from '../../Services/cart';
import {useCartStore} from '../../store/cartStore';
import {SvgProps} from 'react-native-svg';
import ConsultDoctorBanner from '../../components/Banners/ConsultDoctorBanner';
import HeartPlus from './assets/svgs/heart-plus.svg';

import CoughSyrupSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg'; // Example - add your actual SVGs
import LozengesSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import VaporubSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import NasalSpraySvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import InhalerSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import ImmunityBoosterSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import SteamInhalerSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import AntacidSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import PainRelieverSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import RehydrationSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import BurnCreamSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import NasalDecongestantSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
import JointPainRelieverSvg from '../BrandFilterScreen/assets/svgs/cetaphil-skin-cleanser-1 1.svg';
const CategoryFilterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const {subCategory_name, svgImage} = route.params as {
    subCategory_name: string;
    svgImage: React.FC<SvgProps>;
  };
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const customer_id = useAuthStore(state => state.customer_id);
  const showToast = useToastStore(state => state.showToast);

  const {setUserCart} = useCartStore.getState();
  const {cardProducts, getOriginalProduct} = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState<
    ProductCardProps['product'][]
  >([]);
  console.log(filteredProducts);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const filtered = cardProducts.filter(
          product => product.SubCategory === subCategory_name,
        );
        setFilteredProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductsByCategory();
  }, []);
  const productTypesMap: Record<
    string,
    Array<{label: string; SvgComponent: React.FC<SvgProps>}>
  > = {
    'Cold & Cough': [
      {label: 'Cough Syrups', SvgComponent: CoughSyrupSvg},
      {label: 'Lozenges', SvgComponent: LozengesSvg},
      {label: 'Vaporubs', SvgComponent: VaporubSvg},
      {label: 'Nasal Sprays', SvgComponent: NasalSpraySvg},
      {label: 'Inhalers', SvgComponent: InhalerSvg},
      {label: 'Immunity Boosters', SvgComponent: ImmunityBoosterSvg},
      {label: 'Steam Inhalers', SvgComponent: SteamInhalerSvg},
    ],
    Acidity: [
      {label: 'Antacids', SvgComponent: AntacidSvg},
      {label: 'PPIs', SvgComponent: AntacidSvg},
      {label: 'H2 Blockers', SvgComponent: AntacidSvg},
    ],
    Headache: [
      {label: 'Pain Relievers', SvgComponent: PainRelieverSvg},
      {label: 'Migraine Relief', SvgComponent: PainRelieverSvg},
    ],
    'Muscle Cramps': [
      {label: 'Muscle Relaxants', SvgComponent: PainRelieverSvg},
      {label: 'Pain Relief Creams', SvgComponent: PainRelieverSvg},
    ],
    Dehydration: [
      {label: 'ORS Solutions', SvgComponent: RehydrationSvg},
      {label: 'Electrolyte Powders', SvgComponent: RehydrationSvg},
    ],
    'Burn Care': [
      {label: 'Burn Creams', SvgComponent: BurnCreamSvg},
      {label: 'Antiseptic Creams', SvgComponent: BurnCreamSvg},
    ],
    'Blocked Nose': [
      {label: 'Nasal Decongestants', SvgComponent: NasalDecongestantSvg},
      {label: 'Nasal Sprays', SvgComponent: NasalSpraySvg},
    ],
    'Joint Pain': [
      {label: 'Pain Relief Gels', SvgComponent: JointPainRelieverSvg},
      {label: 'Oral Pain Relievers', SvgComponent: JointPainRelieverSvg},
    ],

    default: [
      {label: 'Face Cleanser', SvgComponent: FaceCleanserSvg},
      {label: 'Moisturizer', SvgComponent: MoisturizerSvg},
      {label: 'Sunscreen', SvgComponent: SunscreenSvg},
      {label: 'Toner', SvgComponent: TonerSvg},
      {label: 'Serum', SvgComponent: SerumSvg},
    ],
  };

  const productTypes =
    productTypesMap[subCategory_name] || productTypesMap.default;
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
  const handleProductPress = (cardProduct: ProductCardProps['product']) => {
    const originalProduct = getOriginalProduct(cardProduct.id);
    navigation.navigate('UploadScreen', {
      product: originalProduct,
    });
  };
  const renderProduct = ({item}: {item: ProductCardProps['product']}) => (
    <TouchableOpacity
      style={{margin: 5}}
      onPress={() => handleProductPress(item)}>
      <ProductCard
        product={item}
        onAddToCart={handleAddToCart}
        addingToCart={addingToCart === item.id}
      />
    </TouchableOpacity>
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
          <Text style={styles.headerTitle}>{subCategory_name} Products</Text>
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
        <ConsultDoctorBanner
          Header={`${subCategory_name} Relief`}
          subTittle="Get fast relief from symptoms"
          SvgImage={svgImage}
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
          data={filteredProducts.filter(item => item.active)}
          renderItem={renderProduct}
          keyExtractor={item => `horizontal-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{padding: 5}}
        />
        <View style={{paddingHorizontal: 12}}>
          <View
            style={{
              backgroundColor: '#F0FDF4',
              borderWidth: 1,
              borderColor: '#E5E8E9',
              borderRadius: 8,
              padding: 14,
              flexDirection: 'row',
              gap: 10,
            }}>
            <HeartPlus />
            <View>
              <Text
                style={{
                  fontFamily: Fonts.JakartaBold,
                  fontSize: 14,
                  color: '#50B57F',
                }}>
                Health Tip
              </Text>
              <View>
                <Text
                  style={{
                    fontFamily: Fonts.JakartaBold,
                    fontSize: 10,
                    color: '#50B57F',
                  }}>
                  Stay hydrated and get plenty of rest.
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.JakartaBold,
                    fontSize: 10,
                    color: '#50B57F',
                  }}>
                  Consult a doctor if symptoms persist for more than 7 days.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <LinearGradient
          colors={['#FFE3C1', '#FFFFFF']}
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
            data={filteredProducts.filter(
              product =>
                product.type === selectedProductType &&
                product.SubCategory === subCategory_name &&
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

export default CategoryFilterScreen;
