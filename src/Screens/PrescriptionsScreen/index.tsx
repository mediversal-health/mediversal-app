/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { ChevronLeft, Search } from 'lucide-react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import styles from './index.styles';
import PrescriptionsCard from '../../components/cards/PrescriptionsCard';
import PendingPrescriptionsCard from '../../components/cards/PendingPrescriptionsCard';

const PrescriptionsScreen: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color="#0088B1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Prescriptions</Text>
      </View>

      <ScrollView style={{ backgroundColor: '#FFF' }}>
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

        <Text style={styles.text}>Pending Prescriptions</Text>
        <View style={styles.orderList}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PrescriptionVerification')}>
            <PendingPrescriptionsCard />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Verified Prescriptions</Text>
        <View style={styles.orderList}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PrescribedScreen')}>
            <PrescriptionsCard />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrescriptionsScreen;
