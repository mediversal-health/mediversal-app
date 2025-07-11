import React, {useRef, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {
  ShieldCheck,
  File,
  UserCheck,
  Camera,
  UploadIcon,
  Stethoscope,
  ChevronLeft,
} from 'lucide-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './index.style';
import RecentPrescriptionCard from '../../components/cards/RecentPrescriptionCard';
import PrescriptionGuideModal from '../../components/modal/PrescriptionGuideModal';
import Expert from './assets/experts.svg';
import Secure from './assets/secure.svg';
import Upload from './assets/uploaded.svg';
import UploadPicker from '../../components/common/UploadPicker';
import {UploadPickerHandle} from '../../types/index';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
const UploadPrescription: React.FC = () => {
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showUploadContent, setShowUploadContent] = useState(true);
  const uploadRef = useRef<UploadPickerHandle>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleTakePhoto = () => {
    setShowUploadContent(false);
    uploadRef.current?.openCamera();
  };

  const handleUploadImage = () => {
    setShowUploadContent(false);
    uploadRef.current?.openGallery();
  };

  const handleUploadPDF = () => {
    setShowUploadContent(false);
    uploadRef.current?.openDocumentPicker();
  };

  const handleCancelUpload = () => {
    setShowUploadContent(true);
  };

  const recentPrescriptions = [
    {
      doctorName: "Dr. Sharma's Prescription",
      uploadDate: '28th March 2025',
      status: 'Valid' as const,
    },
    {
      doctorName: "Dr. Mehta's Prescription",
      uploadDate: '20th March 2025',
      status: 'Expiring' as const,
    },
    {
      doctorName: "Dr. Reddy's Prescription",
      uploadDate: '10th March 2025',
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

  // Render recent prescriptions as normal components instead of using FlatList
  const renderRecentPrescriptions = () => {
    return recentPrescriptions.map((item, index) => (
      <RecentPrescriptionCard
        key={index}
        doctorName={item.doctorName}
        uploadDate={item.uploadDate}
        status={item.status}
        onReuse={() => {}}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={20} color="#0088B1" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Upload Prescription</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.progressCircle}>
            <File color="#6D7578" size={24} />
            <Text style={styles.uploadText}>Upload</Text>
          </View>

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

          <Text style={styles.heading}>Why We Need Your Prescription</Text>
          <Text style={styles.description}>
            We require a valid prescription to ensure your medication is safe
            and appropriate for your condition. It's both a legal requirement
            and for your safety.
          </Text>

          <View style={styles.bottomCard}>
            <TouchableOpacity onPress={() => setShowGuideModal(true)}>
              <Text style={styles.bottomCardText}>
                <Text style={styles.underline}>
                  What are the best practices to upload a prescriptions?
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          <UploadPicker ref={uploadRef} onCancel={handleCancelUpload} />

          {showUploadContent && (
            <>
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
                  <TouchableOpacity onPress={handleUploadImage}>
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
                  <TouchableOpacity onPress={handleUploadPDF}>
                    <View style={styles.iconWrapper}>
                      <File color="#161D1F" size={24} />
                    </View>
                    <Text style={styles.methodLabel}>Upload PDF</Text>
                  </TouchableOpacity>
                  <View style={styles.successStrip}>
                    <Text style={styles.successText}>90% success rate</Text>
                  </View>
                </View>
              </View>

              <View style={styles.recentHeader}>
                <Text style={styles.sectionTitle}>
                  Your Recent Prescriptions
                </Text>
                <TouchableOpacity>
                  <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.recentListContainer}>
                {renderRecentPrescriptions()}
              </View>

              <View style={styles.noPrescriptionSection}>
                <View style={styles.noPrescriptionHeader}>
                  <View style={styles.iconCircle}>
                    <Stethoscope color="#0088B1" size={26} />
                  </View>
                  <Text style={styles.noPrescriptionText}>
                    Don't have a prescription?
                  </Text>
                </View>

                <View style={styles.consultRow}>
                  {consultCards.map(card => (
                    <View key={card.id} style={styles.consultCard}>
                      <View style={styles.consultIconWrapper}>{card.icon}</View>
                      <Text style={styles.consultTitle}>{card.title}</Text>
                      <Text style={styles.consultSubtitle}>
                        {card.subtitle}
                      </Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity style={styles.consultButton}>
                  <Text style={styles.consultButtonText}>
                    Consult a Doctor (₹99 only)
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
