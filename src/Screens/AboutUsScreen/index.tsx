import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ChevronLeft, Info, Hospital, User} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './index.styles';

const AboutUsScreen: React.FC = () => {
  // Hook to handle navigation
  const navigation = useNavigation();

  return (
    <View style={styles.safeAreaContainer}>
      {/* Ensures content is displayed inside safe area boundaries (for notches etc.) */}
      <SafeAreaView style={styles.container}>
        {/* Header with back button and screen title */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={20} color="#0088B1" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About us</Text>
        </View>

        {/* Scrollable content area */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Section 1: What makes Mediversal stand out */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Info size={20} color="#0088B1" />
              <Text style={styles.sectionTitle}>What makes us stand out?</Text>
            </View>
            <Text style={styles.body}>
              Clinical excellence with a human touch is our forte! We are
              committed to providing quality healthcare at an affordable cost,
              backed by modern infrastructure and efficient systems.{'\n\n'}
              Trust, Transparency and Care are our core values. At Mediversal,
              every patient is treated with dignity and respect.
            </Text>
          </View>

          {/* Section 2: Hospital contact and info */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Hospital size={20} color="#0088B1" />
              <Text style={styles.sectionTitle}>
                Get treated at Mediversal Hospitals
              </Text>
            </View>
            <Text style={styles.body}>
              Commissioned amidst the pandemic, our hospital in Kankarbagh,
              Patna has already treated thousands!{'\n\n'}
              Reach us at:
              {'\n'}📧 info@mediversal.in
              {'\n'}📞 0612-3500010 / 3500110 / 3500111
            </Text>
          </View>

          {/* Section 3: Founders and leadership team */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <User size={20} color="#0088B1" />
              <Text style={styles.sectionTitle}>Management Team</Text>
            </View>

            {/* Member 1 */}
            <View style={styles.memberBlock}>
              <Text style={styles.memberName}>Navneet Ranjan</Text>
              <Text style={styles.memberTitle}>Co-Founder & Director</Text>
              <Text style={styles.body}>
                Marine Engineering graduate, MDI Gurgaon and ESCP London
                alumnus, with experience in BP Shipping, Arcelor Mittal, Tata
                Steel. Serial entrepreneur in Agri & Healthcare sectors.
              </Text>
            </View>

            {/* Member 2 */}
            <View style={styles.memberBlock}>
              <Text style={styles.memberName}>Bhanu Pratap</Text>
              <Text style={styles.memberTitle}>Co-Founder & Director</Text>
              <Text style={styles.body}>
                Marine Engineering graduate, IIM Lucknow alumnus. Worked with
                NYK, Accenture, TTSL, HSBC. Brings digital transformation and
                strategy expertise from working with global & government orgs.
              </Text>
            </View>

            {/* Member 3 */}
            <View style={styles.memberBlock}>
              <Text style={styles.memberName}>Jayant Gandhi</Text>
              <Text style={styles.memberTitle}>Co-Founder & Director</Text>
              <Text style={styles.body}>
                British Petroleum veteran, expert in engineering operations.
                Oversees infrastructure and maintenance to ensure smooth
                functioning of all hospital systems.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AboutUsScreen;
