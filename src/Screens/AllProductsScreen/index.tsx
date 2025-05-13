/* eslint-disable react-native/no-inline-styles */
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {
  ChevronLeft,
  Filter,
  ShoppingBag,
  ArrowUpDown,
  ChevronDown,
} from 'lucide-react-native';

import ProductCard from '../../components/cards/ProductCard';
import SearchBar from '../../components/common/SearchBar';
import {ProductCardProps} from '../../types';
import styles from './index.styles';
interface Category {
  id: string;
  name: string;
  icon: string;
}

const AllProductsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: Category[] = [
    {
      id: '1',
      name: 'All',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '2',
      name: 'Cold & Cough',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '3',
      name: 'Acidity',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '4',
      name: 'Muscle Cramps',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '5',
      name: 'Dehydration',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
    {
      id: '6',
      name: 'Burn Care',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Mf297qdWmz6djYDpCVQbQpZkuCdAUvMiSHLpD-KLBGn-RxjpxKgAXfehvvvoO_V_aJQ&usqp=CAU',
    },
  ];

  const products: ProductCardProps['product'][] = [
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
        'https://mediversalapp.s3.ap-south-1.amazonaws.com/products/166161/image_360.png',
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
    },
  ];

  const renderProduct = ({item}: {item: ProductCardProps['product']}) => (
    <TouchableOpacity style={styles.productCardContainer}>
      <ProductCard
        product={item}
        borderColor={'#2D9CDB'}
        buttonColor={'#2D9CDB'}
        backgroundColor={'#E8F4F7'}
        onAddToCart={(id: string, quantity: number) => {
          console.log(`Product ${id} added to cart: ${quantity} items`);
        }}
      />
    </TouchableOpacity>
  );

  const renderCategory = ({item}: {item: Category}) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.name && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item.name)}>
      <Image source={{uri: item.icon}} style={styles.categoryIcon} />
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.name && styles.selectedCategoryText,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.backButton}>
            <ChevronLeft size={20} color="#0088B1" />
          </View>
          <Text style={styles.headerText}>All Products</Text>
        </View>
        <ShoppingBag size={20} />
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
              <TouchableOpacity style={styles.iconButton}>
                <Filter size={14} color="#000" />
                <Text style={styles.iconLabel}>Filter</Text>
                <ChevronDown size={14} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <ArrowUpDown size={14} color="#000" />
                <Text style={styles.iconLabel}>Sort</Text>
                <ChevronDown size={14} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productList}
            columnWrapperStyle={styles.columnWrapper}
          />
        </View>
      </View>
    </View>
  );
};

export default AllProductsScreen;
