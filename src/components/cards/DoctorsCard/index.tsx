import React from 'react';
import {View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Calendar, Clock} from 'lucide-react-native';
import BackgroundSVG from '../../../assests/svgs/Looper-1.svg';
import styles from './index.styles';

const DoctorsCard = () => {
  return (
    <LinearGradient
      colors={['rgba(0, 188, 212, 0.1)', '#00BCD4', '#0088B1']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.cardContainer}>
      <View style={styles.svgBottomLeft}>
        <BackgroundSVG width={162} height={157} strokeWidth={3} />
      </View>
      <View style={styles.svgFullOverlay}>
        <BackgroundSVG width="100%" height={100} strokeWidth={3} />
      </View>
      <View style={styles.statusBadge}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>Scheduled</Text>
      </View>
      <View style={styles.doctorInfoRow}>
        <Image
          source={require('./assests/pngs/DoctorAvatar.png')}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.doctorName}>Dr. Nishikant Kumar</Text>
          <Text style={styles.doctorSpecialty}>
            Orthopedic & Joint replacement
          </Text>
        </View>
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.scheduleRow}>
          <View style={styles.scheduleItem}>
            <Calendar color="#888" size={14} />
            <Text style={styles.scheduleText}>Monday, 3 March</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.scheduleItem}>
            <Clock color="#888" size={14} />
            <Text style={styles.scheduleText}>9:00am - 10:00am</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default DoctorsCard;
