import React from 'react';
import {View, StyleSheet} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const OrderNowCardSkeleton = () => {
  return (
    <View style={styles.cardContainer}>
      {/* Background SVG Placeholder */}
      <ShimmerPlaceholder style={styles.backgroundSVG} />

      {/* Text Content Placeholder */}
      <View style={styles.textContent}>
        <View style={styles.textGroup}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.headingPlaceholder}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.headingPlaceholder}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.subTextPlaceholder}
          />
        </View>

        {/* Button Placeholder */}
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.buttonPlaceholder}
        />
      </View>

      {/* Cart SVG Placeholder */}
      <ShimmerPlaceholder
        // LinearGradient={LinearGradient}
        style={styles.cartSVG}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    width: '100%',
    height: 166,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
  },
  backgroundSVG: {
    position: 'absolute',
    bottom: -50,
    left: 0,
    width: 331.96,
    height: 321.81,
    opacity: 0.3,
  },

  textContent: {
    flexDirection: 'column',
    marginTop: 30,
    margin: 16,
    gap: 22,
  },
  textGroup: {
    gap: 8,
  },
  headingPlaceholder: {
    width: 150,
    height: 20,
    borderRadius: 4,
  },
  subTextPlaceholder: {
    width: 200,
    height: 16,
    borderRadius: 4,
  },
  buttonPlaceholder: {
    borderRadius: 6,
    padding: 5,
    width: 100,
    height: 30,
  },
  cartSVG: {
    position: 'absolute',
    bottom: -30,
    left: 230,
    width: 122,
    height: 217,
    opacity: 0.3,
  },
});

export default OrderNowCardSkeleton;
