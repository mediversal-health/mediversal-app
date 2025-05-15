import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  Touchable,
} from 'react-native';
import {
  ShieldCheck,
  File,
  UserCheck,
  FileCheck,
  Camera,
  UploadIcon,
  Stethoscope,
} from 'lucide-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './index.style';
import RecentPrescriptionCard from '../../components/cards/RecentPrescriptionCard';
import PrescriptionGuideModal from '../../components/modal/PrescriptionGuideModal';
import Expert from './assets/experts.svg';
import Secure from './assets/secure.svg';
import Upload from './assets/uploaded.svg';
import TakePhotoCapture, {
  TakePhotoCaptureHandle,
} from '../../components/cards/TakePhotoCapture';
import UploadImagePicker, {
  UploadImagePickerHandle,
} from '../../components/cards/ImagePickerPreview';

const UploadPrescription: React.FC = () => {
  const [showGuideModal, setShowGuideModal] = useState(false);
  const photoRef = useRef<TakePhotoCaptureHandle>(null);

  const handleTakePhoto = () => {
    photoRef.current?.openCamera();
  };
  const pickerRef = useRef<UploadImagePickerHandle>(null);

  const recentPrescriptions = [
    {
      doctorName: 'Dr. Sharma’s Prescription',
      uploadDate: '28th March 2025',
      status: 'Valid' as const,
    },
    {
      doctorName: 'Dr. Mehta’s Prescription',
      uploadDate: '20th March 2025',
      status: 'Expiring' as const,
    },
    {
      doctorName: 'Dr. Reddy’s Prescription',
      uploadDate: '10th March 2025',
      status: 'Expired' as const,
    },
    {
      doctorName: 'Dr. Rdy’s Prescription',
      uploadDate: '10th March 2025',
      status: 'Expired' as const,
    },
    {
      doctorName: 'Dr. Reddy’s Prescription',
      uploadDate: '10t March 2025',
      status: 'Expired' as const,
    },
  ];
  const consultCards = [
    {
      id: 1,
      icon: <Stethoscope color="#0088B1" size={24} />,
      title: 'Consult in',
      subtitle: '15 minutes',
    },
    {
      id: 2,
      icon: <UserCheck color="#0088B1" size={24} />,
      title: 'Top',
      subtitle: 'Specialists',
    },
    {
      id: 3,
      icon: <ShieldCheck color="#0088B1" size={24} />,
      title: '24/7',
      subtitle: 'Available',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Circular Progress Upload Button */}
          <View style={styles.progressCircle}>
            <File color="#6D7578" size={24} />
            <Text style={styles.uploadText}>Upload</Text>
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardItem}>
              <Secure />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTextTop}>100%</Text>
                <Text style={styles.cardTextBottom}>Secure</Text>
              </View>
            </View>

            <View style={styles.cardItem}>
              <Upload />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTextTop}>1.5k+</Text>
                <Text style={styles.cardTextBottom}>Uploaded</Text>
              </View>
            </View>
            <View style={styles.cardItem}>
              <Expert />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTextTop}>Verified</Text>
                <Text style={styles.cardTextBottom}>Verified by Experts</Text>
              </View>
            </View>
          </View>

          {/* Heading and Description */}
          <Text style={styles.heading}>Why We Need Your Prescription</Text>
          <Text style={styles.description}>
            We require a valid prescription to ensure your medication is safe
            and appropriate for your condition. It’s both a legal requirement
            and for your safety.
          </Text>

          {/* Bottom Info Card */}
          <View style={styles.bottomCard}>
            <TouchableOpacity onPress={() => setShowGuideModal(true)}>
              <Text style={styles.bottomCardText}>
                <Text style={styles.underline}>
                  What are the best practices to upload a prescriptions?
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
          <TakePhotoCapture ref={photoRef} />
          <UploadImagePicker ref={pickerRef} />

          {/* Choose Upload Method Section */}
          <Text style={styles.sectionTitle}>Choose upload method</Text>
          <View style={styles.uploadMethodsRow}>
            {/* Take Photo */}
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

            {/* Upload Image */}
            <View style={styles.uploadCard}>
              <TouchableOpacity
                onPress={() => pickerRef.current?.openGallery()}>
                <View style={styles.iconWrapper}>
                  <UploadIcon color="#161D1F" size={24} />
                </View>

                <Text style={styles.methodLabel}>Upload Image</Text>
              </TouchableOpacity>

              <View style={styles.successStrip}>
                <Text style={styles.successText}>90% success rate</Text>
              </View>
            </View>

            {/* Upload PDF */}
            <View style={styles.uploadCard}>
              <View style={styles.iconWrapper}>
                <File color="#161D1F" size={24} />
              </View>
              <Text style={styles.methodLabel}>Upload PDF</Text>
              <View style={styles.successStrip}>
                <Text style={styles.successText}>90% success rate</Text>
              </View>
            </View>
          </View>
          {/* Recent Prescriptions Header */}
          <View style={styles.recentHeader}>
            <Text style={styles.sectionTitle}>Your Recent Prescriptions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable Recent Prescriptions List */}
          <View style={styles.recentListContainer}>
            <FlatList
              data={recentPrescriptions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <RecentPrescriptionCard
                  doctorName={item.doctorName}
                  uploadDate={item.uploadDate}
                  status={item.status}
                  onReuse={() => {}}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
          {/* Don't have a prescription? Section */}
          <View style={styles.noPrescriptionSection}>
            <View style={styles.noPrescriptionHeader}>
              <View style={styles.iconCircle}>
                <Stethoscope color="#0088B1" size={26} />
              </View>
              <Text style={styles.noPrescriptionText}>
                Don’t have a prescription?
              </Text>
            </View>

            {/* Three Consult Cards */}
            <View style={styles.consultRow}>
              {consultCards.map(card => (
                <View key={card.id} style={styles.consultCard}>
                  <View style={styles.consultIconWrapper}>{card.icon}</View>
                  <Text style={styles.consultTitle}>{card.title}</Text>
                  <Text style={styles.consultSubtitle}>{card.subtitle}</Text>
                </View>
              ))}
            </View>

            {/* Full-Width Button */}
            <TouchableOpacity style={styles.consultButton}>
              <Text style={styles.consultButtonText}>
                Consult a Doctor (₹99 only)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <PrescriptionGuideModal
          visible={showGuideModal}
          onClose={() => setShowGuideModal(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadPrescription;
