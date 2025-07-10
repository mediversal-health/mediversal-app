import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Shield } from 'lucide-react-native';
import { styles } from './index.style';

type GuaranteeCardsProps = Record<string, never>;

const GuaranteeCards: React.FC<GuaranteeCardsProps> = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {/* Authenticity Guarantee Card */}
        <View style={styles.guaranteeCard}>
          <View style={styles.verifiedBadge}>
            <Shield size={12} color="#fff" />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>

          <Text style={styles.guaranteeTitle}>100% Authentic Guarantee</Text>

          <Text style={styles.guaranteeDescription}>
            Sourced directly from Cipla Ltd. with verified batch number. Stored
            in temperature-controlled facility.
          </Text>

          <View style={styles.featureContainer}>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>Batch{'\n'}Checked</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>Tamper{'\n'}Proof</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>Lab{'\n'}Tested</Text>
            </View>
          </View>
        </View>

        {/* Personalized Card */}
        <View style={styles.personalizedCard}>
          <Text style={styles.personalizedTitle}>Personalized for you</Text>
          <Text style={styles.personalizedSubtitle}>
            Based on your health profile and previous purchases.
          </Text>

          <View style={styles.personalizedFeatures}>
            <View style={styles.featureRow}>
              <Text style={styles.personalizedFeatureText}>
                Safe with your current medications
              </Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.personalizedFeatureText}>Time with food</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GuaranteeCards;
