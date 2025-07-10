import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Check, AlertCircle, MoreVertical } from 'lucide-react-native';

interface PrescribedOrderCardProps {
  order: PrescribedOrder;
  onMenuPress?: () => void;
}

import type { ReactElement } from 'react';

import { PrescribedOrder, PrescribedOrderStatus } from '../../../types';
import styles from './index.styles';

interface StatusConfig {
  icon: ReactElement;
  bgColor: string;
  statusColor: string;
}

const STATUS_CONFIG: Record<PrescribedOrderStatus, StatusConfig> = {
  Approved: {
    icon: <Check size={16} color="#10b981" />,
    bgColor: '#D1FAE5',
    statusColor: '#10b981',
  },
  'Clarification Needed': {
    icon: <AlertCircle size={16} color="#F59E0B" />,
    bgColor: '#FEF3C7',
    statusColor: '#F59E0B',
  },
};

const PrescribedCard: React.FC<PrescribedOrderCardProps> = ({
  order,
  onMenuPress,
}) => {
  const config = STATUS_CONFIG[order.status];

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        {/* <View style={[styles.iconWrapper, {backgroundColor: config.bgColor}]}>
          {config.icon}
        </View> */}
        <View style={styles.contentWrapper}>
          <Text style={styles.orderId}>{order.name}</Text>
          <Text style={styles.name}> {order.quantity}</Text>
          <Text style={styles.amount}>{order.amount}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBox, { backgroundColor: config.bgColor }]}>
            <Text style={[styles.statusText, { color: config.statusColor }]}>
              {order.status}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={onMenuPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MoreVertical size={18} color="#6b7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PrescribedCard;
