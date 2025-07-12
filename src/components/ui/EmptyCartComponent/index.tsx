import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
import {Heart, Pill, Stethoscope, Shield} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Fonts} from '../../../styles/fonts';

const EmptyCartComponent: React.FC = () => {
  const {height} = Dimensions.get('window');

  return (
    <View style={[styles.container, {minHeight: height - 200}]}>
      {/* Background decorative elements */}
      <View style={styles.decorativeElements}>
        <View style={[styles.floatingIcon, styles.floatingIcon1]}>
          <Heart size={24} color="#0088B1" opacity={0.2} />
        </View>
        <View style={[styles.floatingIcon, styles.floatingIcon2]}>
          <Pill size={20} color="#50B57F" opacity={0.2} />
        </View>
        <View style={[styles.floatingIcon, styles.floatingIcon3]}>
          <Stethoscope size={28} color="#FE90E2" opacity={0.2} />
        </View>
        <View style={[styles.floatingIcon, styles.floatingIcon4]}>
          <Shield size={22} color="#0088B1" opacity={0.2} />
        </View>
      </View>

      {/* Main content area */}
      <View style={styles.mainContent}>
        {/* Central medical icon with pulse effect */}
        <View style={styles.centralIconContainer}>
          <View style={styles.pulseCircle1} />
          <View style={styles.pulseCircle2} />
          <View style={styles.pulseCircle3} />
          <LinearGradient
            colors={['#0088B1', '#50B57F']}
            style={styles.medicalBag}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <View style={styles.bagBody}>
              <View style={styles.cross}>
                <View style={styles.crossHorizontal} />
                <View style={styles.crossVertical} />
              </View>
            </View>
            <View style={styles.bagHandle} />
          </LinearGradient>
        </View>

        {/* Text content */}
        <View style={styles.textContainer}>
          <Text style={styles.mainTitle}>Your Cart is Empty</Text>
          <Text style={styles.subtitle}>Your wellness journey starts here</Text>
        </View>

        {/* Health-related feature highlights */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Shield size={18} color="#0088B1" />
            </View>
            <Text style={styles.featureText}>Verified Products</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Heart size={18} color="#50B57F" />
            </View>
            <Text style={styles.featureText}>Health Certified</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Stethoscope size={18} color="#FE90E2" />
            </View>
            <Text style={styles.featureText}>Expert Approved</Text>
          </View>
        </View>
      </View>

      {/* Bottom health pattern */}
      <View style={styles.bottomPattern}>
        <View style={styles.healthWave} />
        <View style={styles.medicinePattern}>
          {Array.from({length: 8}).map((_, index) => (
            <View
              key={index}
              style={[
                styles.medicineItem,
                {
                  opacity: Math.random() * 0.1 + 0.05,
                  transform: [
                    {rotate: `${Math.random() * 360}deg`},
                    {scale: Math.random() * 0.5 + 0.5},
                  ],
                },
              ]}>
              <Pill size={12} color="#0088B1" />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
    position: 'relative',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingIcon: {
    position: 'absolute',
    padding: 12,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  floatingIcon1: {
    top: '15%',
    right: '10%',
  },
  floatingIcon2: {
    top: '25%',
    left: '8%',
  },
  floatingIcon3: {
    bottom: '35%',
    right: '15%',
  },
  floatingIcon4: {
    bottom: '45%',
    left: '12%',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  centralIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  pulseCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#0088B1',
    opacity: 0.1,
  },
  pulseCircle2: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#50B57F',
    opacity: 0.15,
  },
  pulseCircle3: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0088B1',
    opacity: 0.2,
  },
  medicalBag: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0088B1',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 10,
  },
  bagBody: {
    width: 60,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bagHandle: {
    position: 'absolute',
    top: -8,
    width: 40,
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
  },
  cross: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossHorizontal: {
    width: 20,
    height: 4,
    backgroundColor: '#0088B1',
    borderRadius: 2,
    position: 'absolute',
  },
  crossVertical: {
    width: 4,
    height: 20,
    backgroundColor: '#0088B1',
    borderRadius: 2,
    position: 'absolute',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  mainTitle: {
    fontSize: 28,
    fontFamily: Fonts.JakartaBold || 'System',
    color: '#161D1F',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: Fonts.JakartaMedium || 'System',
    color: '#0088B1',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureText: {
    fontSize: 12,
    fontFamily: Fonts.JakartaMedium || 'System',
    color: '#6B7280',
    textAlign: 'center',
  },
  bottomPattern: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    overflow: 'hidden',
  },
  healthWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#E8F4F7',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  medicinePattern: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
  medicineItem: {
    padding: 8,
  },
});

export default EmptyCartComponent;
