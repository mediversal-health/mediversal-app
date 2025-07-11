import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.styles';
import {SvgProps} from 'react-native-svg';
import {Fonts} from '../../../styles/fonts';

interface ConsultDoctorProps {
  Header: string;
  subTittle: string;
  SvgImage?: React.ComponentType<SvgProps>;
}

const ConsultDoctorBanner: React.FC<ConsultDoctorProps> = ({
  Header,
  subTittle,
  SvgImage,
}) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <LinearGradient
        colors={['#FFE3C1', '#FFFFFF']}
        start={{x: 2, y: 0}}
        end={{x: 0, y: 2}}
        style={styles.gradientContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.imageTextWrapper}>
            <View style={styles.imageContainer}>
              {SvgImage && <SvgImage width="70%" height="70%" />}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.HeaderText}>{Header}</Text>
              <Text style={styles.subTittleText}>{subTittle}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.consultButton}>
            <Text style={styles.consultButtonText}>Consult a Doctor</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ConsultDoctorBanner;
