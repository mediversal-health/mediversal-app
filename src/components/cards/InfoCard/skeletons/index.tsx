import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const InfoBoxSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Content Placeholder */}
      <View style={styles.content}>
        {/* Text Content Placeholder */}
        <View style={styles.textContainer}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.headingPlaceholder}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.subHeadingPlaceholder}
          />
        </View>

        {/* SVG Icon Placeholder */}
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.iconPlaceholder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 104,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F8F8F8', // Light gray background
  },

  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Platform.OS === 'android' ? 10 : 6,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
  },
  headingPlaceholder: {
    width: '70%',
    height: 14,
    borderRadius: 4,
    marginBottom: 4,
  },
  subHeadingPlaceholder: {
    width: '90%',
    height: 10,
    borderRadius: 4,
  },
  iconPlaceholder: {
    width: 50,
    height: 40,
    borderRadius: 4,
    marginTop: 8,
  },
});

export default InfoBoxSkeleton;
