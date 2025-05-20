/* eslint-disable react-native/no-inline-styles */
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, Image, TouchableOpacity, Text, Modal} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import styles from './index.styles';
import {Fonts} from '../../../styles/fonts';

export type UploadImagePickerHandle = {
  openGallery: () => void;
};

interface UploadImagePickerProps {
  onCancel?: () => void;
}

const UploadImagePicker = forwardRef<
  UploadImagePickerHandle,
  UploadImagePickerProps
>(({onCancel}, ref) => {
  const [images, setImages] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const openGallery = async () => {
    setIsGalleryOpen(true);
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0,
      quality: 0.8,
    });

    setIsGalleryOpen(false);

    if (result.didCancel) {
      // User canceled from image picker
      handleCancel();
      return;
    }

    if (result.assets) {
      console.log('Selected assets:', result.assets);

      const selectedUris = result.assets
        .map(asset => asset.uri)
        .filter(Boolean) as string[];

      setImages([...images, ...selectedUris]);

      // Prepare FormData to send to backend
      const formData = new FormData();
      result.assets.forEach(asset => {
        if (asset.uri && asset.type && asset.fileName) {
          formData.append('files', {
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName,
          } as any); // `as any` is necessary for React Native types
        }
      });

      console.log('FormData ready to send:', formData);
    }
  };

  useImperativeHandle(ref, () => ({
    openGallery,
  }));

  const handleUploadMore = () => {
    openGallery();
  };

  const handleCancel = () => {
    if (images.length > 0) {
      // Show confirmation modal if there are uploaded images
      setShowModal(true);
    } else {
      // No images uploaded, just close
      handleClose();
    }
  };

  const handleClose = () => {
    setImages([]);
    setShowModal(false);
    onCancel?.(); // Notify parent about cancel
  };

  const confirmRemove = () => {
    handleClose();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    const formData = new FormData();

    images.forEach((uri, index) => {
      const filename = uri.split('/').pop() || `image_${index}.jpg`;
      const fileType = filename.endsWith('.png') ? 'image/png' : 'image/jpeg';

      const file = {
        uri,
        type: fileType,
        name: filename,
      };

      // console.log(`Appending file:`, file); // ✅ Log each file object
      formData.append('files', file as any);
    });

    console.log('FormData ready to send');
  };

  return (
    <View style={styles.container}>
      {isGalleryOpen ? (
        <View style={styles.galleryLoading}>
          <Text style={{fontFamily: Fonts.JakartaRegular, fontSize: 12}}>
            Fetching...
          </Text>
        </View>
      ) : images.length > 0 ? (
        <View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 12}}>
            {images.map((uri, index) => (
              <Image key={index} source={{uri}} style={styles.uploadedImage} />
            ))}
          </View>

          <TouchableOpacity
            style={styles.uploadMore}
            onPress={handleUploadMore}>
            <Text style={styles.uploadMoreText}>Upload more images</Text>
          </TouchableOpacity>

          <View style={styles.footerButtonsColumn}>
            <TouchableOpacity style={styles.proceed} onPress={handleSubmit}>
              <Text style={styles.proceedText}>Proceed to next step</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancel} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {/* Modal Confirmation */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text style={styles.modalMessage}>
              Going back will remove the prescriptions that you have uploaded.
              Are you sure you want to remove the uploaded prescriptions?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalRemoveBtn}
                onPress={confirmRemove}>
                <Text style={styles.modalRemoveText}>Remove Prescription</Text>
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
});

export default UploadImagePicker;
