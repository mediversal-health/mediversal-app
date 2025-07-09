/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, ViewStyle, Platform } from 'react-native';
import { SvgProps } from 'react-native-svg';
import styles from './index.styles';
interface CategoryCardProps {
  SvgImage: React.FC<SvgProps>;

  title?: string;

  placement?: 'top' | 'center' | 'bottom';

  style?: ViewStyle;

  imageWidth?: number;

  imageHeight?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  SvgImage,
  title,
  placement = 'center',
  style = {},
  imageWidth = Platform.OS === 'ios' ? 40 : 45,
  imageHeight = 40,
}) => {
  const getImageAlignment = () => {
    switch (placement) {
      case 'top':
        return {
          alignItems: 'center' as const,
          justifyContent: 'flex-start' as const,
        };
      case 'bottom':
        return {
          alignItems: 'center' as const,
          justifyContent: 'flex-end' as const,
        };
      case 'center':
      default:
        return {
          alignItems: 'center' as const,
          justifyContent: 'center' as const,
        };
    }
  };

  return (
    <View style={{ display: 'flex' }}>
      <View style={[styles.container, style]}>
        <View style={[styles.imageContainer, getImageAlignment()]}>
          <SvgImage width={imageWidth} height={imageHeight} />
        </View>
      </View>
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

export default CategoryCard;
