import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';
import MedicineDetail from '../../components/cards/MedicineDetails';
import GuaranteeCards from '../../components/cards/GuaranteeCards';
import ProductInfo from '../../components/cards/ProductInformation/ProductInfo';
import CheaperAlternative from '../../components/cards/CheaperAlternative';
import {Search, ChevronLeft, Clock} from 'lucide-react-native';
import {styles} from './index.style';
import ProductCard from '../../components/cards/ProductCard';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {addToCart} from '../../Services/cart';
import {useAuthStore} from '../../store/authStore';
import {Product} from '../../types';
import {useCartStore} from '../../store/cartStore';
import {useToastStore} from '../../store/toastStore';
import CartIconWithBadge from '../../components/ui/CartIconWithBadge';
import useProductStore from '../../store/productsStore';
import {StackNavigationProp} from '@react-navigation/stack';

type UploadScreenRouteProp = RouteProp<RootStackParamList, 'UploadScreen'>;

const UploadScreen = ({route}: {route: UploadScreenRouteProp}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {product} = route.params;
  const {cardProducts} = useProductStore();
  const customer_id = useAuthStore(state => state.customer_id);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const {setUserCart} = useCartStore.getState();
  const showToast = useToastStore(state => state.showToast);

  const handleAddToCart = async (item: Product) => {
    try {
      setAddingToCart(item?.productId?.toString() ?? null);

      const currentQuantity = useCartStore
        .getState()
        .getProductQuantity(
          customer_id?.toString() ?? '',
          item?.productId ?? 0,
        );
      const newQuantity = currentQuantity + 1;

      const productData = {
        ...item,
        quantity: newQuantity,
      };

      const cartResponse = await addToCart(customer_id, productData as Product);
      if (cartResponse.success && cartResponse.cart) {
        setUserCart(customer_id?.toString() ?? '', cartResponse.cart);
      }

      useCartStore
        .getState()
        .setProductQuantity(
          customer_id?.toString() ?? '',
          item?.productId ?? 0,
          newQuantity,
        );

      showToast(
        `${product?.ProductName || 'Product'} added to cart!`,
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
  const handleProductPress = (item: any) => {
    navigation.push('UploadScreen', {product: item});
  };

  const cheaperAlternativeItems = product?.substitutes?.length
    ? product.substitutes.map(substitute => {
        const fullProduct = cardProducts.find(
          p => p.id === substitute.productId.toString(),
        );
        return fullProduct ? fullProduct._originalProduct : substitute;
      })
    : cardProducts.filter(
        item =>
          item.Composition === product?.Composition &&
          Number(item.id) !== product?.productId,
      );

  const relatedProductItems = product?.similarProducts?.length
    ? product.similarProducts.map(similarProd => {
        const fullProduct = cardProducts.find(
          p => p.id === similarProd.productId.toString(),
        );
        return fullProduct ? fullProduct._originalProduct : similarProd;
      })
    : cardProducts.filter(
        item =>
          item.Composition === product?.Composition &&
          Number(item.id) !== product?.productId,
      );

  const renderProductCard = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        onPress={() => handleProductPress(item)}
        style={styles.productCard}>
        <ProductCard
          product={{
            id: item.productId?.toString() || item.id,
            name: item.ProductName || item.name,
            description: item.ProductInformation || item.description,
            quantity: `Available: ${
              item.StockAvailableInInventory || item.StockAvailableInInventory
            }`,
            delivery: 'Delivery in 2-3 days',
            originalPrice: parseFloat(item.CostPrice || item.originalPrice),
            sellingPrice: parseFloat(item.SellingPrice || item.sellingPrice),
            discountPercentage: parseFloat(
              item.DiscountedPercentage || item.discountPercentage,
            ),
            Category: item.Category,
            SubCategory: item.Subcategory || item.SubCategory,
            ProductStrength: item.ProductStrength,
            PackageSize: item.PackageSize,
            image: item.images?.[0] || item.image,
            manufacturer_name: item.ManufacturerName || item.manufacturer_name,
            type: item.Type || item.type,
            PrescriptionRequired: item.PrescriptionRequired,
            Composition: item.Composition,
            StockAvailableInInventory: item.StockAvailableInInventory,
          }}
          onAddToCart={() => handleAddToCart(item._originalProduct || item)}
          borderColor={'#2D9CDB'}
          buttonColor={'#2D9CDB'}
          backgroundColor={'#E8F4F7'}
        />
      </TouchableOpacity>
    );
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
            <TouchableOpacity
              style={styles.iconSpacing}
              onPress={() => navigation.navigate('GlobalSearchScreen')}>
              <Search size={20} color="#161D1F" strokeWidth={1} />
            </TouchableOpacity>
            <CartIconWithBadge />
          </View>
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <MedicineDetail
              images={product?.images ?? []}
              productId={product?.productId}
              rating={4.5}
              name={product?.ProductName}
              packInfo={`${product?.ProductStrength} ${product?.PackageSize}`}
              saltComposition={product?.Composition}
              currentPrice={`₹ ${product?.SellingPrice}`}
              originalPrice={product?.CostPrice}
              discount={product?.DiscountedPercentage + '% Off'}
              deliveryTime="Get by 9pm, Tomorrow"
              onAddToCart={() => handleAddToCart(product)}
              isAddingToCart={addingToCart === product?.productId?.toString()}
              prescriptionRequired={product?.PrescriptionRequired}
              StockAvailableInInventory={product?.StockAvailableInInventory}
            />

            {cheaperAlternativeItems.length > 0 && (
              <View style={styles.cheaperAlternativeContainer}>
                <CheaperAlternative discountPercentage={5}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {cheaperAlternativeItems
                      .filter(item => item.active)
                      ?.map(item => (
                        <View key={item.id}>{renderProductCard({item})}</View>
                      ))}
                  </ScrollView>
                </CheaperAlternative>
              </View>
            )}

            <View style={styles.guaranteeSection}>
              <GuaranteeCards />
            </View>

            <ProductInfo product={product} />
            <View style={{marginVertical: 10}} />

            {(relatedProductItems?.length ?? 0) > 0 && (
              <>
                <Text style={styles.relatedProductsHeading}>
                  {product?.similarProducts?.length
                    ? 'Similar Products'
                    : 'Related Products'}
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.productCardsContainer}>
                  {relatedProductItems
                    ?.filter(item => item.active)
                    .map(item => (
                      <View key={item.id || item.productId}>
                        {renderProductCard({item})}
                      </View>
                    ))}
                </ScrollView>
              </>
            )}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.reminderButton}>
            <Clock size={18} color="#0088B1" />
            <Text style={styles.reminderButtonText}>Set Reminder</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default UploadScreen;
