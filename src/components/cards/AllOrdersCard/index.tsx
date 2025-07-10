/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import {
  Check,
  X,
  AlertCircle,
  Clock,
  Truck,
  ChevronRight,
  BadgeIndianRupee,
  Package,
  Boxes,
} from 'lucide-react-native';

import type { ReactElement } from 'react';
import { Order, OrderStatus } from '../../../types';
import styles from './index.styles';
import { Fonts } from '../../../styles/fonts';

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

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const config = STATUS_CONFIG[order.status as OrderStatus] || DEFAULT_CONFIG;

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <View
              style={[styles.iconWrapper, { backgroundColor: config.bgColor }]}>
              <Truck />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.name}>{order.status}</Text>
              <Text style={styles.orderId}>{order.orderId}</Text>
            </View>
          </View>
        </View>

        <ChevronRight />
      </View>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <View style={styles.rightContent}>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Package size={20} />
            </View>
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <Text
                style={{
                  fontFamily: Fonts.JakartaRegular,
                  fontSize: 8,
                  color: '#899193',
                }}>
                Order Date
              </Text>
              <Text style={styles.amount}>{order.date}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightContent}>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Boxes size={20} />
            </View>
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <Text
                style={{
                  fontFamily: Fonts.JakartaRegular,
                  fontSize: 8,
                  color: '#899193',
                }}>
                Order Items
              </Text>
              <Text style={styles.amount}>{order.items}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightContent}>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <BadgeIndianRupee size={20} />
            </View>
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <Text
                style={{
                  fontFamily: Fonts.JakartaRegular,
                  fontSize: 8,
                  color: '#899193',
                }}>
                Order Value
              </Text>
              <Text style={styles.amount}>{order.amount}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderCard;
