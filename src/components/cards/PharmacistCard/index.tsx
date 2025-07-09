import { CircleDot, User, UserCheck } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './index.styles';
interface PharmacistCardProps {
  name: string;
  experience: string;
  specialization: string;
}

const PharmacistCard: React.FC<PharmacistCardProps> = ({
  name,
  experience,
  specialization,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => setExpanded(!expanded)}
    >
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

export default PharmacistCard;
