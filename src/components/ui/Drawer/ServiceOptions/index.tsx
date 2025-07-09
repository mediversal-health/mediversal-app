/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, ChevronRight } from 'lucide-react-native';
import { Fonts } from '../../../../styles/fonts';

type OptionsItemProps = {
  title: string;
  description: string;
};

const OptiionsItem = ({ title, description }: OptionsItemProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.leftSection}>
        <View style={{ marginTop: 5 }}>
          <Bell size={24} color="#B0B6B8" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
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
  description: {
    color: '#666',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 10,
    marginTop: 2,
  },
  leftSection: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  textContainer: {
    color: '#0088B1',
    flexShrink: 1,
  },
  title: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
    fontSize: 14,
  },
});

export default OptiionsItem;
