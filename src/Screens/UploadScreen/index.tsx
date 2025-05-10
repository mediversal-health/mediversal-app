import React from 'react';
import {
  View,
  Text as RNText,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MedicineDetail from '../../components/cards/MedicineDetails';
import GuaranteeCards from '../../components/cards/GuaranteeCards';
import ProductInfo from '../../components/cards/ProductInformation/ProductInfo';
import CheaperAlternative from '../../components/cards/CheaperAlternative';
import {Clock} from 'lucide-react-native';
import {styles} from './index.style';

const medicineImages = [
  {
    uri: 'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/29022d224cb249a98378af4a1b220191.jpg',
  },
  {
    uri: 'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/f1745262e65c4f50af6f84563f620847.jpg',
  },
  {
    uri: 'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/27f73dcc240841458f7715501428eff7.jpg',
  },
  {
    uri: 'https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/6fe50245c5a64d258f3d6ca7622b3546.jpg',
  },
];

const UploadScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
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
          <View style={styles.cheaperAlternativeContainer}>
            <CheaperAlternative discountPercentage={5}>
              <View style={styles.productCardsContainer}>
                <View style={styles.productCard}>
                  <RNText>Cheaper alternatives available </RNText>
                </View>
                <View style={styles.productCard}>
                  <RNText>Cheaper alternatives available</RNText>
                </View>
                <View style={styles.productCard}>
                  <RNText>Cheaper alternatives available</RNText>
                </View>
              </View>
            </CheaperAlternative>
          </View>
        </View>
      </ScrollView>

      {/* Fixed bottom buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.reminderButton}>
          <Clock size={18} color="#0088B1" />
          <RNText style={styles.reminderButtonText}>Set Reminder</RNText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton}>
          <RNText style={styles.buyButtonText}>Buy Now</RNText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UploadScreen;
