import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styles from './index.styles';

interface PaymentMethodModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectCOD?: () => void;
  onPayOnline?: () => void;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  isVisible,
  onClose,
  onSelectCOD,
  onPayOnline,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      animationOut="slideOutDown"
      animationOutTiming={250}
      onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Select Payment Method</Text>
          <Text style={styles.subtitle}>
            Choose how you would like to complete your purchase
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.locationButton} onPress={onSelectCOD}>
            <Text style={styles.locationButtonText}>
              Cash on Delivery (COD)
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.locationButton} onPress={onPayOnline}>
            <Text style={styles.locationButtonText}>Pay Online</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentMethodModal;
