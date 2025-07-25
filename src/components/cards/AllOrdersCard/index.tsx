/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
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

import type {ReactElement} from 'react';
import {Order, OrderStatus} from '../../../types';
import styles from './index.styles';
import {Fonts} from '../../../styles/fonts';

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
    icon: <Check size={20} color="#34C759" />,
    bgColor: '#DDFFE5',
    statusColor: '#34C759',
  },
  'ON GOING': {
    icon: <Clock size={20} color="#0088B1" />,
    bgColor: '#E8F4F7',
    statusColor: '#0088B1',
  },
  'CLARIFICATION NEEDED': {
    icon: <AlertCircle size={20} color="#F2994A" />,
    bgColor: '#FFFCE5',
    statusColor: '#F2994A',
  },
  SHIPPED: {
    icon: <Truck size={20} color="#F2C94C" />,
    bgColor: '#DBEAFE',
    statusColor: '#F2C94C',
  },
  CANCELLED: {
    icon: <X size={20} color="#EB5757" />,
    bgColor: '#FFDFDF',
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={{flexDirection: 'row', gap: 8}}>
            <View
              style={[styles.iconWrapper, {backgroundColor: config.bgColor}]}>
              <Truck strokeWidth={1.25} />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.name}>{order.status}</Text>
              <Text style={styles.orderId}>{order.orderId}</Text>
            </View>
          </View>
        </View>

        <ChevronRight strokeWidth={1.25} />
      </View>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <View style={styles.rightContent}>
          <View style={{flexDirection: 'row', gap: 8}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Package size={24} strokeWidth={1.25} />
            </View>
            <View style={{flexDirection: 'column', gap: 1}}>
              <Text
                style={{
                  fontFamily: Fonts.JakartaRegular,
                  fontSize: 10,
                  color: '#899193',
                }}>
                Order Date
              </Text>
              <Text style={styles.amount}>{order.date}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightContent}>
          <View style={{flexDirection: 'row', gap: 8}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Boxes size={24} strokeWidth={1.25} />
            </View>
            <View style={{flexDirection: 'column', gap: 1}}>
              <Text
                style={{
                  fontFamily: Fonts.JakartaRegular,
                  fontSize: 10,
                  color: '#899193',
                }}>
                Order Items
              </Text>
              <Text style={styles.amount}>{order.items}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightContent}>
          <View style={{flexDirection: 'row', gap: 8}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <BadgeIndianRupee size={24} strokeWidth={1.25} />
            </View>
            <View style={{flexDirection: 'column', gap: 1}}>
              <Text
                style={{
                  fontFamily: Fonts.JakartaRegular,
                  fontSize: 10,
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
