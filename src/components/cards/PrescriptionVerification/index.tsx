import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {styles} from './index.styles';
import {
  ChevronRight,
  UserCheck,
  CircleDot,
  File,
  FileText,
  User,
  Clock,
} from 'lucide-react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

interface PharmacistCardProps {
  name: string;
  experience: string;
  specialization: string;
}

type RouteParams = {
  PrescriptionVerification: {
    pdfs: string[];
  };
};

const PharmacistCard: React.FC<PharmacistCardProps> = ({
  name,
  experience,
  specialization,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => setExpanded(!expanded)}>
      <View style={styles.cardContent}>
        <View style={styles.avatarContainer}>
          <User size={25} color="#000000" />
        </View>
        <View style={styles.nameSection}>
          <Text style={styles.nameText}>{name}</Text>
          <View style={styles.pharmacistLabel}>
            <UserCheck size={16} color="#0088B1" />
            <Text style={styles.labelText}> Licensed Pharmacist</Text>
          </View>
        </View>
        <View style={styles.statusDot}>
          <CircleDot color="#50B57F" size={12} />
          <Text style={styles.onlineText}>Online</Text>
        </View>
      </View>

      {expanded && (
        <>
          <View style={styles.expandedSection}>
            <View style={styles.expandedContent}>
              <Text style={styles.expLabel}>Experience</Text>
              <Text style={styles.expValue}>{experience}</Text>
            </View>
            <View style={styles.expandedContent}>
              <Text style={styles.expLabel}>Specialization</Text>
              <Text style={styles.expValue}>{specialization}</Text>
            </View>
          </View>

          <View style={styles.verificationRow}>
            <View style={styles.verificationTextLeft}>
              <UserCheck size={14} color="#50B57F" />
              <Text style={styles.verificationIconText}>
                Verified 5000+ prescriptions
              </Text>
            </View>
            <View style={styles.verificationTextRight}>
              <User size={14} color="#0088B1" />
              <Text style={styles.verificationIconText}>ID Verified</Text>
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const PrescriptionVerification = () => {
  const route = useRoute<RouteProp<RouteParams, 'PrescriptionVerification'>>();
  const pdfs = route.params?.pdfs || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.progressCircle}>
          <Clock color="#6D7578" size={24} />
          <Text style={styles.uploadText}>Upload</Text>
        </View>

        <Text style={styles.estimatedTime}>
          Estimated time: <Text style={{color: '#0088B1'}}>15 minutes</Text>
        </Text>

        <Text style={styles.heading}>What happens during verification?</Text>
        <Text style={styles.description}>
          Our licensed pharmacist checks your prescription for completeness,
          appropriate dosage, potential drug interactions, and verifies that
          it's from a licensed medical practitioner.
        </Text>

        <TouchableOpacity style={styles.learnMoreRow}>
          <Text style={styles.learnMoreText}>Learn more about our process</Text>
          <ChevronRight size={14} color="#6D7578" />
        </TouchableOpacity>

        <Text style={styles.heading}>
          Your prescription is being verified by:
        </Text>

        <PharmacistCard
          name="Dr. Neha Sharma"
          experience="5+ years"
          specialization="Pharma_D"
        />

        {pdfs.length > 0 && (
          <View style={styles.pdfListContainer}>
            <Text style={styles.heading}>Uploaded PDFs:</Text>
            {pdfs.map((pdf, index) => (
              <View key={index} style={styles.pdfItem}>
                <FileText size={16} color="#007AFF" />
                <Text style={styles.pdfName}>{pdf}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.exploreBtn}>
          <Text style={styles.exploreText}>Explore More Products</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrescriptionVerification;
