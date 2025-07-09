/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, Text } from 'react-native';
import ExpandableSection from './index';
import styles from './index.styles';
import { Product } from '../../../types';
interface ProductInfoProps {
  product: Product | undefined;
}
const ProductInfo: React.FC<ProductInfoProps> = (product) => {
  console.log(product);
  return (
    <ScrollView style={{ flex: 1 }}>
      <ExpandableSection title="Product Information">
        <Text style={styles.section}>
          {product.product?.ProductInformation}
        </Text>
      </ExpandableSection>

      <ExpandableSection title="Safety Advices">
        <Text style={styles.section}>{product.product?.SafetyAdvices}</Text>
      </ExpandableSection>

      <ExpandableSection title="Storage & Special Instructions">
        <Text style={styles.section}>
          {product.product?.StorageInstructions}
        </Text>
      </ExpandableSection>
    </ScrollView>
  );
};

export default ProductInfo;
