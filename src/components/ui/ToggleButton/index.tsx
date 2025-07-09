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
              onPress={() => handleToggle(index === 0)}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  selected && styles.selectedToggleButtonText,
                ]}
              >
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
    alignItems: 'center',
    backgroundColor: '#e8f4f7',
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 24,
    padding: 4,
  },
  selectedToggleButton: {
    backgroundColor: '#0088B1',
    borderRadius: 8,
  },
  selectedToggleButtonText: {
    color: '#f8f8f8',
    fontWeight: '600',
  },
  toggleButton: {
    alignItems: 'center',
    flex: 1,
    padding: 12,
  },
  toggleButtonText: {
    color: '#666666',
    fontFamily: Fonts.JakartaBold,
    fontSize: 14,
  },
  toggleContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    flexDirection: 'row',
    flex: 1,
    overflow: 'hidden',
  },
});

export default ToggleButtons;
