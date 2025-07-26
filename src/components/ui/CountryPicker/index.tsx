import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import CountryPicker, {Country} from 'react-native-country-picker-modal';
import styles from './index.styles';

interface CountryPickerProps {
  onSelectCountry: (country: Country) => void;
}

const CountryPickerComponent: React.FC<CountryPickerProps> = ({
  onSelectCountry,
}) => {
  const [countryCode, setCountryCode] = useState<Country['cca2']>('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleSelect = (country: Country) => {
    if (!country) return; // Add null check

    setCountryCode(country.cca2 as Country['cca2']);
    setCallingCode(country.callingCode?.[0] || '91');
    onSelectCountry(country);
    setIsPickerVisible(false);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setIsPickerVisible(true)}>
      <CountryPicker
        withFlagButton
        withEmoji // Add this if you want emoji flags
        withCallingCode
        withFilter
        countryCode={countryCode}
        onSelect={handleSelect}
        visible={isPickerVisible}
        onClose={() => setIsPickerVisible(false)}
        preferredCountries={['IN', 'US', 'GB']} // Add preferred countries
      />
      <Text style={styles.callingCodeText}>+{callingCode}</Text>
    </TouchableOpacity>
  );
};

export default CountryPickerComponent;
