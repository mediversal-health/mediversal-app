// src/components/modals/PrescriptionGuideModal.tsx

import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import styles from './index.styles';
import Slip from './assets/slip.svg';

const screenHeight = Dimensions.get('window').height;

interface Props {
  visible: boolean;
  onClose: () => void;
}

const carouselData = [
  {
    caption: 'What is a valid prescription?',
    description:
      'A valid prescription should contain doctor, patient, medicine details & the doctor’s signature.',
  },
  {
    caption: 'Avoid handwritten unclear prescriptions',
    description:
      'Ensure the prescription is legible and all details are visible for faster processing.',
  },
  {
    caption: 'Include all pages if multi-page',
    description:
      'Sometimes prescriptions have multiple pages; upload all to avoid rejection.',
  },
];

const PrescriptionGuideModal: React.FC<Props> = ({ visible, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % carouselData.length);
  };
  const { caption, description } = carouselData[currentIndex];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { height: screenHeight * 0.7 }]}>
          <Text style={styles.modalTitle}>Prescription Upload Guide</Text>
          <View style={styles.imageContainer}>
            <Slip />
            <TouchableOpacity style={styles.arrowIcon} onPress={handleNext}>
              <ChevronRight size={24} color="#0088B1" />
            </TouchableOpacity>
          </View>
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>{caption}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Okay, I understand</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PrescriptionGuideModal;
