import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { ChevronRight, Edit, Trash } from 'lucide-react-native';
import { AddressBookTypes } from '../../../types';
import styles from './index.styles';

interface AddressActionModalProps {
  visible: boolean;
  onClose: () => void;
  selectedAddress: AddressBookTypes | null;
  onEditAddress: (address: AddressBookTypes | null) => void;
  onDeleteAddress: () => Promise<void>;
}

const AddressActionModal: React.FC<AddressActionModalProps> = ({
  visible,
  onClose,
  selectedAddress,
  onEditAddress,
  onDeleteAddress,
}) => {
  const handleDeletePress = () => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: onDeleteAddress,
          style: 'destructive',
        },
      ],
    );
  };

  const handleEditPress = () => {
    onEditAddress(selectedAddress);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select Option</Text>

              <TouchableOpacity
                style={styles.modalOption}
                onPress={handleDeletePress}
              >
                <Trash size={20} color="#000" style={styles.modalIcon} />
                <Text style={styles.modalOptionText}>Delete Address</Text>
                <ChevronRight size={20} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalOption}
                onPress={handleEditPress}
              >
                <Edit size={20} color="#000" style={styles.modalIcon} />
                <Text style={styles.modalOptionText}>Edit Address</Text>
                <ChevronRight size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddressActionModal;
