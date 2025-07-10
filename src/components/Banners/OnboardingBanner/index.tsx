import { ChevronRight, FileUp, Search, ShoppingBag } from 'lucide-react-native';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.styles';
const OnboardingSteps = () => {
  return (
    <LinearGradient
      colors={['#0088B1', '#F8F8F8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: -1 }}
      style={styles.gradientBox}>
      <View style={styles.onboardingContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>New to Mediversal?</Text>
          <Text style={styles.subtitleText}>
            3 quick steps to get your medicines safely
          </Text>
        </View>

        <View style={styles.stepsRow}>
          <Text style={styles.stepLabel}>Step 1</Text>
          <ChevronRight color="#0088B1" size={16} />
          <Text style={styles.stepLabel}>Step 2</Text>
          <ChevronRight color="#0088B1" size={16} />
          <Text style={styles.stepLabel}>Step 3</Text>
        </View>

        <View style={styles.boxesContainer}>
          <View style={styles.stepBox}>
            <Search color="#0088B1" size={24} />
            <Text style={styles.stepText}>Find Medicine</Text>
          </View>

          <View style={styles.stepBox}>
            <FileUp color="#0088B1" size={24} />
            <Text style={styles.stepText}>Upload Rx</Text>
          </View>

          <View style={styles.stepBox}>
            <ShoppingBag color="#0088B1" size={24} />
            <Text style={styles.stepText}>Checkout</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default OnboardingSteps;
