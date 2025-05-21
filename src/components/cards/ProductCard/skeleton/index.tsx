import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ProductCardShimmer = ({
  borderColor = '#EB575766',
  backgroundColor = '#FFEBD4',
}) => {
  const dynamicStyles = {
    cardContainer: {
      borderColor: borderColor,
      backgroundColor: backgroundColor,
    },
  };

  return (
    <View style={[styles.cardContainer, dynamicStyles.cardContainer]}>
      {/* Image container shimmer */}
      <View style={styles.imageContainer}>
        <ShimmerPlaceholder
          style={styles.productImage}
          shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
        />
      </View>

      <View style={styles.infoContainer}>
        {/* Product name shimmer */}
        <ShimmerPlaceholder
          style={styles.productName}
          shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
        />

        {/* Product description shimmer */}
        <ShimmerPlaceholder
          style={styles.productDescription}
          shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
        />

        {/* Quantity shimmer */}
        <ShimmerPlaceholder
          style={styles.quantityText}
          shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
        />

        {/* Delivery shimmer */}
        <View style={styles.deliveryContainer}>
          <ShimmerPlaceholder
            style={styles.deliveryShimmer}
            shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
          />
        </View>

        {/* Price shimmer */}
        <View style={styles.priceContainer}>
          <ShimmerPlaceholder
            style={styles.priceShimmer}
            shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
          />
        </View>

        {/* Current price shimmer */}
        <ShimmerPlaceholder
          style={styles.currentPrice}
          shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
        />
      </View>

      {/* Add button shimmer */}
      <ShimmerPlaceholder
        style={styles.addButton}
        shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 130,
    height: 215,
    backgroundColor: '#FFE3C1',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    shadowColor: '#FFC8B7',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginHorizontal: 10,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    height: 60,
    width: '100%',
    borderRadius: 4,
  },
  infoContainer: {
    flex: 1,
  },
  productName: {
    marginTop: 8,
    height: 12,
    width: '80%',
    borderRadius: 4,
  },
  productDescription: {
    height: 12,
    width: '90%',
    marginTop: 6,
    borderRadius: 4,
  },
  quantityText: {
    height: 8,
    width: '40%',
    marginTop: 8,
    borderRadius: 4,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  deliveryShimmer: {
    height: 8,
    width: '60%',
    borderRadius: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  priceShimmer: {
    height: 12,
    width: '70%',
    borderRadius: 4,
  },
  currentPrice: {
    height: 16,
    width: '50%',
    marginTop: 8,
    borderRadius: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderTopLeftRadius: 8,
  },
});

export default ProductCardShimmer;
