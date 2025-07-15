import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Phone, MapPin, Mail, ChevronLeft} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './index.styles';

const HelpSupportScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.safeAreaContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={20} color="#0088B1" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help & Support</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Phone Section */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Phone size={20} color="#0088B1" />
              <Text style={styles.sectionTitle}>Call Us</Text>
            </View>
            <Text
              style={styles.bodyLink}
              onPress={() => Linking.openURL('tel:9608600380')}>
              📞 9608600380
            </Text>
          </View>

          {/* Address Section */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MapPin size={20} color="#0088B1" />
              <Text style={styles.sectionTitle}>Hospital Address</Text>
            </View>
            <Text style={styles.body}>
              Mediversal Superspecialty Hospital
              {'\n'}(A unit of Mediversal Healthcare Pvt. Ltd)
              {'\n'}Doctors' Colony, Kankarbagh
              {'\n'}Patna - 800 020, Bihar
            </Text>
          </View>

          {/* Mail Section */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Mail size={20} color="#0088B1" />
              <Text style={styles.sectionTitle}>Mail Us</Text>
            </View>
            <Text
              style={styles.bodyLink}
              onPress={() => Linking.openURL('mailto:gws@mediversal.in')}>
              📧 gws@mediversal.in
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HelpSupportScreen;
