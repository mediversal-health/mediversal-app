/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ChevronRight} from 'lucide-react-native';
import BackgroundSVG from '../../../assests/svgs/Looper-1.svg';
import styles from './index.styles';
type CardProps = {
  heading: string;
  subHeading: string;
  offer: string;
  price: string;
  onPress: () => void;
};

const PriceCard: React.FC<CardProps> = ({
  heading,
  subHeading,
  offer,
  price,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={['#00FF80', '#017DA2']}
        style={styles.topHalf}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={{position: 'absolute', bottom: -50, left: 0}}>
          <BackgroundSVG width={162} height={157} strokeWidth={2} />
        </View>

        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </LinearGradient>

      <View style={styles.bottomHalf}>
        <View>
          <Text style={styles.offer}>{offer}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 2,
            }}>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.strikePrice}> ₹999 </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Buy Now</Text>
          <ChevronRight height={15} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PriceCard;
