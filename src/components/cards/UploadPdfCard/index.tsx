import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {pick} from '@react-native-documents/picker';
import styles from './index.styles';

export interface UploadPDFPickerHandle {
  openDocumentPicker: () => void;
}

interface UploadPDFPickerProps {
  onCancel?: () => void;
}

const UploadPDFPicker = forwardRef<UploadPDFPickerHandle, UploadPDFPickerProps>(
  ({onCancel}, ref) => {
    const [selectedFileName, setSelectedFileName] = useState<string | null>(
      null,
    );
    const [showModal, setShowModal] = useState(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const openDocumentPicker = async () => {
      setIsPickerOpen(true);
      try {
        const [result] = await pick({type: ['application/pdf']});
        setIsPickerOpen(false);

        if (result?.name) {
          setSelectedFileName(result.name || 'Untitled PDF');
        } else {
          // User canceled the picker
          handleCancel();
        }
      } catch (error: any) {
        setIsPickerOpen(false);
        if (!error.message?.includes('cancel')) {
          console.error('Document picking error:', error);
        }
        handleCancel();
      }
    };

    useImperativeHandle(ref, () => ({
      openDocumentPicker,
    }));

    const handleProceed = () => {
      // Handle proceed logic (e.g., navigate or store the file)
      console.log('Proceed with:', selectedFileName);
    };

    const handleCancel = () => {
      if (selectedFileName) {
        // Show confirmation modal if there's a selected file
        setShowModal(true);
      } else {
        // No file selected, just close
        handleClose();
      }
    };

    const handleClose = () => {
      setSelectedFileName(null);
      setShowModal(false);
      onCancel?.(); // Notify parent about cancel
    };

    const confirmRemove = () => {
      handleClose();
    };

    const closeModal = () => {
      setShowModal(false);
    };

    if (isPickerOpen) {
      return (
        <View style={styles.pickerLoading}>
          <ActivityIndicator size="large" color="#0088B1" />
          <Text style={styles.loadingText}>Fetching...</Text>
        </View>
      );
    }

    return selectedFileName ? (
      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>Selected Prescription PDF:</Text>
        <Text style={styles.fileName}>{selectedFileName}</Text>

        <View style={styles.footerButtonsColumn}>
          <TouchableOpacity style={styles.proceed} onPress={handleProceed}>
            <Text style={styles.proceedText}>Proceed to next step</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancel} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Confirmation Modal */}
        <Modal
          visible={showModal}
          transparent
          animationType="fade"
          onRequestClose={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Are you sure?</Text>
              <Text style={styles.modalMessage}>
                Going back will remove the prescription that you have uploaded.
                Are you sure you want to remove the uploaded prescription?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalRemoveBtn}
                  onPress={confirmRemove}>
                  <Text style={styles.modalRemoveText}>
                    Remove Prescription PDF
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalCancelBtn}
                  onPress={closeModal}>
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    ) : null;
  },
);

export default UploadPDFPicker;
