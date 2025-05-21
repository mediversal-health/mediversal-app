/* eslint-disable react-native/no-inline-styles */
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {pick} from '@react-native-documents/picker';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation';
import styles from './index.styles';
import {UploadPickerHandle, UploadType} from '../../../types';
// Import the upload function and AuthContext (assuming you have one)
import {uploadPrescriptions} from '../../../Services/prescription';
import {useAuthStore} from '../../../store/authStore';
// Adjust path as needed

interface UploadPickerProps {
  onCancel?: () => void;
  initialType?: UploadType;
}

const UploadPicker = forwardRef<UploadPickerHandle, UploadPickerProps>(
  ({onCancel, initialType = 'image'}, ref) => {
    const [fileType, setFileType] = useState<UploadType>(initialType);
    const [images, setImages] = useState<string[]>([]);
    const [pdfs, setPdfs] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const customer_id = useAuthStore(state => state.customer_id);
    console.log(customer_id);
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
          .map(asset => asset.uri)
          .filter(Boolean) as string[];
        setImages(prev => [...prev, ...selectedUris]);
      }
    };

    const openDocumentPicker = async () => {
      const [result] = await pick({type: ['application/pdf']});
      if (result?.name) {
        setPdfs(prev => [...prev, result.name || 'Untitled PDF']);
      } else {
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
        setImages(prev =>
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
        Alert.alert('Error', 'User ID not found. Please login again.');
        return;
      }

      setIsUploading(true);
      try {
        // Prepare files for upload
        const files =
          fileType === 'pdf'
            ? pdfs.map(pdfName => ({
                uri: pdfName, // Assuming pdfs array contains URIs; adjust if it only contains names
                type: 'application/pdf',
                name: pdfName.split('/').pop() || 'document.pdf',
              }))
            : images.map((uri, index) => ({
                uri,
                type: 'image/jpeg',
                name: `image_${index}.jpg`,
              }));

        // Call the API
        const response = await uploadPrescriptions(
          customer_id.toString(),
          files,
        );

        // Handle successful upload
        console.log('Upload successful:', response.data);

        // Continue with navigation as before
        if (fileType === 'pdf') {
          navigation.navigate('PrescriptionVerification', {
            pdfs: pdfs,
            pdfName: pdfs[0],
          });
        } else {
          navigation.navigate('PrescriptionVerification', {
            images: images,
          });
        }
      } catch (error) {
        console.error('Upload failed:', error);
        Alert.alert(
          'Upload Failed',
          'There was a problem uploading your prescription. Please try again.',
        );
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
              <Text style={styles.fileName}>{pdfs[0]}</Text>
            ) : (
              <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 12}}>
                {images.map((uri, index) => (
                  <Image
                    key={index}
                    source={{uri}}
                    style={styles.uploadedImage}
                  />
                ))}
              </View>
            )}

            <TouchableOpacity
              style={styles.uploadMore}
              onPress={handleUploadMore}>
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
          onRequestClose={closeModal}>
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
                  onPress={confirmRemove}>
                  <Text style={styles.modalRemoveText}>
                    Remove {fileType === 'pdf' ? 'PDF' : 'Images'}
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
    );
  },
);

export default UploadPicker;
