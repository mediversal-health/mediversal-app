/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import OrderCard from '../../components/cards/AllOrdersCard';
import {ChevronLeft, Search} from 'lucide-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {Order, OrderData} from '../../types';
import styles from './index.styles';
import {useAuthStore} from '../../store/authStore';
import {getOrders} from '../../Services/order';
import EmptyOrderScreen from './assets/svgs/Layer_1.svg';
import {FontColors, Fonts} from '../../styles/fonts';
const OrdersScreen: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const statusOptions = [
    'ALL',
    'ON GOING',
    'COMPLETED',
    // 'CLARIFICATION NEEDED',
    // 'SHIPPED',
    'CANCELLED',
  ];

  const statusColors: Record<string, string> = {
    ALL: '#0088B1',
    'ON GOING': '#0088B1',
    COMPLETED: '#50B57F',
    'CLARIFICATION NEEDED': '#F2994A',
    SHIPPED: '#F2C94C',
    CANCELLED: '#EB5757',
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
      console.log('response', response);
      const mappedOrders: Order[] = response.data.map((item: any) => {
        const rawStatus = item.deliverystatus?.toUpperCase?.() || 'ON GOING';

        let mappedStatus;
        if (rawStatus.includes('CANCELLED')) {
          mappedStatus = 'CANCELLED';
        } else if (
          rawStatus.includes('DELIVERED') ||
          rawStatus === 'COMPLETED'
        ) {
          mappedStatus = 'COMPLETED';
        } else {
          mappedStatus = 'ON GOING';
        }

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
          orderData: item as OrderData,
        };
      });

      setAllOrders(mappedOrders);
    } catch (error) {
      console.log('Failed to get orders:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log(allOrders);
  useEffect(() => {
    getOrder();
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getOrder(); // Call your existing getOrder function
    } catch (error) {
      console.error('Error refreshing orders:', error);
    } finally {
      setRefreshing(false);
    }
  };
  const filteredOrders = allOrders
    .filter(order => {
      const matchesStatus =
        selectedStatus === 'ALL' || order.status === selectedStatus;
      const matchesSearch = order.orderId
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .reverse();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          testID="back-button">
          <ChevronLeft size={20} color="#0088B1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <View style={styles.searchTextWrapper}>
            <Search color={'#0088B1'} size={16} strokeWidth={1.5} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for orders"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
          </View>
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0088B1']}
            tintColor="#0088B1"
          />
        }>
        <ScrollView
          style={styles.filterChipsWrapper}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
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
                    order_data: order.orderData,
                  })
                }>
                <OrderCard order={order} />
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <EmptyOrderScreen />
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 16,
                  color: '#666',
                  fontFamily: Fonts.JakartaSemiBold,
                }}>
                No orders found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersScreen;
