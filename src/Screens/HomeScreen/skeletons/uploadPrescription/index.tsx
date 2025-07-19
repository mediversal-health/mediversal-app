import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const PrescriptionSkeleton = () => {
  return (
    <View style={styles.priscriptionContainer}>
      {/* SVG Icon Placeholder */}
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.iconPlaceholder}
      />

      {/* Text Placeholder */}
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.textPlaceholder}
      />

      {/* Button Placeholder */}
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.buttonPlaceholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  priscriptionContainer: {
    width: Platform.OS === 'ios' ? '95%' : '100%',
    alignSelf: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  iconPlaceholder: {
    width: 25,
    height: 32,
    borderRadius: 4,
  },
  textPlaceholder: {
    flex: 1,
    height: 14,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  buttonPlaceholder: {
    borderRadius: 8,
    width: 80,
    height: 32,
  },
});

export default PrescriptionSkeleton;
