import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Text,
} from 'react-native';
import { Fonts } from '../../../styles/fonts';

interface ToggleButtonsProps {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  isMobile,
  setIsMobile,
}) => {
  const handleToggle = (value: boolean) => {
    LayoutAnimation.easeInEaseOut();
    setIsMobile(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        {['Mobile Number', 'Email'].map((label, index) => {
          const selected = isMobile === (index === 0);
          return (
            <TouchableOpacity
              key={label}
              style={[
                styles.toggleButton,
                selected && styles.selectedToggleButton,
              ]}
              onPress={() => handleToggle(index === 0)}>
              <Text
                style={[
                  styles.toggleButtonText,
                  selected && styles.selectedToggleButtonText,
                ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    marginBottom: 24,
    backgroundColor: '#e8f4f7',
    borderRadius: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  selectedToggleButton: {
    backgroundColor: '#0088B1',
    borderRadius: 8,
  },
  toggleButtonText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: Fonts.JakartaBold,
  },
  selectedToggleButtonText: {
    color: '#f8f8f8',
    fontWeight: '600',
  },
});

export default ToggleButtons;
