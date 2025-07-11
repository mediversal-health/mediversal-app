import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.styles';
import {SvgProps} from 'react-native-svg';

interface PromoBannerProps {
  discount: string;
  title: string;
  validity: string;
  SvgImage?: React.ComponentType<SvgProps>;
}

const BrandPromoBanner: React.FC<PromoBannerProps> = ({
  discount,
  title,
  validity,
  SvgImage,
}) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <LinearGradient
        colors={['#0088B1', '#FFFFFF']}
        start={{x: 2, y: 0}}
        end={{x: 0, y: 2}}
        style={styles.gradientContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.discountText}>{discount}</Text>
          <Text style={styles.descriptionText}>{title}</Text>
          <Text style={styles.validityText}>{validity}</Text>
        </View>
        <View style={styles.imageContainer}>
          {SvgImage && <SvgImage width="130%" height="130%" />}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default BrandPromoBanner;
