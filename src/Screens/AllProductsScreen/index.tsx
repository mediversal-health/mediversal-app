/* eslint-disable react-native/no-inline-styles */
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import {
  ChevronLeft,
  Filter,
  ChevronDown,
  Lock,
  ArrowUpDown,
} from 'lucide-react-native';

import ProductCard from '../../components/cards/ProductCard';
import SearchBar from '../../components/common/SearchBar';
import { ProductCardProps } from '../../types';
import styles from './index.styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import useProductStore from '../../store/productsStore';
import FilterBottomSheet from '../../components/modal/FilterBottomSheet';
import { getProductsById } from '../../Services/pharmacy';
import { addToCart } from '../../Services/cart';
import { useAuthStore } from '../../store/authStore';
import { useToastStore } from '../../store/toastStore';
import CartIconWithBadge from '../../components/ui/CartIconWithBadge';
import { useCartStore } from '../../store/cartStore';
import { useFilterStore } from '../../store/filterStore';

interface Category {
  id: string;
  name: string;
  icon: string;
}

const AllProductsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchText, setSearchText] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // const [filteredProducts, setFilteredProducts] = useState<
  //   ProductCardProps['product'][] | null
  // >(null);
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('Sort');
  const { setUserCart } = useCartStore.getState();
  const { cardProducts, getOriginalProduct } = useProductStore();
  const { filteredProducts, setFilteredProducts } = useFilterStore();
  const customer_id = useAuthStore((state) => state.customer_id);
  const showToast = useToastStore((state) => state.showToast);
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
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '2',
      name: 'OTC',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '3',
      name: 'PRESCRIPTION (Rx)',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '4',
      name: 'VITAMINS, MINERALS & DIETARY SUPPLEMENTS',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '5',
      name: 'MEDICAL DEVICES',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '6',
      name: 'SURGICAL, HOSPITAL & INFECTION CONTROL',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '7',
      name: 'VACCINES ',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '8',
      name: 'PERSONAL CARE & HYGIENE',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '9',
      name: 'SEXUAL & REPRODUCTIVE HEALTH',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '10',
      name: 'MOTHER, BABY & CHILD',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '11',
      name: 'SENIOR & ASSISTED LIVING',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '12',
      name: 'SENIOR & ASSISTED LIVING',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '13',
      name: 'SEASONAL, HOME & EMERGENCY ESSENTIALS',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
  ];

  const renderProduct = ({ item }: { item: ProductCardProps['product'] }) => (
    <TouchableOpacity
      onPress={() => handleProductPress(item)}
      style={styles.productCardContainer}
    >
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
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedFilters({});
    setSearchText('');
    setPriceRange({ min: '', max: '' });

    if (categoryName === 'All') {
      setFilteredProducts(null);
    } else {
      const filtered = cardProducts.filter(
        (product) => product.Category === categoryName,
      );
      setFilteredProducts(filtered);
    }
  };
  console.log(filteredProducts, 'filteredProducts all');

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.name && styles.selectedCategory,
      ]}
      onPress={() => handleCategorySelect(item.name)}
    >
      <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.name && styles.selectedCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const sortProducts = (option: string) => {
    const sorted = [...cardProducts];

    switch (option) {
      case 'Price: Low to High':
        sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'Price: High to Low':
        sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'Relevance':
      default:
        sorted.sort((a, b) => a.id.localeCompare(b.id));
        break;
    }

    useProductStore.setState({ cardProducts: sorted });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeft size={20} color="#0088B1" />
            </TouchableOpacity>
            <Text style={styles.headerText}>All Products</Text>
          </View>
          <CartIconWithBadge />
        </View>

        <View style={styles.mainContent}>
          <View style={styles.sidebar}>
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={styles.productContainer}>
            <View style={styles.searchBarContainer}>
              <SearchBar />

              <View style={styles.iconWrapper}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setShowFilters(true)}
                >
                  <Filter size={14} color="#000" />
                  <Text style={styles.iconLabel}>Filter</Text>
                  <ChevronDown size={14} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setSortDropdownVisible((prev) => !prev)}
                >
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
                    ].map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={styles.dropdownOption}
                        onPress={() => {
                          setSelectedSortOption(option);
                          setSortDropdownVisible(false);
                          sortProducts(option);
                        }}
                      >
                        {option === 'Price: Low to High' ||
                        option === 'Price: High to Low' ||
                        option === 'Discount' ? (
                          <Lock size={16} color="#000" />
                        ) : (
                          <ArrowUpDown size={16} color="#0088B1" />
                        )}
                        {option === 'Relevance' ? (
                          <Text style={{ marginLeft: 6, color: '#0088B12' }}>
                            {option}
                          </Text>
                        ) : (
                          <Text style={{ marginLeft: 6 }}>{option}</Text>
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
              keyExtractor={(item) => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.productList}
              columnWrapperStyle={styles.columnWrapper}
            />
          </View>
        </View>
      </View>

      <FilterBottomSheet
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={(filtered) => setFilteredProducts(filtered)}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        searchText={searchText}
        setSearchText={setSearchText}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
    </>
  );
};

export default AllProductsScreen;
