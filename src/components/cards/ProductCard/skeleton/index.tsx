import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

interface ProductCardShimmerProps {
  borderColor?: string;
  backgroundColor?: string;
}

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ProductCardShimmer: React.FC<ProductCardShimmerProps> = ({
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
      <View style={styles.imageContainer}>
        <ShimmerPlaceholder
          style={styles.productImage}
          shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
        />
      </View>

      <View style={styles.infoContainer}>
        <ShimmerPlaceholder
          style={styles.productName}
          shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
        />

        <ShimmerPlaceholder
          style={styles.productDescription}
          shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
        />

        <View style={styles.quantityContainer}>
          <ShimmerPlaceholder
            style={styles.quantityText}
            shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
          />
        </View>

        <View style={styles.deliveryContainer}>
          <ShimmerPlaceholder
            style={styles.deliveryShimmer}
            shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
          />
        </View>

        <View style={styles.discountContainer}>
          <ShimmerPlaceholder
            style={styles.originalPriceShimmer}
            shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
          />
          <ShimmerPlaceholder
            style={styles.discountPercentageShimmer}
            shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
          />
        </View>

        <ShimmerPlaceholder
          style={styles.currentPrice}
          shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
        />
      </View>

      <ShimmerPlaceholder
        style={styles.addButton}
        shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    borderTopLeftRadius: 8,
    bottom: 0,
    height: 24,
    position: 'absolute',
    right: 0,
    width: 24,
  },
  cardContainer: {
    backgroundColor: '#FFE3C1',
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    height: 230,
    marginHorizontal: 3,
    overflow: 'hidden',
    padding: 12,
    shadowColor: '#FFC8B7',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: 130,
  },
  currentPrice: {
    borderRadius: 4,
    height: 14,
    marginTop: 4,
    width: '50%',
  },
  deliveryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },
  deliveryShimmer: {
    borderRadius: 4,
    height: 10,
    marginLeft: 4,
    width: '50%',
  },
  discountContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },
  discountPercentageShimmer: {
    borderRadius: 4,
    height: 8,
    width: '25%',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    height: 100,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingVertical: 10,
  },
  infoContainer: {
    flex: 1,
  },
  originalPriceShimmer: {
    borderRadius: 4,
    height: 10,
    marginRight: 4,
    width: '35%',
  },
  productDescription: {
    borderRadius: 4,
    height: 12,
    marginTop: 2,
    width: '90%',
  },
  productImage: {
    borderRadius: 4,
    height: 90,
    width: '100%',
  },
  productName: {
    borderRadius: 4,
    height: 10,
    marginTop: 4,
    width: '80%',
  },
  quantityContainer: {
    marginTop: 4,
  },
  quantityText: {
    borderRadius: 4,
    height: 8,
    width: '40%',
  },
});

export default ProductCardShimmer;
