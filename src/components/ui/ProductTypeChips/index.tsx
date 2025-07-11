/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Fonts} from '../../../styles/fonts';
import {SvgProps} from 'react-native-svg';

interface ChipProps {
  label: string;
  SvgComponent: React.ComponentType<SvgProps>;
  onPress?: () => void;
  isSelected?: boolean;
}

const Chip: React.FC<ChipProps> = ({
  label,
  SvgComponent,
  onPress,
  isSelected = false,
}) => {
  return (
    <View style={{flexDirection: 'column', width: 80, alignItems: 'center'}}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: isSelected ? '#E8F4F7' : '#FFFFFF',
          borderRadius: 14,
          paddingVertical: 20,
          paddingHorizontal: 12,
          marginHorizontal: 4,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: isSelected ? '#0088B1' : '#E0E0E0',
        }}>
        <SvgComponent width={24} height={24} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 10,
          color: isSelected ? '#0088B1' : '#333',
          fontFamily: Fonts.JakartaSemiBold,
          marginTop: 4,
        }}>
        {label}
      </Text>
    </View>
  );
};

interface ChipsProps {
  items: {label: string; SvgComponent: React.ComponentType<SvgProps>}[];
  onItemPress?: (label: string) => void;
  selectedItem?: string;
}

const Chips: React.FC<ChipsProps> = ({items, onItemPress, selectedItem}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 8,
        paddingVertical: 8,
      }}>
      {items.map((item, index) => (
        <Chip
          key={index}
          label={item.label}
          SvgComponent={item.SvgComponent}
          onPress={() => onItemPress?.(item.label)}
          isSelected={selectedItem === item.label}
        />
      ))}
    </ScrollView>
  );
};

export default Chips;
