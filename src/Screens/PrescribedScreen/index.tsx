/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './index.styles';
import {ChevronLeft, ChevronRight} from 'lucide-react-native';
import {Fonts} from '../../styles/fonts';
import {PrescribedOrder} from '../../types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import PrescribedCard from '../../components/cards/PrescribedCard';
import Whatsapp from './assets/svgs/Whatsapp.svg';
const PrescribedScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const allPrescribedOrders: PrescribedOrder[] = [
    {
      name: 'Lacto Calamine SPF 50 PA+++ UVA/UVB Sunscreen Lotion',
      orderId: 'ORD-123456',
      quantity: 'Tube - 50 gm',
      amount: '₹225.16',
      status: 'Approved',
    },
    {
      name: 'Lacto Calamine SPF 50 PA+++ UVA/UVB Sunscreen Lotion',
      orderId: 'ORD-123456',
      quantity: 'Tube - 50 gm',
      amount: '₹225.16',
      status: 'Approved',
    },
    {
      name: 'Lacto Calamine SPF 50 PA+++ UVA/UVB Sunscreen Lotion',
      orderId: 'ORD-123456',
      quantity: 'Tube - 50 gm',
      amount: '₹225.16',
      status: 'Clarification Needed',
    },
    {
      name: 'Lacto Calamine SPF 50 PA+++ UVA/UVB Sunscreen Lotion',
      orderId: 'ORD-123456',
      quantity: 'Tube - 50 gm',
      amount: '₹225.16',
      status: 'Approved',
    },
    {
      name: 'Lacto Calamine SPF 50 PA+++ UVA/UVB Sunscreen Lotion',
      orderId: 'ORD-123456',
      quantity: 'Tube - 50 gm',
      amount: '₹225.16',
      status: 'Approved',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={20} color="#0088B1" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>RX-2023-001</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.progressCircle}>
            <Text style={styles.uploadText}>Approved</Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 10,
              fontFamily: Fonts.JakartaRegular,
            }}>
            Estimated Time :{' '}
            <Text
              style={{fontFamily: Fonts.JakartaExtraBold, color: '#0088B1'}}>
              15 Minutes
            </Text>
          </Text>

          <Text style={styles.heading}>What happens during verification?</Text>
          <Text style={styles.description}>
            Our licensed pharmacist checks your prescription for completeness,
            appropriate dosage, potential drug interactions, and verifies that
            it's from a licensed medical practitioner.
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: Fonts.JakartaRegular,
                fontSize: 10,
                color: '#6D7578',
              }}>
              Learn more about our process
            </Text>
            <ChevronRight size={18} color={'#6D7578'} />
          </View>

          <View
            style={{
              borderRadius: 12,
              backgroundColor: '#FFD3D3',
              padding: 20,
              marginTop: 20,
              gap: 10,
            }}>
            <Text style={{fontFamily: Fonts.JakartaSemiBold}}>
              Clarification Needed
            </Text>
            <Text style={{fontFamily: Fonts.JakartaRegular}}>
              Our licensed pharmacist will reach out to you for clarification on
              the medication listed in your prescription. Expect a call from our
              certified pharmacy team shortly.
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontFamily: Fonts.JakartaSemiBold,
            marginTop: 20,
            marginLeft: 20,
            marginBottom: 10,
          }}>
          Prescribed Medicines
        </Text>

        <View style={styles.orderList}>
          {allPrescribedOrders.map((order, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('PrescribedScreen')}>
              <PrescribedCard key={index} order={order} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.contactButton}>
          <Whatsapp />
          <Text style={styles.contactButtonText}>Contact with Pharmacist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PrescribedScreen;
