/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
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
  UserRoundXIcon,
  UserPen,
  UserCheck,
} from 'lucide-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Fonts} from '../../styles/fonts';
import {useAuthStore} from '../../store/authStore';
import {RootStackParamList} from '../../navigation';
import styles from './index.styles';
import {useScreenStore} from '../../store/screenSelector';
import {launchImageLibrary} from 'react-native-image-picker';
import {useToastStore} from '../../store/toastStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Platform} from 'react-native';
export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const currentScreen = useScreenStore(state => state.currentScreen);
  const clearAuthentication = useAuthStore(state => state.clearAuthentication);
  const showToast = useToastStore(state => state.showToast);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dobDate, setDobDate] = useState(new Date(1995, 1, 25));
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Guest User',
    email: 'Guest@mediversal.in',
    phone: '+91 9512576842',
    dob: '25 February, 1995',
    joined: '26 March, 2025',
    photo: require('../../assests/pngs/MainAvatar.png'),
  });

  const handleLogout = () => {
    clearAuthentication();
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = () => {
    showToast('Profile updated successfully', 'success', 500, true);
    setIsEditMode(false);
  };

  const handleChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };
  const selectImage = () => {
    openImagePicker();
  };
  const openImagePicker = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0,
      quality: 0.8,
    });
    if (
      response.assets &&
      response.assets.length > 0 &&
      response.assets[0].uri
    ) {
      const source = {uri: response.assets[0].uri};
      setUserData(prev => ({
        ...prev,
        photo: source,
      }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {currentScreen !== 'Profile' && (
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
        )}
        <View style={styles.profileCard}>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={isEditMode ? selectImage : undefined}
            disabled={!isEditMode}>
            <Image source={userData.photo} style={styles.profileImage} />
            {isEditMode && (
              <View style={styles.editPhotoOverlay}>
                <Text style={styles.editPhotoText}>Change Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            {isEditMode ? (
              <TextInput
                style={[
                  styles.profileName,
                  {borderBottomWidth: 1, borderColor: '#0088B1'},
                ]}
                value={userData.name}
                onChangeText={text => handleChange('name', text)}
              />
            ) : (
              <Text style={styles.profileName}>{userData.name}</Text>
            )}
            <Text style={styles.joinedDate}>Joined: {userData.joined}</Text>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
              <Text style={styles.sectionTitle}>Information</Text>
              {isEditMode ? (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleSave}>
                  <UserCheck size={20} color="#0088B1" />
                  <Text style={styles.EditTitle}>Update Profile</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={toggleEditMode}>
                  <UserPen size={20} color="#0088B1" />
                  <Text style={styles.EditTitle}>Edit Info</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoItemLeft}>
                <Mail size={20} color="#666" />
                <Text style={styles.infoLabel}>Email</Text>
              </View>
              {isEditMode ? (
                <TextInput
                  style={[
                    styles.infoValue,
                    {borderBottomWidth: 1, borderColor: '#0088B1'},
                  ]}
                  value={userData.email}
                  onChangeText={text => handleChange('email', text)}
                  keyboardType="email-address"
                />
              ) : (
                <Text style={styles.infoValue}>{userData.email}</Text>
              )}
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoItemLeft}>
                <Phone size={20} color="#666" />
                <Text style={styles.infoLabel}>Phone</Text>
              </View>
              {isEditMode ? (
                <TextInput
                  style={[
                    styles.infoValue,
                    {borderBottomWidth: 1, borderColor: '#0088B1'},
                  ]}
                  value={userData.phone}
                  onChangeText={text => handleChange('phone', text)}
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.infoValue}>{userData.phone}</Text>
              )}
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoItemLeft}>
                <Calendar size={20} color="#666" />
                <Text style={styles.infoLabel}>Date of Birth</Text>
              </View>
              {isEditMode ? (
                <TouchableOpacity
                  style={[
                    styles.infoValue,
                    {
                      alignItems: 'flex-end',
                    },
                  ]}
                  onPress={() => setShowDatePicker(true)}>
                  <Text
                    style={{
                      textAlign: 'right',
                      width: '100%',

                      fontFamily: Fonts.JakartaRegular,
                      fontSize: 10,
                    }}>
                    {userData.dob}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={[styles.infoValue, {textAlign: 'right'}]}>
                  {userData.dob}
                </Text>
              )}
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={dobDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                maximumDate={new Date()}
                style={{justifyContent: 'flex-end'}}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setDobDate(selectedDate);
                    handleChange('dob', formatDate(selectedDate));
                  }
                }}
              />
            )}

            <View style={styles.infoItem}>
              <View style={styles.infoItemLeft}>
                <UserPlus size={20} color="#666" />
                <Text style={styles.infoLabel}>Joined</Text>
              </View>
              <Text style={styles.infoValue}>{userData.joined}</Text>
            </View>
            {!isEditMode && (
              <>
                <TouchableOpacity
                  style={styles.AddressinfoItem}
                  onPress={() =>
                    navigation.navigate('AddressBookScreen', {
                      isFromProfile: true,
                    })
                  }>
                  <View style={styles.infoItemLeft}>
                    <MapPinned size={20} color="#666" />
                    <Text style={styles.infoLabel}>Address Book</Text>
                  </View>
                  <ChevronRight size={20} color="#666" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.logoutItem}
                  onPress={handleLogout}>
                  <View style={styles.infoItemLeft}>
                    <LogOut size={20} color="#FF4444" />
                    <Text style={styles.logoutLabel}>Logout</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.logoutItem}
                  onPress={handleLogout}>
                  <View style={styles.infoItemLeft}>
                    <UserRoundXIcon size={20} color="#000" />
                    <Text style={styles.DeleteUserLabel}>Delete User</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
