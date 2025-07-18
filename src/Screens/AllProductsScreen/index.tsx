/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {
  ChevronLeft,
  Filter,
  ChevronDown,
  Lock,
  ArrowUpDown,
} from 'lucide-react-native';
import {useFocusEffect} from '@react-navigation/native';
import ProductCard from '../../components/cards/ProductCard';
import SearchBar from '../../components/common/SearchBar';
import {ProductCardProps} from '../../types';
import styles from './index.styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import useProductStore from '../../store/productsStore';
import FilterBottomSheet from '../../components/modal/FilterBottomSheet';
import {getProductsById} from '../../Services/pharmacy';
import {addToCart} from '../../Services/cart';
import {useAuthStore} from '../../store/authStore';
import {useToastStore} from '../../store/toastStore';
import CartIconWithBadge from '../../components/ui/CartIconWithBadge';
import {useCartStore} from '../../store/cartStore';
import {useFilterStore} from '../../store/filterStore';
import {filterProducts} from '../../utils/functions';
import AllMedicines from './assets/svgs/Product Image.svg';
import OTC from './assets/svgs/Product Image (2).svg';
import Prescription from './assets/svgs/Product Image (3).svg';
import Suppliments from './assets/svgs/Product Image (4).svg';
import MedicalDevices from './assets/svgs/Product Image (5).svg';
import Surgical from './assets/svgs/Product Image (6).svg';
import Vaccines from './assets/svgs/Product Image (7).svg';
import PersonalCare from './assets/svgs/Product Image (8).svg';
import SexualHealth from './assets/svgs/Product Image (9).svg';
import MotherBabyChild from './assets/svgs/Product Image (12).svg';
import SeniorLiving from './assets/svgs/Product Image (10).svg';
import SeasonalNeeds from './assets/svgs/Product Image (11).svg';
interface Category {
  id: string;
  name: string;
  icon: string | React.ReactElement;
}

const AllProductsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({});

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // const [filteredProducts, setFilteredProducts] = useState<
  //   ProductCardProps['product'][] | null
  // >(null);
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('Sort');
  const {setUserCart} = useCartStore.getState();
  const {cardProducts, getOriginalProduct, originalProducts} =
    useProductStore();
  const {filteredProducts, setFilteredProducts} = useFilterStore();
  const customer_id = useAuthStore(state => state.customer_id);
  const showToast = useToastStore(state => state.showToast);
  console.log('card', cardProducts);
  const handleProductPress = (cardProduct: ProductCardProps['product']) => {
    const originalProduct = getOriginalProduct(cardProduct.id);
    navigation.navigate('UploadScreen', {
      product: originalProduct,
    });
  };

  // Add the handleAddToCart function from PharmacyScreen
  const handleAddToCart = async (productId: string, quantity: number) => {
    try {
      setAddingToCart(productId);
      const numericProductId = parseInt(productId, 10);

      const productResponse = await getProductsById(numericProductId);
      const productData = {
        ...productResponse.data,
        quantity: quantity || 1,
      };

      const cartResponse = await addToCart(customer_id, productData);
      console.log('Product added to cart successfully:', cartResponse);
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

  console.log(cardProducts);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const categories: Category[] = [
    {
      id: '1',
      name: 'All',
      icon: <AllMedicines width={60} height={60} />,
    },
    {
      id: '2',
      name: 'OTC',
      icon: <OTC width={60} height={60} />,
    },
    {
      id: '3',
      name: 'PRESCRIPTION',
      icon: <Prescription width={60} height={60} />,
    },
    {
      id: '4',
      name: 'SUPPLEMENTS',
      icon: <Suppliments width={60} height={60} />,
    },
    {
      id: '5',
      name: 'DEVICES',
      icon: <MedicalDevices width={60} height={60} />,
    },
    {
      id: '6',
      name: 'SURGICAL CARE',
      icon: <Surgical width={60} height={60} />,
    },
    {
      id: '7',
      name: 'VACCINES ',
      icon: <Vaccines width={60} height={60} />,
    },
    {
      id: '8',
      name: 'PERSONAL CARE',
      icon: <PersonalCare width={60} height={60} />,
    },
    {
      id: '9',
      name: 'SEXUAL WELLNESS',
      icon: <SexualHealth width={60} height={60} />,
    },
    {
      id: '10',
      name: 'MOTHER & BABY',
      icon: <MotherBabyChild width={60} height={60} />,
    },
    {
      id: '11',
      name: 'SENIOR CARE',
      icon: <SeniorLiving width={60} height={60} />,
    },

    {
      id: '13',
      name: 'SEASONAL NEEDS',
      icon: <SeasonalNeeds width={60} height={60} />,
    },
  ];
  useFocusEffect(
    React.useCallback(() => {
      setSelectedCategory('All');
      setFilteredProducts(null);
      setSelectedFilters({});

      setSelectedSortOption('Sort');
    }, []),
  );
  const renderProduct = ({item}: {item: ProductCardProps['product']}) => (
    <TouchableOpacity
      onPress={() => handleProductPress(item)}
      style={styles.productCardContainer}>
      <ProductCard
        product={item}
        borderColor={'#2D9CDB'}
        buttonColor={'#2D9CDB'}
        backgroundColor={'#E8F4F7'}
        onAddToCart={handleAddToCart}
        addingToCart={addingToCart === item.id}
      />
    </TouchableOpacity>
  );
  console.log(originalProducts, 'originalProducts in AllProductsScreen');
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);

    setSelectedSortOption('Sort');

    const updatedFiltered = filterProducts(
      cardProducts,
      categoryName,
      selectedFilters,
    );
    setFilteredProducts(updatedFiltered);
  };
  console.log(filteredProducts, 'filteredProducts all');

  const renderCategory = ({item}: {item: Category}) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.name && styles.selectedCategory,
      ]}
      onPress={() => handleCategorySelect(item.name)}>
      <View style={styles.iconContainer}>
        {typeof item.icon === 'string' ? (
          <Image source={{uri: item.icon}} style={styles.categoryIcon} />
        ) : (
          <View style={styles.svgIconWrapper}>{item.icon}</View>
        )}
      </View>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.name && styles.selectedCategoryText,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const sortProducts = (option: string) => {
    const sorted = [...cardProducts];

    switch (option) {
      case 'Price: Low to High':
        sorted.sort((a, b) => a.sellingPrice - b.sellingPrice);
        break;
      case 'Price: High to Low':
        sorted.sort((a, b) => b.sellingPrice - a.sellingPrice);
        break;
      case 'Relevance':
      default:
        sorted.sort((a, b) => a.id.localeCompare(b.id));
        break;
    }

    useProductStore.setState({cardProducts: sorted});
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.header}>
          <View style={{flexDirection: 'row', gap: 5}}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              testID="back-button">
              <ChevronLeft size={20} color="#0088B1" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>All Products</Text>
          </View>
          <CartIconWithBadge />
        </View>

        <View style={styles.mainContent}>
          <View style={styles.sidebar}>
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={styles.productContainer}>
            <View style={styles.searchBarContainer}>
              <SearchBar />

              <View style={styles.iconWrapper}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setShowFilters(true)}>
                  <Filter size={14} color="#000" />
                  <Text style={styles.iconLabel}>Filter</Text>
                  <ChevronDown size={14} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setSortDropdownVisible(prev => !prev)}>
                  {/* Conditionally render the icon based on selected option */}
                  {selectedSortOption === 'Sort' ||
                  selectedSortOption === 'Relevance' ? (
                    <ArrowUpDown size={14} color="#000" />
                  ) : (
                    <Lock size={14} color="#000" />
                  )}
                  <Text style={styles.iconLabel}>{selectedSortOption}</Text>
                  <ChevronDown size={14} color="#000" />
                </TouchableOpacity>

                {sortDropdownVisible && (
                  <View style={styles.dropdown}>
                    {[
                      'Relevance',
                      'Price: Low to High',
                      'Price: High to Low',
                      'Discount',
                    ].map(option => (
                      <TouchableOpacity
                        key={option}
                        style={styles.dropdownOption}
                        onPress={() => {
                          setSelectedSortOption(option);
                          setSortDropdownVisible(false);
                          sortProducts(option);
                        }}>
                        {option === 'Price: Low to High' ||
                        option === 'Price: High to Low' ||
                        option === 'Discount' ? (
                          <Lock size={16} color="#000" />
                        ) : (
                          <ArrowUpDown size={16} color="#0088B1" />
                        )}
                        {option === 'Relevance' ? (
                          <Text style={{marginLeft: 6, color: '#0088B12'}}>
                            {option}
                          </Text>
                        ) : (
                          <Text style={{marginLeft: 6}}>{option}</Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
            <FlatList
              data={filteredProducts ?? cardProducts}
              renderItem={renderProduct}
              keyExtractor={item => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.productList}
              columnWrapperStyle={styles.columnWrapper}
            />
          </View>
        </View>
        <FilterBottomSheet
          visible={showFilters}
          onClose={() => setShowFilters(false)}
          onApply={filtered => setFilteredProducts(filtered)}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          selectedCategory={selectedCategory}
        />
      </SafeAreaView>
    </>
  );
};

export default AllProductsScreen;
