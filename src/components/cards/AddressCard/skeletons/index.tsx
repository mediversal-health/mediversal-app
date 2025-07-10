/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../index.styles';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

interface AddressCardSkeletonProps {
  count?: number;
}

const AddressCardSkeleton: React.FC<AddressCardSkeletonProps> = ({
  count = 1,
}) => {
  const renderSkeleton = () => (
    <View style={[styles.container, { borderColor: '#E0E0E0' }]}>
      <View style={styles.radioButtonContainer}>
        <ShimmerPlaceHolder
          style={[styles.radioOuter, { borderWidth: 0 }]}
          shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
          duration={1000}
        />
      </View>

      <View style={styles.header}>
        <View style={styles.leftSection}>
          {/* Icon Container Skeleton */}
          <ShimmerPlaceHolder
            style={[styles.iconContainer, { marginRight: 10, marginTop: 2 }]}
            shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
          />

          <View style={{ flex: 1 }}>
            {/* Title Skeleton */}
            <ShimmerPlaceHolder
              style={{
                width: 80,
                height: 20,
                borderRadius: 4,
                marginBottom: 8,
              }}
              shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
            />

            {/* Address Skeleton - Multiple lines */}
            <ShimmerPlaceHolder
              style={{
                width: '90%',
                height: 12,
                borderRadius: 4,
                marginBottom: 4,
              }}
              shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
            />
            <ShimmerPlaceHolder
              style={{
                width: '70%',
                height: 12,
                borderRadius: 4,
                marginBottom: 12,
              }}
              shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
            />

            {/* Phone Number Section Skeleton */}
            <View style={styles.phoneSection}>
              <ShimmerPlaceHolder
                style={{
                  width: 85,
                  height: 12,
                  borderRadius: 4,
                  marginRight: 4,
                }}
                shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
              />
              <ShimmerPlaceHolder
                style={{
                  width: 100,
                  height: 12,
                  borderRadius: 4,
                }}
                shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
              />
            </View>

            {/* More Button Skeleton */}
            <View
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ShimmerPlaceHolder
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                }}
                shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <View key={index}>{renderSkeleton()}</View>
      ))}
    </>
  );
};

export default AddressCardSkeleton;
