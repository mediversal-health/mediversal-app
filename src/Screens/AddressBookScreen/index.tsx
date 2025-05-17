import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {ChevronLeft} from 'lucide-react-native';
import {
  NavigationProp,
  useNavigation,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {AddressBookTypes} from '../../types';
import styles from './index.styles';
type AddressType = 'Home' | 'Office' | 'Family & Friends' | 'Other';

type AddressBookScreenRouteProp = RouteProp<
  {params: {location?: {title: string; address: string}}},
  'params'
>;

const AddressBookScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<AddressBookScreenRouteProp>();
  const locationData = route.params?.location;

  const [selectedAddressType, setSelectedAddressType] =
    useState<AddressType>('Home');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formData, setFormData] = useState<AddressBookTypes>({
    houseNo: '',
    areaDetails: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    recipient: '',
    phoneNumber: '',
    addressType: 'Home',
  });

  const [errors, setErrors] = useState<{
    [key in keyof AddressBookTypes]?: string;
  }>({});

  useEffect(() => {
    if (locationData) {
      const addressParts = locationData.address
        .split(',')
        .map(part => part.trim());
      const city =
        addressParts.length >= 3 ? addressParts[addressParts.length - 3] : '';
      const state =
        addressParts.length >= 2 ? addressParts[addressParts.length - 2] : '';
      const pincode = addressParts.find(part => /^\d{6}$/.test(part)) || '';

      setFormData(prevData => ({
        ...prevData,
        areaDetails: locationData.title,
        landmark: addressParts[0] || '',
        city,
        state,
        pincode,
      }));
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
    handleInputChange('addressType', type);
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.houseNo.trim()) {
      newErrors.houseNo = 'House number is required';
    }

    if (!formData.recipient.trim()) {
      newErrors.recipient = 'Recipient name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAndProceed = (): void => {
    if (validateForm()) {
      navigation.navigate('CartPage', {formData});
      console.log('Form data submitted:', formData);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color="#0088B1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Address Book</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Address Details</Text>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>
            House/Floor/Flat Number <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              focusedField === 'houseNo' && styles.inputFocused,
              formData.houseNo !== '' && styles.inputFilled,
            ]}
            value={formData.houseNo}
            onChangeText={text => handleInputChange('houseNo', text)}
            placeholder="House/Floor/Flat Number"
            onFocus={() => setFocusedField('houseNo')}
            onBlur={() => setFocusedField(null)}
          />
          {errors.houseNo && (
            <Text style={styles.errorText}>{errors.houseNo}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Area Details</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === 'areaDetails' && styles.inputFocused,
              formData.areaDetails !== '' && styles.inputFilled,
            ]}
            value={formData.areaDetails}
            onChangeText={text => handleInputChange('areaDetails', text)}
            placeholder="Area Details"
            onFocus={() => setFocusedField('areaDetails')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Landmark</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === 'landmark' && styles.inputFocused,
              formData.landmark !== '' && styles.inputFilled,
            ]}
            value={formData.landmark}
            onChangeText={text => handleInputChange('landmark', text)}
            placeholder="Landmark"
            onFocus={() => setFocusedField('landmark')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <View style={styles.formRow}>
          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Pincode</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'pincode' && styles.inputFocused,
                formData.pincode !== '' && styles.inputFilled,
              ]}
              value={formData.pincode}
              onChangeText={text => handleInputChange('pincode', text)}
              placeholder="Pincode"
              keyboardType="number-pad"
              onFocus={() => setFocusedField('pincode')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>City</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'city' && styles.inputFocused,
                formData.city !== '' && styles.inputFilled,
              ]}
              value={formData.city}
              onChangeText={text => handleInputChange('city', text)}
              placeholder="City"
              onFocus={() => setFocusedField('city')}
              onBlur={() => setFocusedField(null)}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>State</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === 'state' && styles.inputFocused,
              formData.state !== '' && styles.inputFilled,
            ]}
            value={formData.state}
            onChangeText={text => handleInputChange('state', text)}
            placeholder="State"
            onFocus={() => setFocusedField('state')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <Text style={[styles.sectionTitle, styles.contactTitle]}>
          Contact Details
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Address Type</Text>
          <View style={styles.addressTypeContainer}>
            {(
              ['Home', 'Office', 'Family & Friends', 'Other'] as AddressType[]
            ).map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.addressTypeButton,
                  selectedAddressType === type && styles.selectedAddressType,
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
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>
            Recipient <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              focusedField === 'recipient' && styles.inputFocused,
              formData.recipient !== '' && styles.inputFilled,
            ]}
            value={formData.recipient}
            onChangeText={text => handleInputChange('recipient', text)}
            placeholder="Recipient Name"
            onFocus={() => setFocusedField('recipient')}
            onBlur={() => setFocusedField(null)}
          />
          {errors.recipient && (
            <Text style={styles.errorText}>{errors.recipient}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>
            Phone Number <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              focusedField === 'phoneNumber' && styles.inputFocused,
              formData.phoneNumber !== '' && styles.inputFilled,
            ]}
            value={formData.phoneNumber}
            onChangeText={text => handleInputChange('phoneNumber', text)}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            onFocus={() => setFocusedField('phoneNumber')}
            onBlur={() => setFocusedField(null)}
          />
          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          )}
        </View>

        <Text style={styles.infoText}>
          Billing will be done using the recipient name on the prescription.
        </Text>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveAndProceed}>
          <Text style={styles.saveButtonText}>Save & Proceed</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressBookScreen;
