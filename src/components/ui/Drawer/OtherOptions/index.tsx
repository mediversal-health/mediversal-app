import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Bell, ChevronRight} from 'lucide-react-native';
import {Fonts} from '../../../../styles/fonts';

type OptionsItemProps = {
  title: string;
  onPress?: () => void; // Add onPress prop
};

const OtherOptionsItem = ({title, onPress}: OptionsItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftSection}>
        <View style={{marginTop: 5}}>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    color: '#161D1F',
    marginTop: 6,
    fontFamily: Fonts.JakartaRegular,
  },
});

export default OtherOptionsItem;
