import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import OrderCard from '../../components/cards/AllOrdersCard';
import {ChevronLeft, Search} from 'lucide-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {Order} from '../../types';
import styles from './index.styles';
import {useAuthStore} from '../../store/authStore';
import {getOrders} from '../../Services/order';

const OrdersScreen: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const statusOptions = [
    'ALL',
    'ON GOING',
    'COMPLETED',
    'CLARIFICATION NEEDED',
    'SHIPPED',
    'CANCELLED',
  ];

  const statusColors: Record<string, string> = {
    ALL: '#ccc',
    'ON GOING': '#33b5e5',
    COMPLETED: '#00C851',
    'CLARIFICATION NEEDED': '#ffbb33',
    SHIPPED: '#2BBBAD',
    CANCELLED: '#ff4444',
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const customer_id = useAuthStore(state => state.customer_id);

  const getOrder = async () => {
    try {
      if (!customer_id) {
        console.warn('Customer ID is undefined');
        return;
      }

      setLoading(true);

      const response = await getOrders(customer_id.toString());
      console.log(response);
      const mappedOrders: Order[] = response.data.map((item: any) => {
        const rawStatus = item.deliveryStatus?.toUpperCase?.() || 'ON GOING';
        const mappedStatus = rawStatus;

        return {
          name: item.customerName || 'Guest',
          orderId: `ORD-${item.orderId}`,
          date: new Date(item.createdAt).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
          }),
          items: `${item.items?.length || 0} Items`,
          amount: `₹${item.TotalOrderAmount || '0.00'}`,
          status: mappedStatus,
          rapidshypAwb: item.rapidshypAwb,
        };
      });

      setAllOrders(mappedOrders);
    } catch (error) {
      console.error('Failed to get orders:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log(allOrders);
  useEffect(() => {
    getOrder();
  }, []);

  const filteredOrders = allOrders.filter(order => {
    const matchesStatus =
      selectedStatus === 'ALL' || order.status === selectedStatus;
    const matchesSearch = order.orderId;
    return matchesStatus && matchesSearch;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            testID="back-button"
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={20} color="#0088B1" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Orders</Text>
        </View>
      </View>

      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <View style={styles.searchTextWrapper}>
            <Search color={'#0088B1'} size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for orders, items or services"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
          </View>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterChipsWrapper}>
        {statusOptions.map(status => (
          <TouchableOpacity
            key={status}
            style={[
              styles.chip,
              selectedStatus === status && {
                ...styles.activeChip,
                backgroundColor: statusColors[status] || '#0088B1',
              },
            ]}
            onPress={() => setSelectedStatus(status)}>
            <Text
              style={[
                styles.chipText,
                selectedStatus === status && styles.activeChipText,
              ]}>
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.divider} />

      <View style={styles.orderList}>
        {loading ? (
          <ActivityIndicator size="large" color="#0088B1" />
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('OrdersDetailsScreen', {
                  order_id: Number(order.orderId.replace('ORD-', '')),
                  awb: order.rapidshypAwb,
                })
              }>
              <OrderCard order={order} />
            </TouchableOpacity>
          ))
        ) : (
          <Text>No orders found.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;
