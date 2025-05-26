/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Users, MoreHorizontal} from 'lucide-react-native';
import styles from './index.styles';
import LocationPin from './assets/svgs/Location pin.svg';
import House from './assets/svgs/3d house.svg';
import Building from './assets/svgs/Building.svg';

interface AddressCardProps {
  title?: string;
  address?: string;
  phoneNumber?: string;
  onPress?: () => void;
  selected?: boolean;
  onMorePress?: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  title = 'Home',
  address = '',
  phoneNumber = '',
  onPress,
  selected = false,
  onMorePress,
}) => {
  const getIcon = () => {
    switch (title.toLowerCase()) {
      case 'home':
        return <House width={16} height={16} />;
      case 'family & friends':
      case 'family':
        return <Users size={16} color="#0088B1" />;
      case 'office':
        return <Building width={16} height={16} />;
      default:
        return <LocationPin width={16} height={16} />;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {borderColor: selected ? '#0088B1' : '#E0E0E0'},
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.radioButtonContainer}>
        <View style={styles.radioOuter}>
          {selected && <View style={styles.radioInner} />}
        </View>
      </View>

      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>{getIcon()}</View>
          <View style={{flex: 1}}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.addressText}>{address}</Text>
            <View style={styles.phoneSection}>
              <Text style={styles.phoneLabel}>Phone Number: </Text>
              <Text style={styles.phoneNumber}>{phoneNumber}</Text>
            </View>
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                onMorePress?.();
              }}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MoreHorizontal size={30} color="#0088B1" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AddressCard;
