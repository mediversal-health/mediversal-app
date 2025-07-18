/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Calendar} from 'lucide-react-native';
import BackgroundSVG from '../../../assests/svgs/Looper-1.svg';
import styles from './index.styles';

interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

interface UpcomingOrdersCardProps {
  order: {
    orderId: number;
    customerName: string;
    createdAt: string;
    deliverystatus: string;
    items: OrderItem[];
    TotalOrderAmount: string;
  };
  onPress?: () => void;
}

const UpcomingOrdersCard: React.FC<UpcomingOrdersCardProps> = ({
  order,
  onPress,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#4CAF50';
      case 'out for delivery':
        return '#FF9800';
      case 'processing':
        return '#2196F3';
      case 'cancelled':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <LinearGradient
      colors={['rgba(0, 188, 212, 0.1)', '#00BCD4', '#0088B1']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.cardContainer}>
      <View style={{padding: 12, flex: 1}}>
        <View style={styles.svgBottomLeft}>
          <BackgroundSVG width={162} height={157} strokeWidth={3} />
        </View>
        <View style={styles.svgFullOverlay}>
          <BackgroundSVG width="100%" height={100} strokeWidth={3} />
        </View>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusColor(order.deliverystatus)},
          ]}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>
            {order.deliverystatus.charAt(0).toUpperCase() +
              order.deliverystatus.slice(1)}
          </Text>
        </View>
        <View style={styles.doctorInfoRow}>
          <Image
            source={require('./assets/pngs/Box.png')}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.doctorSpecialty}>
              Order ID: ORD-{order.orderId}
            </Text>
            <Text style={styles.doctorName}>{order.customerName}</Text>
            <Text style={styles.doctorSpecialty}>
              {order.items.length} Item{order.items.length !== 1 ? 's' : ''} • ₹
              {order.TotalOrderAmount}
            </Text>
          </View>
        </View>
        <View style={styles.scheduleContainer}>
          <View style={styles.scheduleRow}>
            <View style={styles.scheduleItem}>
              <Calendar color="#6D7578" size={14} strokeWidth={1} />
              <Text style={styles.scheduleText}>
                {formatDate(order.createdAt)}
              </Text>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.scheduleItem} onPress={onPress}>
              <Text style={styles.viewOrderText}>View Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default UpcomingOrdersCard;
