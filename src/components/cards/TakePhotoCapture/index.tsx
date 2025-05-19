import React, {useImperativeHandle, useState, forwardRef} from 'react';
import {View, Image, TouchableOpacity, Text, Modal} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import styles from './index.styles';

export type TakePhotoCaptureHandle = {
  openCamera: () => void;
};

interface TakePhotoCaptureProps {
  onCancel?: () => void;
}

const TakePhotoCapture = forwardRef<
  TakePhotoCaptureHandle,
  TakePhotoCaptureProps
>(({onCancel}, ref) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = async () => {
    setIsCameraOpen(true);
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      quality: 0.7,
    });

    setIsCameraOpen(false);

    if (result.didCancel) {
      // User canceled the camera
      handleCancel();
      return;
    }

    if (result.assets && result.assets[0]?.uri) {
      setPreviewPhoto(result.assets[0].uri);
    }
  };

  useImperativeHandle(ref, () => ({
    openCamera,
  }));

  const handleContinue = () => {
    if (previewPhoto) {
      setPhotos([...photos, previewPhoto]);
      setPreviewPhoto(null);
    }
  };

  const handleUploadMore = () => {
    if (previewPhoto) {
      setPhotos([...photos, previewPhoto]);
      setPreviewPhoto(null);
    }
    openCamera();
  };

  const handleCancel = () => {
    if (photos.length > 0 || previewPhoto) {
      // Show confirmation modal if there are uploaded photos
      setShowModal(true);
    } else {
      // No photos uploaded, just close
      handleClose();
    }
  };

  const handleClose = () => {
    setPhotos([]);
    setPreviewPhoto(null);
    setShowModal(false);
    onCancel?.(); // Notify parent about cancel
  };

  const confirmRemove = () => {
    handleClose();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const allPhotos = [...photos, ...(previewPhoto ? [previewPhoto] : [])];

  return (
    <View style={styles.container}>
      {isCameraOpen ? (
        <View style={styles.cameraLoading}>
          <Text>Fetching...</Text>
        </View>
      ) : allPhotos.length > 0 ? (
        <View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 12}}>
            {allPhotos.map((uri, index) => (
              <Image key={index} source={{uri}} style={styles.uploadedImage} />
            ))}
          </View>

          <TouchableOpacity
            style={styles.uploadMore}
            onPress={handleUploadMore}>
            <Text style={styles.uploadMoreText}>Upload more prescriptions</Text>
          </TouchableOpacity>

          <View style={styles.footerButtonsColumn}>
            <TouchableOpacity style={styles.proceed} onPress={handleContinue}>
              <Text style={styles.proceedText}>Proceed to next step</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancel} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

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

export default TakePhotoCapture;
