import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import ExpandableSection from './index';
import styles from './index.styles';

const ProductInfo: React.FC = () => {
  return (
    <ScrollView style={{flex: 1}}>
      <ExpandableSection title="Product Information">
        <Text style={styles.section}>
          Dolo 650 Tablet helps relieve pain and fever by blocking the release
          of certain chemical messengers responsible for fever and pain...
        </Text>
        <Text style={styles.section}>
          Dolo 650 Tablet has been widely used during the COVID-19 pandemic. It
          should not be taken more than 4 times in 24 hours...
        </Text>
      </ExpandableSection>

      <ExpandableSection title="Usage & Safety">
        <Text style={styles.heading}>Uses</Text>
        <Text style={styles.list}>• Pain relief</Text>
        <Text style={styles.list}>• Treatment of Fever</Text>

        <Text style={styles.heading}>Side Effects</Text>
        <Text style={styles.list}>• Headache</Text>
        <Text style={styles.list}>• Nausea</Text>
        <Text style={styles.list}>• Vomiting</Text>

        <Text style={styles.heading}>Safety</Text>
        <Text style={styles.section}>
          Avoid alcohol. Take with food. Do not exceed the recommended dose.
        </Text>
      </ExpandableSection>
    </ScrollView>
  );
};

export default ProductInfo;
