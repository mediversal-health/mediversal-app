/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Bell, ChevronRight} from 'lucide-react-native';
import {Fonts} from '../../../../styles/fonts';

type OptionsItemProps = {
  title: string;
  description: string;
};

const OptiionsItem = ({title, description}: OptionsItemProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.leftSection}>
        <View style={{marginTop: 5}}>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  textContainer: {
    flexShrink: 1,
    color: '#0088B1',
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.JakartaBold,
    color: '#0088B1',
  },
  description: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
    fontFamily: Fonts.JakartaRegular,
  },
});

export default OptiionsItem;
