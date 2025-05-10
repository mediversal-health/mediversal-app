import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {ChevronDown, DollarSign} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import ArrowPattern from './ArrowPattern';
import styles from './index.style';

interface CheaperAlternativeProps {
  discountPercentage: number;
  children: React.ReactNode;
}

const CheaperAlternative: React.FC<CheaperAlternativeProps> = ({
  discountPercentage = 5,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    const toValue = isExpanded ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsExpanded(!isExpanded);
  };

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const animatedStyles = {
    transform: [{rotate: rotateInterpolate}],
  };

  return (
    <View style={styles.container}>
      {/* Arrow pattern only in top left - always visible with higher z-index */}
      <View style={styles.arrowPatternContainer}>
        <ArrowPattern backgroundColor="transparent" />
      </View>

      {/* Header bar (always blue) */}
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpand}
        activeOpacity={0.7}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <DollarSign size={20} color="#0088B1" />
          </View>
          <Text style={styles.headerText}>
            {discountPercentage}% Cheaper alternative available
          </Text>
        </View>
        <Animated.View style={animatedStyles}>
          <ChevronDown size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>

      {/* Expanded content with gradient background */}
      {isExpanded && (
        <View>
          <LinearGradient
            colors={['#0088B1', '#F8F8F8']}
            style={styles.backgroundGradient}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
          />
          <View style={styles.content}>{children}</View>
        </View>
      )}
    </View>
  );
};

export default CheaperAlternative;
