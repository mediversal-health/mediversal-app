/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, ChevronRight } from 'lucide-react-native';
import { Fonts } from '../../../../styles/fonts';

type OptionsItemProps = {
  title: string;
  onPress?: () => void; // Add onPress prop
};

const OtherOptionsItem = ({ title, onPress }: OptionsItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftSection}>
        <View style={{ marginTop: 5 }}>
          <Bell size={24} color="#B0B6B8" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <ChevronRight size={20} color="#B0B6B8" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  leftSection: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  textContainer: {
    alignItems: 'center',
    flexShrink: 1,
  },
  title: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
});

export default OtherOptionsItem;
