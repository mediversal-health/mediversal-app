import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {pick} from '@react-native-documents/picker';
import {
  Camera,
  FileText,
  Image as ImageIcon,
  UploadIcon,
  X,
} from 'lucide-react-native';

import {uploadPrescriptions} from '../../../Services/prescription';
import {useAuthStore} from '../../../store/authStore';
import {useToastStore} from '../../../store/toastStore';
import styles from './index.styles';
import {UploadPickerHandle} from '../../../types';

interface PrescriptionUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  isVisible,
  onClose,
  onUploadSuccess,
}) => {
  const [fileType, setFileType] = useState<'image' | 'pdf'>('image');
  const [images, setImages] = useState<string[]>([]);
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const customer_id = useAuthStore(state => state.customer_id);
  const customer_name = useAuthStore(state => state.first_name);
  const showToast = useToastStore(state => state.showToast);

  const handleTakePhoto = async () => {
    try {
      setFileType('image');
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        cameraType: 'back',
        saveToPhotos: true, // Optional: save to device photos
      });

      if (!result.didCancel && result.assets) {
        const newImages = result.assets.map((asset: any) => asset.uri || '');
        setImages([...images, ...newImages]);
      }
    } catch (error) {
      console.log('Camera error:', error);
      showToast('Failed to take photo', 'error', 1000, true);
    }
  };
  const selectImage = async () => {
    try {
      setFileType('image');
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 5 - images.length,
      });
      if (!result.didCancel && result.assets) {
        const newImages = result.assets.map(asset => asset.uri || '');
        setImages([...images, ...newImages]);
      }
    } catch (error) {
      console.log('Image picker error:', error);
      showToast('Failed to select image', 'error', 1000, true);
    }
  };

  const selectPDF = async () => {
    setFileType('pdf');
    try {
      const result = await pick({
        mode: 'open',
        type: ['application/pdf'],
        multiple: true,
        maxFiles: 5 - pdfs.length,
      });
      if (result) {
        const newPdfs = result.map((file: any) => ({
          uri: file.uri,
          type: file.type || 'application/pdf',
          name: file.name || `document_${Date.now()}.pdf`,
        }));
        setPdfs([...pdfs, ...newPdfs]);
      }
    } catch (error) {
      console.log('Document picker error:', error);
      showToast('Failed to select PDF', 'error', 1000, true);
    }
  };

  const removeFile = (index: number) => {
    if (fileType === 'image') {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
    } else {
      const newPdfs = [...pdfs];
      newPdfs.splice(index, 1);
      setPdfs(newPdfs);
    }
  };

  const handleProceed = async () => {
    if (!customer_id) {
      showToast('User ID not found. Please login again.', 'error', 1000, true);
      return;
    }

    const fileCount = fileType === 'pdf' ? pdfs.length : images.length;
    if (fileCount > 5) {
      showToast(
        'You can only upload up to 5 files at a time',
        'error',
        1000,
        true,
      );
      return;
    }

    setIsUploading(true);
    try {
      const files =
        fileType === 'pdf'
          ? pdfs
          : images.map(uri => ({
              uri,
              type: 'image/jpeg',
              name: uri.split('/').pop() || `image_${Date.now()}.jpg`,
            }));

      await uploadPrescriptions(customer_id.toString(), files);
      onUploadSuccess();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        console.log('Upload failed:', error.message);
        showToast('Upload failed: ' + error.message, 'error', 1000, true);
      } else {
        console.log('Upload failed:', error);
        showToast('Upload failed', 'error', 1000, true);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    if (
      (fileType === 'image' && images.length > 0) ||
      (fileType === 'pdf' && pdfs.length > 0)
    ) {
      setShowModal(true);
    } else {
      onClose();
    }
  };

  const handleCloseConfirm = () => {
    setImages([]);
    setPdfs([]);
    setShowModal(false);
    onClose();
  };

  const files = fileType === 'image' ? images : pdfs;

  return (
    <>
      <Modal
        isVisible={isVisible}
        style={styles.modal}
        onBackButtonPress={handleCancel}
        onSwipeComplete={handleCancel}
        swipeDirection={['down']}
        animationOut="slideOutDown"
        animationOutTiming={250}
        onBackdropPress={handleCancel}>
        <View style={styles.modalContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scrollView}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Upload Prescription</Text>
              <Text style={styles.subtitle}>
                Please upload a clear prescription image or PDF of your
                prescription to proceed with your order.
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Choose upload method</Text>
            <View style={styles.uploadMethodsRow}>
              <View style={styles.uploadCard}>
                <TouchableOpacity onPress={handleTakePhoto}>
                  <View style={styles.iconWrapper}>
                    <Camera color="#161D1F" size={24} />
                  </View>
                  <Text style={styles.methodLabel}>Take Photo</Text>
                </TouchableOpacity>
                <View style={styles.successStrip}>
                  <Text style={styles.successText}>90% success rate</Text>
                </View>
              </View>

              <View style={styles.uploadCard}>
                <TouchableOpacity onPress={selectImage}>
                  <View style={styles.iconWrapper}>
                    <UploadIcon color="#161D1F" size={24} />
                  </View>
                  <Text style={styles.methodLabel}>Upload Image</Text>
                </TouchableOpacity>
                <View style={styles.successStrip}>
                  <Text style={styles.successText}>90% success rate</Text>
                </View>
              </View>

              <View style={styles.uploadCard}>
                <TouchableOpacity onPress={selectPDF}>
                  <View style={styles.iconWrapper}>
                    <FileText color="#161D1F" size={24} />
                  </View>
                  <Text style={styles.methodLabel}>Upload PDF</Text>
                </TouchableOpacity>
                <View style={styles.successStrip}>
                  <Text style={styles.successText}>90% success rate</Text>
                </View>
              </View>
            </View>

            {files.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Uploaded Prescriptions</Text>
                <View style={styles.previewContainer}>
                  {files.map((file, index) => (
                    <View key={index} style={styles.filePreview}>
                      {fileType === 'image' ? (
                        <Image
                          source={{uri: file}}
                          style={styles.imagePreview}
                        />
                      ) : (
                        <FileText size={24} color="#0088B1" />
                      )}
                      <Text style={styles.fileName} numberOfLines={1}>
                        {fileType === 'pdf'
                          ? file.name
                          : `${customer_name}'s Prescription`}
                      </Text>
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeFile(index)}>
                        <X size={16} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </>
            )}
          </ScrollView>

          <View style={styles.actionButtonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.proceedButton,
                (files.length === 0 || isUploading) && {opacity: 0.5},
              ]}
              onPress={handleProceed}
              disabled={files.length === 0 || isUploading}>
              <Text style={styles.proceedButtonText}>
                {isUploading ? 'Uploading...' : 'Proceed'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Confirmation modal */}
      <Modal isVisible={showModal} onBackdropPress={() => setShowModal(false)}>
        <View style={styles.confirmationModal}>
          <Text style={styles.confirmationTitle}>Discard Changes?</Text>
          <Text style={styles.confirmationText}>
            Are you sure you want to discard your uploaded files?
          </Text>
          <View style={styles.confirmationButtons}>
            <TouchableOpacity
              style={[styles.confirmationButton, styles.cancelConfirmButton]}
              onPress={() => setShowModal(false)}>
              <Text style={styles.cancelConfirmButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmationButton, styles.confirmButton]}
              onPress={handleCloseConfirm}>
              <Text style={styles.confirmButtonText}>Discard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PrescriptionUploadModal;
