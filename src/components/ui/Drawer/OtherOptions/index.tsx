import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Bell, ChevronRight} from 'lucide-react-native';
import {Fonts} from '../../../../styles/fonts';

type OptionsItemProps = {
  title: string;
  onPress?: () => void;
  icon?: React.ReactElement<{color?: string; size?: number}>;
  iconColor?: string;
  iconSize?: number;
};

const OtherOptionsItem = ({
  title,
  onPress,
  icon,
  iconColor = '#0088B1',
  iconSize = 24,
}: OptionsItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftSection}>
        <View
          style={{
            marginTop: 5,
            backgroundColor: '#E8F4F7',
            padding: 4,
            borderRadius: 10,
          }}>
          {icon ? (
            React.cloneElement(icon, {
              color: iconColor,
              size: iconSize,
            })
          ) : (
            <DefaultIcon color={iconColor} size={iconSize} />
          )}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <ChevronRight size={20} color="#B0B6B8" />
    </TouchableOpacity>
  );
};

// Default icon component if none is provided
const DefaultIcon = ({color, size}: {color: string; size: number}) => (
  <Bell color={color} size={size} />
);

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
