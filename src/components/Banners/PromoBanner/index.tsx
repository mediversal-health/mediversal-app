import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './index.styles';

const PromoBanner = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>25% OFF on first order</Text>
        <Text style={styles.subtitle}>(Available on Payment Page) *T&C</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Explore Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PromoBanner;
