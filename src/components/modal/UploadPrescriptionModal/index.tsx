import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {pick} from '@react-native-documents/picker';
import {
  Camera,
  CheckCircle,
  FileText,
  Trash2,
  Upload as UploadIcon,
  X,
} from 'lucide-react-native';

import {useAuthStore} from '../../../store/authStore';
import {useToastStore} from '../../../store/toastStore';
import styles from './index.styles';
import {usePrescriptionStore} from '../../../store/prescriptionStore';

interface PrescriptionUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
  isPrescriptionRequired: boolean;
  onNavigateToAddressBook?: () => void;
}

const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  isVisible,
  onClose,
  onUploadSuccess,
  isPrescriptionRequired,
  onNavigateToAddressBook,
}) => {
  const [fileType, setFileType] = useState<'image' | 'pdf'>('image');
  const [images, setImages] = useState<string[]>([]);
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const customer_name = useAuthStore(state => state.first_name);
  const customer_id = useAuthStore(state => state.customer_id);
  const showToast = useToastStore(state => state.showToast);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [modalHeight, setModalHeight] = useState<string | number>('70%');
  const files = fileType === 'image' ? images : pdfs;

  useEffect(() => {
    const hasFiles = files.length > 0;
    const hasPrescriptions = prescriptions.length > 0;

    if (hasFiles && hasPrescriptions) {
      setModalHeight('90%');
    } else if (hasFiles || hasPrescriptions) {
      setModalHeight('80%');
    } else {
      setModalHeight('50%');
    }
  }, [files, prescriptions]);
  useEffect(() => {
    if (customer_id) {
      const fetchedFiles =
        usePrescriptionStore.getState().getFiles(customer_id.toString()) || [];
      setPrescriptions(fetchedFiles);
    }
  }, [customer_id, isVisible]);
  const {removeFile: removePrescription} = usePrescriptionStore();

  const handleTakePhoto = async () => {
    const remainingSlots = 5 - (prescriptions.length + images.length);
    if (remainingSlots <= 0) {
      showToast('Maximum 5 prescriptions allowed', 'error', 1000, true);
      return;
    }
    try {
      setFileType('image');
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        cameraType: 'back',
        saveToPhotos: true,
      });

      if (!result.didCancel && result.assets) {
        const newImages = result.assets.map((asset: any) => asset.uri || '');
        setImages(prev => [...prev, ...newImages]);
      }
    } catch (error) {
      console.log('Camera error:', error);
      showToast('Failed to take photo', 'error', 1000, true);
    }
  };

  const selectImage = async () => {
    try {
      const remainingSlots = 5 - (prescriptions.length + images.length);
      if (remainingSlots <= 0) {
        showToast('Maximum 5 prescriptions allowed', 'error', 1000, true);
        return;
      }

      setFileType('image');
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: remainingSlots,
      });
      if (!result.didCancel && result.assets) {
        const newImages = result.assets.map(asset => asset.uri || '');
        setImages(prev => [...prev, ...newImages]);
      }
    } catch (error) {
      console.log('Image picker error:', error);
      showToast('Failed to select image', 'error', 1000, true);
    }
  };

  const selectPDF = async () => {
    setFileType('pdf');
    const remainingSlots = 5 - (prescriptions.length + pdfs.length);
    if (remainingSlots <= 0) {
      showToast('Maximum 5 prescriptions allowed', 'error', 1000, true);
      return;
    }
    try {
      const result = await pick({
        mode: 'open',
        type: ['application/pdf'],
        multiple: true,
        maxFiles: remainingSlots,
      });
      if (result) {
        const newPdfs = result.map((file: any) => ({
          uri: file.uri,
          type: file.type || 'application/pdf',
          name: file.name || `document_${Date.now()}.pdf`,
        }));
        setPdfs(prev => [...prev, ...newPdfs]);
      }
    } catch (error) {
      console.log('Document picker error:', error);
      showToast('Failed to select PDF', 'error', 1000, true);
    }
  };

  const removeFile = (index: number) => {
    if (fileType === 'image') {
      setImages(prev => prev.filter((_, i) => i !== index));
    } else {
      setPdfs(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleProceed = async () => {
    const newFilesCount = fileType === 'pdf' ? pdfs.length : images.length;
    const totalFilesCount = prescriptions.length + newFilesCount;

    if (totalFilesCount > 5) {
      showToast(
        'You can only have up to 5 prescriptions total',
        'error',
        1000,
        true,
      );
      return;
    }

    setIsUploading(true);
    try {
      if (newFilesCount > 0) {
        const files =
          fileType === 'pdf'
            ? pdfs.map(pdf => ({
                uri: pdf.uri,
                type: pdf.type || 'application/pdf',
                name: pdf.name || `document_${Date.now()}.pdf`,
              }))
            : images.map(uri => ({
                uri,
                type: 'image/jpeg',
                name: uri.split('/').pop() || `image_${Date.now()}.jpg`,
              }));

        usePrescriptionStore
          .getState()
          .addFiles(customer_id?.toString() ?? '', files);
      }
      onUploadSuccess();
      if (files.length > 0) {
        showToast('Prescriptions saved successfully!', 'success', 1000, true);
      }
      onClose();
      if (onNavigateToAddressBook) {
        onNavigateToAddressBook();
      }
    } catch (error) {
      console.log('Save failed:', error);
      showToast('Failed to save prescriptions', 'error', 1000, true);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePrescription = (index: number) => {
    removePrescription(customer_id?.toString() ?? '', index);

    setPrescriptions(prev => prev.filter((_, i) => i !== index));
  };

  const renderUploadedPrescriptions = () => {
    if (prescriptions.length === 0) return null;

    return (
      <>
        <Text style={styles.sectionTitleForUploaded}>
          Previously Saved Prescriptions
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContainer}>
          {prescriptions.map((file, index) => (
            <View key={`uploaded-${index}`} style={styles.uploadedFileCard}>
              <View style={styles.uploadedFileIcon}>
                {file.type?.includes('image') ? (
                  <Image
                    source={{uri: file.uri}}
                    style={styles.uploadedFileImage}
                  />
                ) : (
                  <FileText size={24} color="#0088B1" />
                )}
              </View>

              <TouchableOpacity
                style={styles.uploadedFileRemove}
                onPress={() => handleRemovePrescription(index)}>
                <Trash2 size={16} color="#EF4444" />
              </TouchableOpacity>

              <View style={styles.uploadedFileStatus}>
                <CheckCircle size={16} color="#10B981" />
              </View>
            </View>
          ))}
        </ScrollView>
      </>
    );
  };

  const handleCancel = () => {
    if (images.length > 0 || pdfs.length > 0) {
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
        <View style={[styles.modalContainer, {height: modalHeight}]}>
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
                <Text style={styles.sectionTitleForUploaded}>
                  Review Before Proceeding
                </Text>
                <Text style={styles.sectionSubtitle}>
                  Please verify all prescription details are clearly visible
                  before submitting
                </Text>
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
                          : customer_id
                          ? `${customer_name}'s Prescription ${index + 1}`
                          : `Prescription ${index + 1}`}
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

            {renderUploadedPrescriptions()}
          </ScrollView>

          <View style={styles.actionButtonContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.proceedButton,
                files.length === 0 &&
                  prescriptions.length === 0 && {opacity: 0.5},
              ]}
              onPress={handleProceed}
              disabled={
                (files.length === 0 && prescriptions.length === 0) ||
                isUploading
              }>
              <Text style={styles.proceedButtonText}>
                {isPrescriptionRequired
                  ? 'Select/Add Address'
                  : isUploading
                  ? 'Uploading...'
                  : 'Save/Add Address'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
