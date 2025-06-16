/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Mail,
  Phone,
  Calendar,
  UserPlus,
  LogOut,
  ChevronRight,
  MapPinned,
} from 'lucide-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Fonts} from '../../styles/fonts';
import {useAuthStore} from '../../store/authStore';
import {RootStackParamList} from '../../navigation';
import styles from './index.styles';
export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const clearAuthentication = useAuthStore(state => state.clearAuthentication);
  const handleLogout = () => {
    clearAuthentication();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color="#0088B1" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.JakartaSemiBold,
              color: '#111827',
            }}>
            Profile Page
          </Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: 'https://media.licdn.com/dms/image/v2/D4D35AQFKFZJBKim9aQ/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1677240001755?e=1750676400&v=beta&t=EfkLAdmamA6Tr7bTIjtaKH7-Xc2SWiRpTJ34fJgLuIw',
              }}
              style={styles.profileImage}
            />
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Firoz Ansari</Text>
            <Text style={styles.joinedDate}>Joined: March 8, 2025</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Information</Text>

            <View style={styles.infoItem}>
              <View style={styles.infoItemLeft}>
                <Mail size={20} color="#666" />
                <Text style={styles.infoLabel}>Email</Text>
              </View>
              <Text style={styles.infoValue}>firoz.ansari@mediversal.in</Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoItemLeft}>
                <Phone size={20} color="#666" />
                <Text style={styles.infoLabel}>Phone</Text>
              </View>
              <Text style={styles.infoValue}>+91 9512576842</Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoItemLeft}>
                <Calendar size={20} color="#666" />
                <Text style={styles.infoLabel}>Date of Birth</Text>
              </View>
              <Text style={styles.infoValue}>25 February, 1995</Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoItemLeft}>
                <UserPlus size={20} color="#666" />
                <Text style={styles.infoLabel}>Joined</Text>
              </View>
              <Text style={styles.infoValue}>26 March, 2025</Text>
            </View>

            <TouchableOpacity style={styles.AddressinfoItem}>
              <View style={styles.infoItemLeft}>
                <MapPinned size={20} color="#666" />
                <Text style={styles.infoLabel}>Address Book</Text>
              </View>
              <ChevronRight size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
              <View style={styles.infoItemLeft}>
                <LogOut size={20} color="#FF4444" />
                <Text style={styles.logoutLabel}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
