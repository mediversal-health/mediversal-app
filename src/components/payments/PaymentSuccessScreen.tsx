import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {CheckCircle, Download, Share2} from 'lucide-react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from './PaymentSuccessScreen.styles';

Dimensions.get('window');

const PaymentSuccessScreen = ({route}: any) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {paymentId, amount} = route.params;

  const handleDownloadReceipt = () => {
    // Add download receipt functionality
    console.log('Download receipt');
  };

  const handleShareReceipt = () => {
    // Add share receipt functionality
    console.log('Share receipt');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {/* Background decoration */}
        <View style={styles.backgroundDecoration} />
        <View style={styles.backgroundCircle} />

        <View style={styles.content}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <CheckCircle width={60} height={60} color="#FFFFFF" />
            </View>
            <View style={styles.iconGlow} />
          </View>

          {/* Success Message */}
          <Text style={styles.title}>Payment Successful!</Text>
          <Text style={styles.subtitle}>
            Your transaction has been completed successfully
          </Text>

          {/* Payment Details Card */}
          <View style={styles.detailsCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Transaction Details</Text>
            </View>

            <View style={styles.amountSection}>
              <Text style={styles.amountLabel}>Amount Paid</Text>
              <Text style={styles.amountValue}>
                ₹{amount?.toFixed(2) || '0.00'}
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transaction ID</Text>
              <Text
                style={styles.detailValue}
                numberOfLines={1}
                ellipsizeMode="tail">
                {paymentId || 'N/A'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Method</Text>
              <Text style={styles.detailValue}>UPI</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>
                {new Date().toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleDownloadReceipt}>
              <Download width={18} height={18} color="#0088B1" />
              <Text style={styles.secondaryButtonText}>Download Receipt</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleShareReceipt}>
              <Share2 width={18} height={18} color="#0088B1" />
              <Text style={styles.secondaryButtonText}>Share</Text>
            </TouchableOpacity>
          </View>

          {/* Primary Action Button */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Layout')}>
            <Text style={styles.primaryButtonText}>Continue Shopping</Text>
          </TouchableOpacity>

          {/* Support Link */}
          <TouchableOpacity style={styles.supportLink}>
            <Text style={styles.supportText}>Need help? Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentSuccessScreen;
