import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styles from './index.styles';
import { LocateFixed, MapPin } from 'lucide-react-native';

interface LocationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectCurrentLocation?: () => void;
  onEnterManually?: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({
  isVisible,
  onClose,
  onSelectCurrentLocation,
  onEnterManually,
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
      onBackdropPress={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Deliver to</Text>
          <Text style={styles.subtitle}>
            Please choose one of the options displayed.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={onSelectCurrentLocation}
          >
            <LocateFixed color={'#0088B1'} />
            <Text style={styles.locationButtonText}>Current Location</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.manuallocationButton}
            onPress={onEnterManually}
          >
            <MapPin color={'#FFF'} />
            <Text style={styles.manuallocationButtonText}>
              Enter Location Manually
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;
