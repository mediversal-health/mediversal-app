/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Mail,
  Phone,
  Calendar,
  LogOut,
  ChevronRight,
  MapPinned,
  UserRoundXIcon,
  UserPen,
  UserCheck,
  X,
} from 'lucide-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FontColors, Fonts} from '../../styles/fonts';
import {useAuthStore} from '../../store/authStore';
import {RootStackParamList} from '../../navigation';
import styles from './index.styles';
import {useScreenStore} from '../../store/screenSelector';
import {launchImageLibrary} from 'react-native-image-picker';
import {useToastStore} from '../../store/toastStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Platform} from 'react-native';
import {DeleteUser, updateProfile} from '../../Services/auth';
import {useOrdersStore} from '../../store/ordersStore';

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const currentScreen = useScreenStore(state => state.currentScreen);
  const {
    first_name,
    last_name,
    email,
    phoneNumber,
    birthday,
    joinedDate,
    customer_id,
    profileImage,

    setAuthentication,
    clearAuthentication,
  } = useAuthStore();

  const showToast = useToastStore(state => state.showToast);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dobDate, setDobDate] = useState(
    birthday ? new Date(birthday) : new Date(1995, 1, 25),
  );
  console.log(dobDate);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [tempImage, setTempImage] = useState<{uri: string} | null>(null);
  const clearOrders = useOrdersStore(state => state.clearOrders);
  const isBirthdayLocked = !!birthday;

  const displayImage =
    tempImage ||
    (profileImage
      ? typeof profileImage === 'string'
        ? {uri: profileImage}
        : profileImage
      : null);
  const [userData, setUserData] = useState({
    first_name: first_name || 'Guest ',
    last_name: last_name || 'User',
    email: email || null,
    phone: phoneNumber || 'Enter your phone number',
    dob: birthday
      ? new Date(birthday).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      : '25 February, 1995',
    joined: joinedDate
      ? new Date(joinedDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      : '26 March, 2025',
    photo: profileImage
      ? typeof profileImage === 'string'
        ? {uri: profileImage}
        : profileImage
      : require('../../assests/pngs/MainAvatar.png'),
  });

  const handleLogout = () => {
    clearAuthentication();
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  console.log(typeof customer_id);
  if (!userData.photo) {
    return <ActivityIndicator size="large" />;
  }
  const handleSave = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const formattedDob = dobDate.toISOString().split('T')[0];
      const currentAuthState = useAuthStore.getState();

      let imageData;
      if (tempImage?.uri) {
        const uriParts = tempImage.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        imageData = {
          uri: tempImage.uri,
          type: `image/${fileType}`,
          name: `profile.${fileType}`,
        };
      }

      const payload: {
        first_name: string | undefined;
        last_name: string | undefined;
        email: string;
        phone_number: string;
        image?: {uri: string; type: string; name: string} | undefined;
        birthday?: string;
      } = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email ?? '',
        phone_number: userData.phone.replace(/\D/g, ''),
        image: imageData,
        ...(!isBirthdayLocked ? {birthday: formattedDob} : {}),
      };

      await updateProfile(customer_id?.toString() ?? '', payload);

      setAuthentication({
        ...currentAuthState,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phoneNumber: userData.phone,
        birthday: isBirthdayLocked ? birthday : formattedDob,
        profileImage: tempImage?.uri || profileImage,
      });

      showToast('Profile updated successfully', 'success', 1000, true);
      setIsEditMode(false);
      setTempImage(null);
    } catch (error: any) {
      console.error('Error updating profile:', error?.response?.data);
      const errorMsg = error?.response?.data?.message;

      if (errorMsg === 'Birthday can only be updated once.') {
        showToast(
          'You can only update your birthday once.',
          'error',
          1500,
          true,
        );
      } else if (errorMsg) {
        showToast(errorMsg, 'error', 1500, true);
      } else {
        showToast('Failed to update profile', 'error', 1500, true);
      }
    } finally {
      setIsLoading(false);
    }
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

  const handleDeleteUser = async () => {
    clearOrders();
    try {
      await DeleteUser(customer_id);
      clearAuthentication();
      navigation.navigate('Login');
      showToast('Account deleted successfully', 'success', 1500, true);
    } catch (error) {
      showToast('Failed to delete account', 'error', 1500, true);
    }
  };

  const selectImage = () => {
    openImagePicker();
  };

  const openImagePicker = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.8,
      });

      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        showToast('Error selecting image', 'error', 1000, true);
        return;
      }

      if (response.assets?.[0]?.uri) {
        setTempImage({uri: response.assets[0].uri});
      }
    } catch (error) {
      console.error('Image picker error:', error);
      showToast('Failed to select image', 'error', 1000, true);
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
                color: FontColors.textBlack,
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
            {displayImage && !imageError ? (
              <Image
                source={displayImage}
                style={styles.profileImage}
                onError={() => setImageError(true)}
                defaultSource={require('../../assests/pngs/MainAvatar.png')}
              />
            ) : (
              <View style={styles.fallbackAvatar}>
                <Text style={styles.fallbackText}>
                  {email ? email.charAt(0).toUpperCase() : 'GU'}
                </Text>
              </View>
            )}
            {isEditMode && (
              <View style={styles.editPhotoOverlay}>
                <Text style={styles.editPhotoText}>Change Photo</Text>
              </View>
            )}
          </TouchableOpacity>
          {!isEditMode && (
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {userData.first_name}
                {userData.last_name}
              </Text>
              <Text style={styles.joinedDate}>Joined: {userData.joined}</Text>
            </View>
          )}
          <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
              <Text style={styles.sectionTitle}>Information</Text>
              {isEditMode ? (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleSave}
                  disabled={isLoading}>
                  {isLoading ? (
                    <ActivityIndicator color="#0088B1" />
                  ) : (
                    <>
                      <View style={{flexDirection: 'row', gap: 5}}>
                        <UserCheck size={16} color="#0088B1" />
                        <Text style={styles.EditTitle}>Update Profile</Text>
                      </View>
                      <TouchableOpacity
                        style={{flexDirection: 'row', gap: 2}}
                        onPress={() => setIsEditMode(false)}>
                        <X size={16} color="#EB5757" />
                        <Text style={styles.CancelTitle}> Cancel </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={toggleEditMode}>
                  <UserPen size={18} color="#0088B1" />
                  <Text style={styles.EditTitle}>Edit Info</Text>
                </TouchableOpacity>
              )}
            </View>
            {/*
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
            </View> */}

            <View style={styles.infoItem}>
              <View style={styles.infoItemLeft}>
                <Mail size={18} color="#666" />
                <Text style={styles.infoLabel}>First Name</Text>
              </View>
              {isEditMode ? (
                <TextInput
                  style={[
                    styles.infoValue,
                    {borderBottomWidth: 1, borderColor: '#0088B1'},
                  ]}
                  value={userData.first_name}
                  onChangeText={text => handleChange('first_name', text)}
                  keyboardType="default"
                />
              ) : (
                <Text style={styles.infoValue}>{userData.first_name}</Text>
              )}
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoItemLeft}>
                <Mail size={18} color="#666" />
                <Text style={styles.infoLabel}>Last Name</Text>
              </View>
              {isEditMode ? (
                <TextInput
                  style={[
                    styles.infoValue,
                    {borderBottomWidth: 1, borderColor: '#0088B1'},
                  ]}
                  value={userData.last_name}
                  onChangeText={text => handleChange('last_name', text)}
                  keyboardType="default"
                />
              ) : (
                <Text style={styles.infoValue}>{userData.last_name}</Text>
              )}
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoItemLeft}>
                <Phone size={18} color="#666" />
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
                <Calendar size={18} color="#666" />
                <Text style={styles.infoLabel}>Date of Birth</Text>
              </View>
              {isEditMode ? (
                <TouchableOpacity
                  disabled={isBirthdayLocked}
                  style={[
                    styles.infoValue,
                    {
                      alignItems: 'flex-end',
                      opacity: isBirthdayLocked ? 0.4 : 1,
                    },
                  ]}
                  onPress={() => {
                    if (!isBirthdayLocked) {
                      setShowDatePicker(true);
                    }
                  }}>
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
            {isBirthdayLocked && isEditMode && (
              <Text style={{color: '#888', fontSize: 10, marginTop: 4}}>
                Birthday is locked and cannot be changed again.
              </Text>
            )}

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

            {/* <View style={styles.infoItem}>
              <View style={styles.infoItemLeft}>
                <UserPlus size={20} color="#666" />
                <Text style={styles.infoLabel}>Joined</Text>
              </View>
              <Text style={styles.infoValue}>{userData.joined}</Text>
            </View> */}

            {!isEditMode && (
              <>
                <TouchableOpacity
                  style={styles.AddressinfoItem}
                  onPress={() =>
                    navigation.navigate('AddressBookScreen', {
                      isFromProfile: true,
                    })
                  }>
                  <View style={styles.AddressItemLeft}>
                    <MapPinned size={18} color="#666" />
                    <Text style={styles.addressLable}>Address Book</Text>
                  </View>
                  <ChevronRight size={18} color="#666" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.logoutItem}
                  onPress={handleLogout}>
                  <View style={styles.infoItemLeft}>
                    <LogOut size={18} color="#FF4444" />
                    <Text style={styles.logoutLabel}>Logout</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{paddingBottom: 12}}
                  onPress={handleDeleteUser}>
                  <View style={styles.infoItemLeft}>
                    <UserRoundXIcon size={18} color="#000" />
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
