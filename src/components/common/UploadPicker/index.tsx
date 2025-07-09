/* eslint-disable react-native/no-inline-styles */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Image,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { pick } from '@react-native-documents/picker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation';
import styles from './index.styles';
import { UploadPickerHandle, UploadType } from '../../../types';
// Import the upload function and AuthContext (assuming you have one)
import { uploadPrescriptions } from '../../../Services/prescription';
import { useAuthStore } from '../../../store/authStore';
import { useToastStore } from '../../../store/toastStore';
// Adjust path as needed

interface UploadPickerProps {
  onCancel?: () => void;
  initialType?: UploadType;
}
interface ExtendedDocumentPickerResponse {
  uri: string;
  fileCopyUri?: string; // Optional because it might not exist on all platforms
  name: string;
  type: string;
  size: number;
}
const UploadPicker = forwardRef<UploadPickerHandle, UploadPickerProps>(
  ({ onCancel, initialType = 'image' }, ref) => {
    const [fileType, setFileType] = useState<UploadType>(initialType);
    const [images, setImages] = useState<string[]>([]);
    const [pdfs, setPdfs] = useState<ExtendedDocumentPickerResponse[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const customer_id = useAuthStore((state) => state.customer_id);
    console.log(customer_id);
    const showToast = useToastStore((state) => state.showToast);
    // Common handler for all picker types
    const openPicker = async (type: UploadType) => {
      setFileType(type);
      setIsPickerOpen(true);

      try {
        switch (type) {
          case 'image':
            await openImagePicker();
            break;
          case 'pdf':
            await openDocumentPicker();
            break;
          case 'camera':
            await openCamera();
            break;
        }
      } catch (error) {
        console.error('Picker error:', error);
        handleCancel();
      } finally {
        setIsPickerOpen(false);
      }
    };

    const openImagePicker = async () => {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 0,
        quality: 0.8,
      });

      if (result.didCancel) {
        handleCancel();
        return;
      }

      if (result.assets) {
        const selectedUris = result.assets
          .map((asset) => asset.uri)
          .filter(Boolean) as string[];
        setImages((prev) => [...prev, ...selectedUris]);
      }
    };

    const openDocumentPicker = async () => {
      try {
        const [result] = await pick({ type: ['application/pdf'] });

        if (!result) {
          handleCancel();
          return;
        }

        // Type assertion to our extended interface
        const pdfResult = result as ExtendedDocumentPickerResponse;

        // Create a proper file object instead of just storing the URI
        const fileObject = {
          uri: pdfResult.fileCopyUri || pdfResult.uri,
          type: pdfResult.type || 'application/pdf',
          name: pdfResult.name || `document_${Date.now()}.pdf`,
          size: pdfResult.size || 0,
        };

        if (fileObject.uri) {
          setPdfs((prev) => [...prev, fileObject]);
        } else {
          handleCancel();
        }
      } catch (error) {
        console.error('Document picker error:', error);
        handleCancel();
      }
    };
    const openCamera = async () => {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.7,
      });

      if (result.didCancel) {
        handleCancel();
        return;
      }

      if (result.assets && result.assets[0]?.uri) {
        setImages((prev) =>
          result.assets && result.assets[0].uri
            ? [...prev, result.assets[0].uri]
            : prev,
        );
      }
    };

    useImperativeHandle(ref, () => ({
      openPicker,
      openCamera,
      openGallery: () => openPicker('image'),
      openDocumentPicker: () => openPicker('pdf'),
    }));

    const handleUploadMore = () => {
      openPicker(fileType);
    };

    const handleProceed = async () => {
      if (!customer_id) {
        showToast(
          'User ID not found. Please login again.',
          'error',
          1000,
          true,
        );
        return;
      }

      // Check if more than 5 files are selected
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
        // Prepare files for upload
        const files =
          fileType === 'pdf'
            ? pdfs.map((pdfObj) => ({
                uri: pdfObj.uri,
                type: pdfObj.type || 'application/pdf',
                name: pdfObj.name || `document_${Date.now()}.pdf`,
              }))
            : images.map((uri) => ({
                uri,
                type: 'image/jpeg',
                name: uri.split('/').pop() || `image_${Date.now()}.jpg`,
              }));

        const response = await uploadPrescriptions(
          customer_id.toString(),
          files,
        );
        console.log('Upload successful:', response.data);
        navigation.navigate('PrescriptionVerification');
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
        handleClose();
      }
    };

    const handleClose = () => {
      setImages([]);
      setPdfs([]);
      setShowModal(false);
      onCancel?.();
    };
    const handleRemoveImage = (index: number) => {
      setImages((prev) => {
        const newImages = [...prev];
        newImages.splice(index, 1);
        return newImages;
      });
    };
    const handleRemovePdf = (index: number) => {
      setPdfs((prev) => {
        const newPdfs = [...prev];
        newPdfs.splice(index, 1);
        return newPdfs;
      });
    };
    const confirmRemove = () => {
      handleClose();
    };

    const closeModal = () => {
      setShowModal(false);
    };

    if (isPickerOpen || isUploading) {
      return (
        <View style={styles.pickerLoading}>
          <ActivityIndicator size="large" color="#0088B1" />
          <Text style={styles.loadingText}>
            {isUploading ? 'Uploading...' : 'Fetching...'}
          </Text>
        </View>
      );
    }

    const hasContent =
      (fileType === 'image' && images.length > 0) ||
      (fileType === 'pdf' && pdfs.length > 0);

    return (
      <View style={styles.container}>
        {hasContent && (
          <View>
            <Text style={styles.previewTitle}>
              Selected Prescription {fileType === 'pdf' ? 'PDF' : 'Images'}:
            </Text>
            {fileType === 'pdf' ? (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {pdfs.map((pdf, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Text style={styles.fileName}>
                      {pdf.name || pdf.uri?.split('/').pop()}
                    </Text>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => handleRemovePdf(index)}
                    >
                      <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {images.map((uri, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image source={{ uri }} style={styles.uploadedImage} />
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => handleRemoveImage(index)}
                    >
                      <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={styles.uploadMore}
              onPress={handleUploadMore}
            >
              <Text style={styles.uploadMoreText}>
                Upload more {fileType === 'pdf' ? 'PDFs' : 'images'}
              </Text>
            </TouchableOpacity>
            <View style={styles.footerButtonsColumn}>
              <TouchableOpacity style={styles.proceed} onPress={handleProceed}>
                <Text style={styles.proceedText}>Proceed to next step</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancel} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Modal
          visible={showModal}
          transparent
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Are you sure?</Text>
              <Text style={styles.modalMessage}>
                Going back will remove the{' '}
                {fileType === 'pdf' ? 'PDF' : 'images'} you have uploaded. Are
                you sure you want to remove them?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalRemoveBtn}
                  onPress={confirmRemove}
                >
                  <Text style={styles.modalRemoveText}>
                    Remove {fileType === 'pdf' ? 'PDF' : 'Images'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalCancelBtn}
                  onPress={closeModal}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  },
);

export default UploadPicker;
