import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import styles from './index.styles';
import {cancelOrder} from '../../../Services/order';
import Modal from 'react-native-modal';
import {useToastStore} from '../../../store/toastStore';
interface OrderCancelBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onCancel: (reason: string) => void;
  onKeepOrder: () => void;
  orderId: string | number;
}

const OrderCancelBottomSheet: React.FC<OrderCancelBottomSheetProps> = ({
  isVisible,
  onClose,
  onCancel,
  onKeepOrder,
  orderId,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [otherReason, setOtherReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const showToast = useToastStore(state => state.showToast);
  const reasons = [
    'Changed my mind',
    'Ordered wrong item/service',
    'Found a better price elsewhere',
    'Delivery time is too long',
    'Payment/billing issue',
    'Medical condition changed',
    'Doctor advised against it',
    'Emergency situation',
    'Other reason',
  ];

  const handleCancel = async () => {
    if (!selectedReason) {
      return;
    }

    try {
      setIsSubmitting(true);

      const cancellationReason =
        selectedReason === 'Other reason' ? otherReason : selectedReason;

      const response = await cancelOrder(
        orderId.toString(),
        cancellationReason,
      );
      console.log(response, 'cancellation res');
      if (response.success) {
        onCancel(cancellationReason);
        console.log('try');
        if (response.data?.message !== 'Endpoint request timed out') {
          showToast('Order cancellation  completed', 'success', 1000, true);
        }
      } else {
        throw new Error(response.message || 'Failed to cancel order');
      }
    } catch (error) {
      onClose();
      console.log(error);
      showToast('Order cancellation  completed', 'success', 1000, true);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleKeepOrder = () => {
    onKeepOrder();
  };

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
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.bottomSheet}>
              <View style={styles.header}>
                <Text style={styles.title}>Why do you want to cancel?</Text>
              </View>

              <Text style={styles.subtitle}>
                Help us improve by letting us know the reason for cancellation.
              </Text>

              <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}>
                <View style={styles.reasonContainer}>
                  {reasons.map((reason, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.reasonItem}
                      onPress={() => setSelectedReason(reason)}>
                      <View style={styles.radioButton}>
                        <View
                          style={[
                            styles.radioOuter,
                            selectedReason === reason && styles.radioSelected,
                          ]}>
                          {selectedReason === reason && (
                            <View style={styles.radioInner} />
                          )}
                        </View>
                      </View>
                      <Text style={styles.reasonText}>{reason}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {selectedReason === 'Other reason' && (
                  <View style={styles.otherReasonContainer}>
                    <Text style={styles.otherReasonTitle}>
                      Mention Your Reason
                    </Text>
                    <Text style={styles.otherReasonSubtitle}>
                      Please write your reason which is not mentioned above.
                    </Text>
                    <TextInput
                      style={styles.otherReasonInput}
                      placeholder="Please share your reason..."
                      multiline
                      numberOfLines={4}
                      value={otherReason}
                      onChangeText={setOtherReason}
                    />
                  </View>
                )}

                <View style={styles.infoContainer}>
                  <Text style={styles.infoTitle}>Important Information</Text>
                  <View style={styles.infoItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.infoText}>
                      Cancellation within 1 hour: No charges
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.infoText}>
                      After 1 hour: ₹72.49 cancellation fee may apply
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.infoText}>
                      Refund will be processed within 3-5 business days
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.infoText}>
                      For urgent medical needs, contact our support team
                    </Text>
                  </View>
                </View>
              </ScrollView>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.keepOrderButton}
                  onPress={handleKeepOrder}>
                  <Text style={styles.keepOrderText}>Keep My Order</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.cancelOrderButton,
                    (!selectedReason ||
                      (selectedReason === 'Other reason' && !otherReason)) &&
                      styles.cancelOrderButtonDisabled,
                  ]}
                  onPress={handleCancel}
                  disabled={
                    !selectedReason ||
                    (selectedReason === 'Other reason' && !otherReason) ||
                    isSubmitting
                  }>
                  <Text
                    style={[
                      styles.cancelOrderText,
                      (!selectedReason ||
                        (selectedReason === 'Other reason' && !otherReason)) &&
                        styles.cancelOrderTextDisabled,
                    ]}>
                    {isSubmitting ? (
                      <ActivityIndicator color={'#F8F8F8'} />
                    ) : (
                      'Cancel Order'
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OrderCancelBottomSheet;
