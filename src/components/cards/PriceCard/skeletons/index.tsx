import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const PriceCardSkeleton = () => {
  return (
    <View style={styles.card}>
      {/* Top Half (Gradient) Skeleton */}
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.topHalf}>
        {/* Background SVG Placeholder */}
        <ShimmerPlaceholder
          style={styles.backgroundSvgPlaceholder}
          LinearGradient={LinearGradient}
        />

        {/* Heading Placeholder */}
        <ShimmerPlaceholder
          style={styles.headingPlaceholder}
          LinearGradient={LinearGradient}
        />

        {/* Subheading Placeholder */}
        <ShimmerPlaceholder
          style={styles.subHeadingPlaceholder}
          LinearGradient={LinearGradient}
        />
      </ShimmerPlaceholder>

      {/* Bottom Half Skeleton */}
      <View style={styles.bottomHalf}>
        <View>
          {/* Offer Placeholder */}
          <ShimmerPlaceholder
            style={styles.offerPlaceholder}
            LinearGradient={LinearGradient}
          />

          {/* Price Row Placeholder */}
          <View style={styles.priceRow}>
            <ShimmerPlaceholder
              style={styles.pricePlaceholder}
              LinearGradient={LinearGradient}
            />
            <ShimmerPlaceholder
              style={styles.strikePricePlaceholder}
              LinearGradient={LinearGradient}
            />
          </View>
        </View>

        {/* Button Placeholder */}
        <ShimmerPlaceholder
          style={styles.buttonPlaceholder}
          LinearGradient={LinearGradient}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 108,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
  },
  topHalf: {
    height: 54,
    paddingHorizontal: Platform.OS === 'android' ? 10 : 0,
    paddingTop: 8,
    justifyContent: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  backgroundSvgPlaceholder: {
    position: 'absolute',
    bottom: -50,
    left: 0,
    width: 162,
    height: 157,
    opacity: 0.3,
  },
  headingPlaceholder: {
    width: '60%',
    height: 14,
    borderRadius: 4,
    marginBottom: 4,
    marginLeft: Platform.OS === 'android' ? 0 : 4,
  },
  subHeadingPlaceholder: {
    width: '80%',
    height: 10,
    borderRadius: 4,
    marginLeft: Platform.OS === 'android' ? 0 : 4,
  },
  bottomHalf: {
    height: 54,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  offerPlaceholder: {
    width: 70,
    height: 14,
    borderRadius: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  pricePlaceholder: {
    width: 40,
    height: 12,
    borderRadius: 4,
  },
  strikePricePlaceholder: {
    width: 40,
    height: 12,
    borderRadius: 4,
    marginLeft: 6,
  },
  buttonPlaceholder: {
    width: 70,
    height: 24,
    borderRadius: 16,
  },
});

export default PriceCardSkeleton;
