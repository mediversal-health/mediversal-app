import React from 'react';
import {View, StyleSheet} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const DoctorsCardSkeleton = () => {
  return (
    <View style={styles.cardContainer}>
      {/* Doctor Info Row Skeleton */}
      <View style={styles.doctorInfoRow}>
        <ShimmerPlaceholder
          style={styles.avatarSkeleton}
          LinearGradient={LinearGradient}
          shimmerColors={['#ebebeb', '#c5c5c5', '#ebebeb']}
        />
        <View style={styles.doctorInfoContainer}>
          <ShimmerPlaceholder
            style={styles.doctorNameSkeleton}
            LinearGradient={LinearGradient}
            shimmerColors={['#ebebeb', '#c5c5c5', '#ebebeb']}
          />
          <ShimmerPlaceholder
            style={styles.doctorSpecialtySkeleton}
            LinearGradient={LinearGradient}
            shimmerColors={['#ebebeb', '#c5c5c5', '#ebebeb']}
          />
        </View>
      </View>

      {/* Schedule Container Skeleton */}
      <View style={styles.scheduleContainer}>
        <View style={styles.scheduleRow}>
          <ShimmerPlaceholder
            style={styles.scheduleItemSkeleton}
            LinearGradient={LinearGradient}
            shimmerColors={['#ebebeb', '#c5c5c5', '#ebebeb']}
          />
          <ShimmerPlaceholder
            style={styles.dividerSkeleton}
            LinearGradient={LinearGradient}
            shimmerColors={['#ebebeb', '#c5c5c5', '#ebebeb']}
          />
          <ShimmerPlaceholder
            style={styles.scheduleItemSkeleton}
            LinearGradient={LinearGradient}
            shimmerColors={['#ebebeb', '#c5c5c5', '#ebebeb']}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 18,
    height: 106,
    width: 254,
    marginRight: 8,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
    padding: 12,
  },
  doctorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  avatarSkeleton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  doctorInfoContainer: {
    flex: 1,
  },
  doctorNameSkeleton: {
    width: '70%',
    height: 12,
    marginBottom: 4,
    borderRadius: 4,
  },
  doctorSpecialtySkeleton: {
    width: '90%',
    height: 10,
    borderRadius: 4,
  },
  scheduleContainer: {
    borderRadius: 6,
    marginTop: 20,
    padding: 3,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scheduleItemSkeleton: {
    flex: 1,
    height: 12,
    borderRadius: 4,
  },
  dividerSkeleton: {
    width: 1,
    height: 20,
    marginHorizontal: 10,
  },
});

export default DoctorsCardSkeleton;
