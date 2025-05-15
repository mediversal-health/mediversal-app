import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, Image, TouchableOpacity, Text, Modal} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import styles from './index.styles';

export type UploadImagePickerHandle = {
  openGallery: () => void;
};

const UploadImagePicker = forwardRef<UploadImagePickerHandle>((_, ref) => {
  const [images, setImages] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0,
      quality: 0.8,
    });

    if (result.assets) {
      const selectedUris = result.assets
        .map(asset => asset.uri)
        .filter(Boolean) as string[];
      setImages([...images, ...selectedUris]);
    }
  };

  useImperativeHandle(ref, () => ({
    openGallery,
  }));

  const handleUploadMore = () => {
    openGallery();
  };

  const handleCancel = () => {
    setShowModal(true);
  };

  const confirmRemove = () => {
    setImages([]);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {images.length > 0 && (
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
            <TouchableOpacity style={styles.proceed}>
              <Text style={styles.proceedText}>Proceed to next step</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancel} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
