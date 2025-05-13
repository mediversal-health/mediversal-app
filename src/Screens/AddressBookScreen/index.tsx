/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import {CircleArrowLeftIcon} from 'lucide-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {AddressBookTypes} from '../../types';

type AddressType = 'Home' | 'Office' | 'Family & Friends' | 'Other';

const AddressBookScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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

  const handleInputChange = (
    field: keyof AddressBookTypes,
    value: string,
  ): void => {
    setFormData({...formData, [field]: value});
  };

  const handleAddressTypeSelect = (type: AddressType): void => {
    setSelectedAddressType(type);
    handleInputChange('addressType', type);
  };

  const handleSaveAndProceed = (): void => {
    console.log('Form data submitted:', formData);
  };

  const getInputStyle = (field: keyof AddressBookTypes) => [
    styles.input,
    focusedField === field && styles.inputFocused,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', gap: 6}}
          onPress={() => navigation.goBack()}>
          <CircleArrowLeftIcon size={32} color="#161D1F" />
          <Text style={styles.headerTitle}>Address Book</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Address Details</Text>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>
            House/Floor/Flat Number <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={getInputStyle('houseNo')}
            value={formData.houseNo}
            onChangeText={text => handleInputChange('houseNo', text)}
            placeholder="House/Floor/Flat Number"
            onFocus={() => setFocusedField('houseNo')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Area Details</Text>
          <TextInput
            style={getInputStyle('areaDetails')}
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
            style={getInputStyle('landmark')}
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
              style={getInputStyle('pincode')}
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
              style={getInputStyle('city')}
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
            style={getInputStyle('state')}
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
            style={getInputStyle('recipient')}
            value={formData.recipient}
            onChangeText={text => handleInputChange('recipient', text)}
            placeholder="Recipient Name"
            onFocus={() => setFocusedField('recipient')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>
            Phone Number <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={getInputStyle('phoneNumber')}
            value={formData.phoneNumber}
            onChangeText={text => handleInputChange('phoneNumber', text)}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            onFocus={() => setFocusedField('phoneNumber')}
            onBlur={() => setFocusedField(null)}
          />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  contactTitle: {
    marginTop: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#606060',
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  inputFocused: {
    borderColor: '#0088B1',
    backgroundColor: '#E8F4F7',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  addressTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  addressTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    backgroundColor: 'transparent',
    minWidth: 80,
  },
  selectedAddressType: {
    borderColor: '#0088B1',
    backgroundColor: '#0088B1',
  },
  addressTypeText: {
    fontSize: 10,
    color: '#000',
    marginLeft: 4,
  },
  selectedAddressTypeText: {
    color: '#FFFFFF',
  },
  infoText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 8,
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: '#0088B1',
    height: 52,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddressBookScreen;
