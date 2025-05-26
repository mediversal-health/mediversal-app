import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import OrderCard from '../../components/cards/AllOrdersCard';
import {ChevronLeft, Search} from 'lucide-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {Order} from '../../types';
import styles from './index.styles';
const OrdersScreen: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allOrders: Order[] = [
    {
      name: 'Join Doe',
      orderId: 'ORD-123456',
      date: '12 May',
      items: '4 Items',
      amount: '₹225.16',
      status: 'On Going',
    },
    {
      name: 'Jane Smith',
      orderId: 'ORD-123457',
      date: '13 May',
      items: '2 Items',
      amount: '₹150.00',
      status: 'Clarification Needed',
    },
    {
      name: 'Alice Johnson',
      orderId: 'ORD-123458',
      date: '14 May',
      items: '5 Items',
      amount: '₹500.45',
      status: 'Completed',
    },
    {
      name: 'Bob Brown',
      orderId: 'ORD-123459',
      date: '15 May',
      items: '3 Items',
      amount: '₹300.20',
      status: 'Shipped',
    },
    {
      name: 'Mary Gold',
      orderId: 'ORD-123460',
      date: '16 May',
      items: '6 Items',
      amount: '₹620.00',
      status: 'Cancelled',
    },
  ];

  const statusOptions = [
    'All',
    'On Going',
    'Completed',
    'Clarification Needed',
    'Shipped',
    'Cancelled',
  ];

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const filteredOrders = allOrders.filter(order => {
    const matchesStatus =
      selectedStatus === 'All' || order.status === selectedStatus;
    const matchesSearch =
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
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
              selectedStatus === status && styles.activeChip,
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
        {filteredOrders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;
