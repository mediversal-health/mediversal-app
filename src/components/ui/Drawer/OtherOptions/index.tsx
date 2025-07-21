import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Bell, ChevronRight} from 'lucide-react-native';
import {FontColors, Fonts} from '../../../../styles/fonts';

type OptionsItemProps = {
  title: string;
  onPress?: () => void;
  icon?: React.ReactElement<{
    color?: string;
    size?: number;
    strokeWidth?: number;
  }>;
  iconColor?: string;
  iconSize?: number;
};

const OtherOptionsItem = ({
  title,
  onPress,
  icon,
  iconColor = FontColors.primary,
  iconSize = 20,
}: OptionsItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftSection}>
        <View
          style={{
            marginTop: 5,
            backgroundColor: FontColors.secondary,
            padding: 8,
            borderRadius: 6,
          }}>
          {icon ? (
            React.cloneElement(icon, {
              color: iconColor,
              size: iconSize,
              strokeWidth: 1.25,
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
    alignItems: 'center',
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
    color: FontColors.textBlack,
    marginTop: 6,
    fontFamily: Fonts.JakartaMedium,
  },
});

export default OtherOptionsItem;
