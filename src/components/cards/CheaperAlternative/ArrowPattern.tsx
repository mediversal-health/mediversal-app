import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MoveDown } from 'lucide-react-native';

interface ArrowPatternProps {
  backgroundColor?: string;
}

const ArrowPattern: React.FC<ArrowPatternProps> = ({
  backgroundColor = '#E8F4F7',
}) => {
  // Create an array with random positions and sizes for arrows
  const createArrows = () => {
    const arrows = [];
    const count = 20;

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 10 + 30;
      const top = Math.random() * 40;
      const left = Math.random() * 40;
      const opacity = Math.random() * 0.5 + 0.2;

      arrows.push(
        <View
          key={i}
          style={[
            styles.arrowContainer,
            {
              top: `${top}%`,
              left: `${left}%`,
              opacity,
              width: 84,
            },
          ]}
        >
          <MoveDown size={size} color="#D9D9D9" />
        </View>,
      );
    }

    return arrows;
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {createArrows()}
    </View>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    position: 'absolute',
  },
  container: {
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 0,
  },
});

export default ArrowPattern;
