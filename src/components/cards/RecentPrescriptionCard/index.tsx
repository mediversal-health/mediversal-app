import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
} from 'lucide-react-native';
import styles from './index.styles';

type BadgeType = 'Valid' | 'Expiring' | 'Expired';

interface Props {
  doctorName: string;
  uploadDate: string;
  status: BadgeType;
  onReuse: () => void;
}

const badgeConfig = {
  Valid: {
    color: '#50B57F',
    icon: <CheckCircle size={14} color="#fff" />,
  },
  Expiring: {
    color: '#FFB020',
    icon: <AlertTriangle size={14} color="#fff" />,
  },
  Expired: {
    color: '#F04438',
    icon: <XCircle size={14} color="#fff" />,
  },
};

const RecentPrescriptionCard: React.FC<Props> = ({
  doctorName,
  uploadDate,
  status,
  onReuse,
}) => {
  const badge = badgeConfig[status];

  return (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <FileText size={23} color="#161D1F" style={{marginRight: 8}} />
        <View>
          <Text style={styles.doctorText}>{doctorName}</Text>
          <Text style={styles.uploadedText}>Uploaded on {uploadDate}</Text>
        </View>
      </View>

      <View style={styles.rightContent}>
        <View style={[styles.badge, {backgroundColor: badge.color}]}>
          {badge.icon}
          <Text style={styles.badgeText}>{status}</Text>
        </View>
        <TouchableOpacity onPress={onReuse} style={styles.reuseButton}>
          <Text style={styles.reuseText}>Reuse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecentPrescriptionCard;
