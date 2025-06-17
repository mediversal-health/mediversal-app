/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View} from 'react-native';
import {SvgProps} from 'react-native-svg';

interface CircleCardProps {
  logo: FC<SvgProps>;
  size?: number;
  fillColor?: string;
}

const CircleCard: React.FC<CircleCardProps> = ({
  logo: Logo,
  size = 120,
  fillColor = '#000000',
}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#F8F8F8',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Logo width={size - 30} height={size - 30} fill={fillColor} />
    </View>
  );
};

export default CircleCard;
