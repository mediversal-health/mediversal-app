import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Vector84 from './assets/svgs/Vector 84.svg';
import Vector85 from './assets/svgs/Vector 85.svg';
import styles from './index.styles';
interface ImmunityCardProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  onPressReadMore: () => void;
}

const ImmunityCard: React.FC<ImmunityCardProps> = ({
  title,
  subtitle,
  buttonText = 'Read More',
  onPressReadMore,
}) => {
  return (
    <LinearGradient colors={['#0088B1', '#40C4FF']} style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPressReadMore}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

      <View style={styles.svgContainer}>
        <Vector84 width="100%" height="100%" style={styles.svgAbsolute} />
        <Vector85 width="100%" height="100%" style={styles.svgAbsolute} />
      </View>
    </LinearGradient>
  );
};

export default ImmunityCard;
