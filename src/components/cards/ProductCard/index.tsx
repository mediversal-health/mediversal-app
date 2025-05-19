import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Clock, Plus, Minus} from 'lucide-react-native';
import styles from './index.styles';
import {ProductCardProps} from '../../../types';
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  borderColor = '#EB575766',
  buttonColor = '#EB575766',
  backgroundColor = '#FFEBD4',
  style,
}) => {
  const [itemCount, setItemCount] = useState(0);

  const handleAddItem = () => {
    const newCount = itemCount + 1;
    setItemCount(newCount);
    if (onAddToCart) {
      onAddToCart(product.id, newCount);
    }
  };

  const handleRemoveItem = () => {
    if (itemCount > 0) {
      const newCount = itemCount - 1;
      setItemCount(newCount);
      if (onAddToCart) {
        onAddToCart(product.id, newCount);
      }
    }
  };

  const dynamicStyles = {
    cardContainer: {
      borderColor: borderColor,
      backgroundColor: backgroundColor,
    },
    addButton: {
      backgroundColor: buttonColor,
    },
    counterContainer: {
      backgroundColor: buttonColor,
    },
  };

  return (
    <View style={[styles.cardContainer, dynamicStyles.cardContainer, style]}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: product.image}}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        {/* <Text style={styles.productDescription}>{product.description}</Text> */}

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityText}>{product.quantity}</Text>
        </View>

        <View style={styles.deliveryContainer}>
          <Clock size={12} color="#666" />
          <Text style={styles.deliveryText}>{product.delivery}</Text>
        </View>

        <View style={styles.discountContainer}>
          <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
          <Text style={styles.discountPercentage}>
            {product.discountPercentage}% off
          </Text>
        </View>

        <Text style={styles.currentPrice}>₹ {product.discountedPrice}</Text>
      </View>

      {itemCount === 0 ? (
        <TouchableOpacity
          style={[styles.addButton, dynamicStyles.addButton]}
          onPress={handleAddItem}>
          <Plus size={16} color="#FFF" />
        </TouchableOpacity>
      ) : (
        <View style={[styles.counterContainer, dynamicStyles.counterContainer]}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={handleRemoveItem}>
            <Minus size={14} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.counterText}>{itemCount}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={handleAddItem}>
            <Plus size={14} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProductCard;
