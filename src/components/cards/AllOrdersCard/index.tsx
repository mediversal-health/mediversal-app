/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {
  Check,
  X,
  AlertCircle,
  Clock,
  Truck,
  MoreVertical,
} from 'lucide-react-native';

import type {ReactElement} from 'react';
import {Order, OrderStatus} from '../../../types';
import styles from './index.styles';

interface OrderCardProps {
  order: Order;
}

interface StatusConfig {
  icon: ReactElement;
  bgColor: string;
  statusColor: string;
}

const STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
  COMPLETED: {
    icon: <Check size={20} color="#10b981" />,
    bgColor: '#D1FAE5',
    statusColor: '#10b981',
  },
  'ON GOING': {
    icon: <Clock size={20} color="#000" />,
    bgColor: '#D3D7D8',
    statusColor: '#000',
  },
  'CLARIFICATION NEEDED': {
    icon: <AlertCircle size={20} color="#F2994A" />,
    bgColor: '#FFD2AB',
    statusColor: '#F2994A',
  },
  SHIPPED: {
    icon: <Truck size={20} color="#3b82f6" />,
    bgColor: '#DBEAFE',
    statusColor: '#3b82f6',
  },
  CANCELLED: {
    icon: <X size={20} color="#EB5757" />,
    bgColor: '#FFD3D3',
    statusColor: '#EB5757',
  },
};

const DEFAULT_CONFIG: StatusConfig = {
  icon: <Clock size={20} color="#6b7280" />,
  bgColor: '#E5E7EB',
  statusColor: '#6b7280',
};

const OrderCard: React.FC<OrderCardProps> = ({order}) => {
  const config = STATUS_CONFIG[order.status as OrderStatus] || DEFAULT_CONFIG;

  return (
    <View style={styles.card}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
        <View style={[styles.iconWrapper, {backgroundColor: config.bgColor}]}>
          {config.icon}
        </View>
        <View>
          <Text style={styles.orderId}>
            {order.orderId} - {order.date} - {order.items}
          </Text>
          <Text style={styles.name}>{order.name}</Text>
        </View>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.amount}>{order.amount}</Text>
        <View style={[styles.statusBox, {backgroundColor: config.bgColor}]}>
          <Text
            style={[styles.statusText, {color: config.statusColor}]}
            numberOfLines={2}>
            {order.status.length > 10
              ? order.status.slice(0, 10) + '\n' + order.status.slice(10)
              : order.status}
          </Text>
        </View>
        <MoreVertical size={16} color="#6b7280" style={{marginLeft: 8}} />
      </View>
    </View>
  );
};

export default OrderCard;
