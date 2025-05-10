import React, {FC} from 'react';
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
  return <Logo width={size} height={size} fill={fillColor} />;
};

export default CircleCard;
