import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
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
import {useAuthStore} from '../../store/authStore';
import {saveCustomerAddress} from '../../Services/address';
type AddressType = 'Home' | 'Office' | 'Family & Friends' | 'Other';

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
    };
  },
  'params'
>;

const AddressBookScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<AddressBookScreenRouteProp>();
  const [isLoading, setIsLoading] = useState(false);
  const locationData = route.params?.location;
  const customer_id = useAuthStore(state => state.customer_id);
  console.log(customer_id);
  const [selectedAddressType, setSelectedAddressType] =
    useState<AddressType>('Home');
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
    if (locationData) {
      // Use the formatted address data if available, otherwise fallback to parsing
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
        // Fallback to the old parsing logic (you can keep this as a backup)
        const addressParts = locationData.address
          .split(',')
          .map(part => part.trim());

        const city =
          addressParts.length >= 3 ? addressParts[addressParts.length - 3] : '';
        const state =
          addressParts.length >= 2 ? addressParts[addressParts.length - 2] : '';
        // Look for a 5-6 digit number pattern for the pincode/zip
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

  const handleSaveAndProceed = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      let res;
      if (customer_id) {
        res = await saveCustomerAddress(customer_id.toString(), formData);
      }
      console.log(res);

      navigation.navigate('CartPage', {formData});
      console.log('Form data submitted:', formData);
    } catch (error) {
      console.error('Error saving address:', error);
      Alert.alert(
        'Error',
        'Failed to save address. Please try again.',
        [{text: 'OK'}],
        {cancelable: false},
      );
    } finally {
      setIsLoading(false);
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
              focusedField === 'Home_Floor_FlatNumber' && styles.inputFocused,
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
            <Text style={styles.errorText}>{errors.Home_Floor_FlatNumber}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Area Details</Text>
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
            <Text style={styles.inputLabel}>Pincode</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'PinCode' && styles.inputFocused,
                formData.PinCode !== 0 && styles.inputFilled,
              ]}
              value={formData.PinCode === 0 ? '' : String(formData.PinCode)}
              onChangeText={text => handleInputChange('PinCode', text)}
              placeholder="Pincode"
              keyboardType="number-pad"
              onFocus={() => setFocusedField('PinCode')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>City</Text>
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
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>State</Text>
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
              focusedField === 'Recipient_name' && styles.inputFocused,
              formData.Recipient_name !== '' && styles.inputFilled,
            ]}
            value={formData.Recipient_name}
            onChangeText={text => handleInputChange('Recipient_name', text)}
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
          Billing will be done using the recipient name on the prescription.
        </Text>

        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.disabledButton]}
          onPress={handleSaveAndProceed}
          disabled={isLoading}>
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Saving...' : 'Save & Proceed'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressBookScreen;
