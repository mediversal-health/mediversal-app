/* Core React hooks */
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {ChevronDown, ChevronLeft, Plus} from 'lucide-react-native';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {AddressBookTypes} from '../../types';
import styles from './index.styles';
import {useAuthStore} from '../../store/authStore';
import {
  getCustomerAddresses,
  saveCustomerAddress,
  updateCustomerAddress,
  deleteCustomerAddress,
} from '../../Services/address';
import AddressCard from '../../components/cards/AddressCard';
import {useAddressBookStore} from '../../store/addressStore';
import AddressActionModal from '../../components/modal/AddressActionModal';
import {StackNavigationProp} from '@react-navigation/stack';
import {Fonts} from '../../styles/fonts';
import AddressCardSkeleton from '../../components/cards/AddressCard/skeletons';
import {useToastStore} from '../../store/toastStore';

// Restrict address type to these string literals
type AddressType = 'Home' | 'Office' | 'Family & Friends' | 'Other';

// Typed wrapper around route.params for safer access
type AddressBookScreenRouteProp = RouteProp<
  {
    params: {
      location?: {
        title: string;
        address: string;
        coords: {
          latitude: number;
          longitude: number;
        };
        formattedAddress?: {
          street: string;
          area: string;
          city: string;
          state: string;
          pincode: number;
        };
      };
      fromLocationMap?: boolean;
      isFromProfile?: boolean;
    };
  },
  'params'
>;

// Handles listing, adding, editing, deleting & selecting addresses.
const AddressBookScreen: React.FC = () => {
  // Stack navigator for pushing/replacing screens
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<AddressBookScreenRouteProp>();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const locationData = route.params?.location;
  const customer_id = useAuthStore(state => state.customer_id);
  const fromLocationMap = route.params?.fromLocationMap || false;
  const isFromProfile = route.params?.isFromProfile || false;
  console.log(isFromProfile, 'isFromProfile');
  const [selectedAddressType, setSelectedAddressType] =
    useState<AddressType>('Home');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const {
    addresses,
    setAddresses,
    selectedAddress,
    setSelectedAddress,
    hasLoadedAddresses,
    setHasLoadedAddresses,
  } = useAddressBookStore();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAddressCardVisible, setIsAddressCardVisible] = useState(false);
  const [shouldNavigateAfterSave, setShouldNavigateAfterSave] = useState(false);
  const savedFormDataRef = useRef<AddressBookTypes | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const showToast = useToastStore(state => state.showToast);
  const [backPressCount, setBackPressCount] = useState(0);
  const [formData, setFormData] = useState<AddressBookTypes>({
    Address: '',
    Home_Floor_FlatNumber: '',
    Area_details: '',
    LandMark: '',
    City: '',
    State: '',
    Contact_details: '',
    Recipient_name: '',
    PhoneNumber: '',
    PinCode: 0,
    Country: '',
    Address_type: 'Home',
  });
  const [errors, setErrors] = useState<{
    [key in keyof AddressBookTypes]?: string;
  }>({});

  useEffect(() => {
    if (
      shouldNavigateAfterSave &&
      selectedAddress &&
      savedFormDataRef.current
    ) {
      setShouldNavigateAfterSave(false);
      navigation.replace('CartPage', {formData: savedFormDataRef.current});
      savedFormDataRef.current = null;
    }
  }, [selectedAddress, shouldNavigateAfterSave, navigation]);

  const fetchAddresses = useCallback(
    async (isRefreshing = false) => {
      try {
        if (!hasLoadedAddresses || isRefreshing) {
          if (!isRefreshing && !initialLoadComplete) {
            setIsLoading(true);
          }
          if (isRefreshing) {
            setRefreshing(true);
          }

          let res;
          if (customer_id) {
            res = await getCustomerAddresses(customer_id.toString());
            console.log('abcd');
          }
          setAddresses(res?.data || []);
          setHasLoadedAddresses(true);

          if (!initialLoadComplete) {
            const hasAddresses = res?.data && res.data.length > 0;
            setIsFormVisible(fromLocationMap || !hasAddresses);
            setIsAddressCardVisible(!fromLocationMap && hasAddresses);
            setInitialLoadComplete(true);
          }
        } else {
          if (fromLocationMap) {
            setIsFormVisible(true);
          } else {
            setIsAddressCardVisible(true);
          }
        }
      } catch (error) {
        console.log('Failed to fetch addresses:', error);
      } finally {
        if (!isRefreshing && !initialLoadComplete) {
          setIsLoading(false);
        }
        if (isRefreshing) {
          setRefreshing(false);
        }
      }
    },
    [
      customer_id,
      setAddresses,
      fromLocationMap,
      initialLoadComplete,
      setHasLoadedAddresses,
      hasLoadedAddresses,
    ],
  );

  const onRefresh = useCallback(() => {
    fetchAddresses(true);
  }, [fetchAddresses]);

  useEffect(() => {
    if (addresses.length === 0) {
      setIsFormVisible(true);
    }
    fetchAddresses();
  }, [fetchAddresses, addresses.length]);

  useEffect(() => {
    if (locationData) {
      if (locationData.formattedAddress) {
        setFormData(prevData => ({
          ...prevData,
          Home_Floor_FlatNumber: '',
          LandMark: '',
          Area_details:
            locationData.formattedAddress?.area || locationData.title || '',
          City: locationData.formattedAddress?.city || '',
          State: locationData.formattedAddress?.state || '',
          PinCode: locationData.formattedAddress?.pincode || 0,
        }));
      } else {
        const addressParts = locationData.address
          .split(',')
          .map(part => part.trim());

        const city =
          addressParts.length >= 3 ? addressParts[addressParts.length - 3] : '';
        const state =
          addressParts.length >= 2 ? addressParts[addressParts.length - 2] : '';
        const pincodeMatch = locationData.address.match(/\b\d{5,6}\b/);
        const pincode = pincodeMatch ? pincodeMatch[0] : '';

        setFormData(prevData => ({
          ...prevData,
          houseNo: '',
          landmark: '',
          areaDetails: locationData.title !== '' ? locationData.title : '',
          city,
          state,
          pincode,
        }));
      }
    }
  }, [locationData]);

  const handleInputChange = (
    field: keyof AddressBookTypes,
    value: string,
  ): void => {
    setFormData({...formData, [field]: value});
    setErrors(prev => ({...prev, [field]: undefined}));
  };

  const handleAddressTypeSelect = (type: AddressType): void => {
    setSelectedAddressType(type);
    handleInputChange('Address_type', type);
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.Home_Floor_FlatNumber.trim()) {
      newErrors.Home_Floor_FlatNumber = 'House number is required';
    }

    if (!formData.Area_details.trim()) {
      newErrors.Area_details = 'Area Details is required';
    }

    if (!formData.PinCode) {
      newErrors.PinCode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(String(formData.PinCode))) {
      newErrors.PinCode = 'Enter a valid 6-digit pincode';
    }

    if (!formData.City.trim()) {
      newErrors.City = 'City is required';
    }

    if (!formData.State.trim()) {
      newErrors.State = 'State is required';
    }

    if (!formData.Recipient_name.trim()) {
      newErrors.Recipient_name = 'Recipient name is required';
    }

    if (!formData.PhoneNumber.trim()) {
      newErrors.PhoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.PhoneNumber.trim())) {
      newErrors.PhoneNumber = 'Enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleEditAddress = (address: AddressBookTypes | null) => {
    if (!address) {
      return;
    }

    setSelectedAddress(address);
    setIsEditMode(true);

    setFormData(prev => ({
      ...prev,
      Customer_Address_id: address.Customer_Address_id,
      Home_Floor_FlatNumber: address.Home_Floor_FlatNumber || '',
      Area_details: address.Area_details || '',
      LandMark: address.LandMark || '',
      City: address.City || '',
      State: address.State || '',
      PinCode: address.PinCode || 0,
      Recipient_name: address.Recipient_name || '',
      PhoneNumber: address.PhoneNumber || '',
      Address: address.Address || '',
      Country: address.Country || '',
      Address_type: address.Address_type || 'Home',
      Contact_details: address.Contact_details || '',
    }));

    setSelectedAddressType((address.Address_type as AddressType) || 'Home');

    setIsAddressCardVisible(false);
    setModalVisible(false);
    setIsFormVisible(true);
  };

  const handleDeleteAddress = async () => {
    if (
      !selectedAddress ||
      !selectedAddress.Customer_Address_id ||
      !customer_id
    ) {
      return;
    }

    try {
      setIsLoading(true);

      await deleteCustomerAddress(
        customer_id.toString(),
        selectedAddress.Customer_Address_id.toString(),
      );

      const updatedAddresses = addresses.filter(
        addr =>
          addr.Customer_Address_id !== selectedAddress.Customer_Address_id,
      );
      setAddresses(updatedAddresses);

      if (
        selectedAddress?.Customer_Address_id ===
        selectedAddress.Customer_Address_id
      ) {
        setSelectedAddress(null);
      }

      setModalVisible(false);
      showToast('Address deleted successfully', 'success', 1000, true);
    } catch (error) {
      console.error('Error deleting address:', error);
      showToast(
        'Failed to delete address. Please try again.',
        'error',
        1000,
        true,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAddress = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      if (customer_id) {
        if (isEditMode && formData.Customer_Address_id) {
          setIsUpdating(true);
          await updateCustomerAddress(
            customer_id.toString(),
            formData.Customer_Address_id.toString(),
            formData,
          );
          setIsUpdating(false);
        } else {
          await saveCustomerAddress(customer_id.toString(), formData);
        }
      }
      setHasLoadedAddresses(false);
      await fetchAddresses();

      savedFormDataRef.current = formData;
      setSelectedAddress(formData);

      if (isFromProfile) {
        setIsFormVisible(false);
      } else {
        setShouldNavigateAfterSave(true);
      }

      if (!shouldNavigateAfterSave) {
        resetForm();
      }
    } catch (error) {
      console.error('Error saving address:', error);
      setShouldNavigateAfterSave(false);
      savedFormDataRef.current = null;
      showToast(
        'Failed to save address. Please try again.',
        'error',
        1000,
        true,
      );
    } finally {
      setIsLoading(false);
      setIsEditMode(false);
    }
  };

  const resetForm = () => {
    setFormData({
      Address: '',
      Home_Floor_FlatNumber: '',
      Area_details: '',
      LandMark: '',
      City: '',
      State: '',
      Contact_details: '',
      Recipient_name: '',
      PhoneNumber: '',
      PinCode: 0,
      Country: '',
      Address_type: 'Home',
    });
    setSelectedAddressType('Home');
    setErrors({});
  };

  const handleSaveAndProceed = async (): Promise<void> => {
    await handleSaveAddress();
  };

  const handleProceedWithSelectedAddress = (): void => {
    if (!selectedAddress) {
      showToast('Please select an address', 'error', 1000, true);

      return;
    }
    navigation.replace('CartPage', {formData: selectedAddress});
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  const handleBackNavigation = useCallback(() => {
    if (isFromProfile && isFormVisible) {
      // First back press when form is visible - hide the form
      setIsFormVisible(false);
      setBackPressCount(1);
    } else if (isFromProfile && backPressCount === 1) {
      // Second back press - actually go back
      navigation.goBack();
    } else {
      // Default behavior for non-profile or other cases
      navigation.goBack();
    }
  }, [isFromProfile, isFormVisible, backPressCount, navigation]);

  // Also add this useEffect to reset the counter when form visibility changes
  useEffect(() => {
    if (!isFormVisible) {
      setBackPressCount(0);
    }
  }, [isFormVisible]);
  if (isLoading && !initialLoadComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackNavigation}>
            <ChevronLeft size={20} color="#0088B1" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Address Book</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View>
            <AddressCardSkeleton count={3} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackNavigation}>
          <ChevronLeft size={20} color="#0088B1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Address Book</Text>
      </View>

      <View style={{justifyContent: 'space-between', flex: 1}}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0088B1']}
              tintColor="#0088B1"
            />
          }>
          {!isFromProfile && addresses.length > 0 && (
            <TouchableOpacity
              style={
                isAddressCardVisible
                  ? styles.dropdownHeaderOpen
                  : styles.dropdownHeaderTop
              }
              onPress={() => {
                setIsAddressCardVisible(true);
                setIsFormVisible(false);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}>
                  <Text style={styles.dropdownHeaderText}>Select Address</Text>
                </View>
                <View
                  style={{
                    transform: [
                      {rotate: isAddressCardVisible ? '180deg' : '0deg'},
                    ],
                  }}>
                  <ChevronDown size={20} color="#000" />
                </View>
              </View>
            </TouchableOpacity>
          )}

          {!isFromProfile && isAddressCardVisible && (
            <View>
              {refreshing ? (
                <AddressCardSkeleton count={3} />
              ) : (
                addresses.map((addr, idx) => (
                  <AddressCard
                    key={idx}
                    title={addr.Address_type}
                    address={`${addr.Recipient_name}, ${addr.Home_Floor_FlatNumber}, ${addr.Area_details}, ${addr.City},${addr.State} ${addr.PinCode}`}
                    phoneNumber={addr.PhoneNumber}
                    selected={
                      selectedAddress?.Customer_Address_id ===
                      addr.Customer_Address_id
                    }
                    onPress={() => setSelectedAddress(addr)}
                    onMorePress={() => {
                      setSelectedAddress(addr);
                      setModalVisible(true);
                    }}
                  />
                ))
              )}
            </View>
          )}
          {isFormVisible && isFromProfile ? null : (
            <TouchableOpacity
              style={
                isFormVisible
                  ? styles.dropdownHeaderOpen
                  : styles.dropdownHeader
              }
              onPress={() => {
                setIsFormVisible(true);
                setIsAddressCardVisible(false);
                setIsEditMode(false);
                resetForm();
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}>
                  {isFromProfile && <Plus size={18} color="#161D1F" />}
                  <Text style={styles.dropdownHeaderText}>Add New Address</Text>
                </View>
                <View
                  style={{
                    transform: [{rotate: isFormVisible ? '180deg' : '0deg'}],
                  }}>
                  <ChevronDown size={18} color="#161D1F" />
                </View>
              </View>
            </TouchableOpacity>
          )}
          {isFromProfile && !isFormVisible && (
            <>
              {addresses.length > 0 && (
                <Text
                  style={{
                    color: '#899193',
                    fontFamily: Fonts.JakartaLight,
                    fontSize: 12,
                  }}>
                  Your saved addresses
                </Text>
              )}
              <View
                style={{
                  marginTop: 12,
                }}>
                {refreshing ? (
                  <AddressCardSkeleton count={3} />
                ) : (
                  addresses.map((addr, idx) => (
                    <AddressCard
                      key={idx}
                      title={addr.Address_type}
                      address={`${addr.Recipient_name}, ${addr.Home_Floor_FlatNumber}, ${addr.Area_details}, ${addr.City},${addr.State} ${addr.PinCode}`}
                      phoneNumber={addr.PhoneNumber}
                      selected={
                        selectedAddress?.Customer_Address_id ===
                        addr.Customer_Address_id
                      }
                      onPress={() => setSelectedAddress(addr)}
                      onMorePress={() => {
                        setSelectedAddress(addr);
                        setModalVisible(true);
                      }}
                    />
                  ))
                )}
              </View>
            </>
          )}
          {isFormVisible && (
            <>
              <Text style={styles.sectionTitle}>Address Details</Text>

              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>
                  House/Floor/Flat Number <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === 'Home_Floor_FlatNumber' &&
                      styles.inputFocused,
                    formData.Home_Floor_FlatNumber !== '' && styles.inputFilled,
                  ]}
                  value={formData.Home_Floor_FlatNumber}
                  onChangeText={text =>
                    handleInputChange('Home_Floor_FlatNumber', text)
                  }
                  placeholder="House/Floor/Flat Number"
                  onFocus={() => setFocusedField('Home_Floor_FlatNumber')}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.Home_Floor_FlatNumber && (
                  <Text style={styles.errorText}>
                    {errors.Home_Floor_FlatNumber}
                  </Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>
                  Area Details <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === 'Area_details' && styles.inputFocused,
                    formData.Area_details !== '' && styles.inputFilled,
                  ]}
                  value={formData.Area_details}
                  onChangeText={text => handleInputChange('Area_details', text)}
                  placeholder="Area Details"
                  onFocus={() => setFocusedField('Area_details')}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.Area_details && (
                  <Text style={styles.errorText}>{errors.Area_details}</Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Landmark</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === 'LandMark' && styles.inputFocused,
                    formData.LandMark !== '' && styles.inputFilled,
                  ]}
                  value={formData.LandMark}
                  onChangeText={text => handleInputChange('LandMark', text)}
                  placeholder="Landmark"
                  onFocus={() => setFocusedField('LandMark')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>
                    Pincode <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedField === 'PinCode' && styles.inputFocused,
                      formData.PinCode !== 0 && styles.inputFilled,
                    ]}
                    value={
                      formData.PinCode === 0 ? '' : String(formData.PinCode)
                    }
                    onChangeText={text => handleInputChange('PinCode', text)}
                    placeholder="Pincode"
                    keyboardType="number-pad"
                    onFocus={() => setFocusedField('PinCode')}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.PinCode && (
                    <Text style={styles.errorText}>{errors.PinCode}</Text>
                  )}
                </View>

                <View style={[styles.formGroup, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>
                    City<Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedField === 'City' && styles.inputFocused,
                      formData.City !== '' && styles.inputFilled,
                    ]}
                    value={formData.City}
                    onChangeText={text => handleInputChange('City', text)}
                    placeholder="City"
                    onFocus={() => setFocusedField('City')}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.City && (
                    <Text style={styles.errorText}>{errors.City}</Text>
                  )}
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>
                  State <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === 'State' && styles.inputFocused,
                    formData.State !== '' && styles.inputFilled,
                  ]}
                  value={formData.State}
                  onChangeText={text => handleInputChange('State', text)}
                  placeholder="State"
                  onFocus={() => setFocusedField('State')}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.State && (
                  <Text style={styles.errorText}>{errors.State}</Text>
                )}
              </View>

              <Text style={[styles.sectionTitle, styles.contactTitle]}>
                Contact Details
              </Text>

              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Address Type</Text>
                <ScrollView
                  style={styles.addressTypeContainer}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {(
                    [
                      'Home',
                      'Office',
                      'Family & Friends',
                      'Other',
                    ] as AddressType[]
                  ).map(type => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.addressTypeButton,
                        selectedAddressType === type &&
                          styles.selectedAddressType,
                      ]}
                      onPress={() => handleAddressTypeSelect(type)}>
                      <Text
                        style={[
                          styles.addressTypeText,
                          selectedAddressType === type &&
                            styles.selectedAddressTypeText,
                        ]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>
                  Recipient <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === 'Recipient_name' && styles.inputFocused,
                    formData.Recipient_name !== '' && styles.inputFilled,
                  ]}
                  value={formData.Recipient_name}
                  onChangeText={text =>
                    handleInputChange('Recipient_name', text)
                  }
                  placeholder="Recipient Name"
                  onFocus={() => setFocusedField('Recipient_name')}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.Recipient_name && (
                  <Text style={styles.errorText}>{errors.Recipient_name}</Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>
                  Phone Number <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === 'PhoneNumber' && styles.inputFocused,
                    formData.PhoneNumber !== '' && styles.inputFilled,
                  ]}
                  value={formData.PhoneNumber}
                  onChangeText={text => handleInputChange('PhoneNumber', text)}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  onFocus={() => setFocusedField('phoneNumber')}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.PhoneNumber && (
                  <Text style={styles.errorText}>{errors.PhoneNumber}</Text>
                )}
              </View>

              <Text style={styles.infoText}>
                Note: Billing will be done using the recipient name.
              </Text>
            </>
          )}
        </ScrollView>
        <View style={{marginHorizontal: 16}}>
          {isAddressCardVisible && !isFromProfile && !isFormVisible && (
            <TouchableOpacity
              style={[
                styles.saveButton,
                !selectedAddress && styles.disabledButton,
              ]}
              onPress={handleProceedWithSelectedAddress}
              disabled={!selectedAddress}>
              <Text style={styles.saveButtonText}>
                Proceed with Selected Address
              </Text>
            </TouchableOpacity>
          )}

          {isFormVisible && (
            <TouchableOpacity
              style={[
                styles.saveButton,
                (isLoading || isUpdating) && styles.disabledButton,
              ]}
              onPress={handleSaveAndProceed}
              disabled={isLoading || isUpdating}>
              <Text style={styles.saveButtonText}>
                {isUpdating
                  ? 'Updating...'
                  : isLoading
                  ? 'Saving...'
                  : isEditMode
                  ? 'Update Address'
                  : 'Save & Proceed'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <AddressActionModal
        visible={modalVisible}
        onClose={handleModalClose}
        selectedAddress={selectedAddress}
        onEditAddress={handleEditAddress}
        onDeleteAddress={handleDeleteAddress}
      />
    </SafeAreaView>
  );
};

export default AddressBookScreen;
