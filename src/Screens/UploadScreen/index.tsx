import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import MedicineDetail from '../../components/cards/MedicineDetails';
import GuaranteeCards from '../../components/cards/GuaranteeCards';
import ProductInfo from '../../components/cards/ProductInformation/ProductInfo';

const medicineImages = [
  require('./assets/med.svg'),
  require('./assets/med.svg'),
  require('./assets/med.svg'),
];

const UploadScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <MedicineDetail
          images={medicineImages}
          rating={4.5}
          name="Dolo 650mg Tablet"
          packInfo="Strip of 10 Tablets"
          saltComposition="Paracetamol (650mg)"
          currentPrice="₹ 165"
          originalPrice="₹ 195"
          discount="15% OFF"
          deliveryTime="Get by 9pm, Tomorrow"
        />

        {/* Guarantee cards positioned immediately below medicine details */}
        <View style={styles.guaranteeSection}>
          <GuaranteeCards />
        </View>
        <ProductInfo />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  guaranteeSection: {
    marginTop: 8, // Small margin between medicine details and guarantee cards
    paddingBottom: 16, // Add some padding at the bottom
  },
});

export default UploadScreen;
