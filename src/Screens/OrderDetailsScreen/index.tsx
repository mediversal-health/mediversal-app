import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import styles from '../OrdersScreen/index.styles';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {NavigationProp} from '@react-navigation/native';
import {trackOrders} from '../../Services/order'; // update to your actual path
import {ChevronLeft} from 'lucide-react-native';

type OrdersDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'OrdersDetailsScreen'
>;

const OrdersDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<OrdersDetailsScreenRouteProp>();
  const {order_id, awb} = route.params;

  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (awb) {
      fetchTrackingDetails();
    }
  }, [awb]);

  const fetchTrackingDetails = async () => {
    try {
      setLoading(true);
      const data = await trackOrders(order_id, awb);
      console.log(data);
      setTrackingData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tracking info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={20} color="#0088B1" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrdersDetailsScreen;
