import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  ChevronLeft,
  ShieldCheck,
  Lock,
  CreditCard,
  FileText,
} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './index.styles';

const PrivacyPolicyScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#0088B1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* General */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ShieldCheck size={20} color="#0088B1" />
            <Text style={styles.sectionTitle}>General</Text>
          </View>
          <Text style={styles.body}>
            Mediversal shall not be liable for delays due to causes beyond its
            control such as natural disasters, wars, strikes, or system
            failures.
          </Text>
        </View>

        {/* Credit Card Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CreditCard size={20} color="#0088B1" />
            <Text style={styles.sectionTitle}>Credit Card Information</Text>
          </View>
          <Text style={styles.body}>
            Credit card payments are processed by a secure third-party provider.
            We do not store card details and follow industry security standards.
          </Text>
        </View>

        {/* Security */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Lock size={20} color="#0088B1" />
            <Text style={styles.sectionTitle}>Security</Text>
          </View>
          <Text style={styles.body}>
            We use advanced encryption and password protection, but no method is
            100% secure. Users are advised to safeguard their credentials,
            especially on public devices.
          </Text>
        </View>

        {/* Information Collection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={20} color="#0088B1" />
            <Text style={styles.sectionTitle}>
              Type of Information Collected
            </Text>
          </View>
          <Text style={styles.body}>
            We collect personal data like name, contact, and uploaded
            prescriptions to improve our service. This is considered “Sensitive
            Personal Data or Information.”
          </Text>
        </View>

        {/* Use of Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={20} color="#0088B1" />
            <Text style={styles.sectionTitle}>Use of Information</Text>
          </View>
          <Text style={styles.body}>
            We use your information to create accounts, improve services, send
            updates, comply with laws, and handle disputes or fraud detection.
          </Text>
        </View>

        {/* Disclosure */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={20} color="#0088B1" />
            <Text style={styles.sectionTitle}>Disclosure of Information</Text>
          </View>
          <Text style={styles.body}>
            We may disclose information to comply with legal requests or protect
            rights. Financial info is handled securely via third-party gateways,
            and we’re not liable for their actions.
          </Text>
        </View>

        {/* Cookies Policy */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={20} color="#0088B1" />
            <Text style={styles.sectionTitle}>Cookies Policy</Text>
          </View>
          <Text style={styles.body}>
            We use temporary cookies that do not store personal data. Usage
            patterns may be analyzed to enhance user experience and services.
          </Text>
        </View>

        {/* External Link */}
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://gwsmediversal.in/privacy-policy')
          }>
          <Text style={styles.link}>
            🔗 Read full policy at gwsmediversal.in
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;
