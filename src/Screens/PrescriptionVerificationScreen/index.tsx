/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import {styles} from './index.styles';
import {
  ChevronRight,
  FileText,
  Clock,
  ChevronLeft,
  Trash2,
} from 'lucide-react-native';
import {
  deletePrescription,
  getPrescriptions,
} from '../../Services/prescription';
import {useAuthStore} from '../../store/authStore';

import LinearGradient from 'react-native-linear-gradient';

import Whatsapp from './assets/svgs/Whatsapp.svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';

interface PrescriptionItem {
  sno: number;
  customer_id: number;
  prescriptionURL: string;
  created_at: string;
  prescription_id: string;
  fileType?: 'pdf' | 'image';
}

const PrescriptionVerification = () => {
  const customer_id = useAuthStore(state => state.customer_id);
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        setLoading(true);
        console.log('Customer ID:', customer_id);

        if (!customer_id) {
          setError('Customer ID not found');
          setLoading(false);
          return;
        }

        const response = await getPrescriptions(customer_id.toString());
        console.log('API Response:', response);

        if (response.status === 200) {
          let prescriptionsData: PrescriptionItem[] = [];

          if (Array.isArray(response.data)) {
            prescriptionsData = response.data;
          } else if (response.data && typeof response.data === 'object') {
            prescriptionsData =
              response.data.data || response.data.prescriptions || [];
          }

          const enhancedPrescriptions = prescriptionsData.map(item => ({
            ...item,
            fileType: item.prescriptionURL?.toLowerCase().endsWith('.pdf')
              ? 'pdf'
              : 'image',
          })) as PrescriptionItem[];

          const sortedPrescriptions = [...enhancedPrescriptions].sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          );

          setPrescriptions(sortedPrescriptions);
        } else {
          setError('Failed to fetch prescriptions');
        }
      } catch (err) {
        setError('Failed to fetch prescriptions');
        console.error('Error fetching prescriptions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [customer_id]);

  const handleOpenPDF = (url: string) => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open PDF:', err),
    );
  };
  console.log(prescriptions);
  const renderPrescriptionItem = (item: PrescriptionItem, index: number) => {
    return (
      <TouchableOpacity
        key={`prescription-${item.sno}-${index}`}
        style={styles.prescriptionItem}
        onPress={() => {
          if (item.fileType === 'pdf') {
            handleOpenPDF(item.prescriptionURL);
          }
        }}>
        {item.fileType === 'image' ? (
          <Image
            source={{uri: item.prescriptionURL}}
            style={styles.imageThumbnail}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.pdfIconContainer}>
            <FileText size={76} color="red" />
          </View>
        )}
        <Text style={styles.itemDateText}>
          {new Date(item.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </Text>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 5,
            right: 5,

            padding: 5,
          }}
          onPress={() => handleDeletePrescription(item.prescription_id)}>
          <Trash2 size={16} color="#FF4444" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#0088B1" />
          <Text style={styles.description}>Loading your prescriptions...</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={[styles.heading, {color: 'red'}]}>{error}</Text>
          <Text style={styles.description}>
            Please try again later or contact support.
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  const handleDeletePrescription = async (prescriptionId: string) => {
    Alert.alert(
      'Delete Prescription',
      'Are you sure you want to delete this prescription?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await deletePrescription(
                String(customer_id),
                prescriptionId,
              );

              if (response.status === 200) {
                setPrescriptions(prev =>
                  prev.filter(item => item.prescription_id !== prescriptionId),
                );
                Alert.alert('Success', 'Prescription deleted successfully');
              } else {
                Alert.alert('Error', 'Failed to delete prescription');
              }
              // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
            } catch (error) {
              console.error('Error deleting prescription:', error);
              Alert.alert('Error', 'Failed to delete prescription');
            }
          },
        },
      ],
    );
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
      <ScrollView style={styles.container}>
        <View style={styles.progressCircle}>
          <Clock color="#6D7578" size={24} />
          <Text style={styles.uploadText}>Upload</Text>
        </View>

        <Text style={styles.estimatedTime}>
          Estimated time: <Text style={{color: '#0088B1'}}>15 minutes</Text>
        </Text>

        <Text style={styles.heading}>What happens during verification?</Text>
        <Text style={styles.description}>
          Our licensed pharmacist checks your prescription for completeness,
          appropriate dosage, potential drug interactions, and verifies that
          it's from a licensed medical practitioner.
        </Text>

        <TouchableOpacity style={styles.learnMoreRow}>
          <Text style={styles.learnMoreText}>Learn more about our process</Text>
          <ChevronRight size={14} color="#6D7578" />
        </TouchableOpacity>

        <LinearGradient
          colors={['#58D163', '#1C9B31']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.infoCard}>
          <Text style={styles.infoCardText}>
            We will need some time to review the prescription and prepare the
            list of medicines and tests mentioned in it. If we require any
            clarification, our verified pharmacist may reach out to you.
          </Text>

          <Text style={styles.infoCardText}>
            Alternatively, if you would like to connect with the pharmacist
            directly, please send us a message by clicking the chat button on
            WhatsApp.
          </Text>
        </LinearGradient>

        {/* Uploaded Prescriptions Grid */}
        {prescriptions.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Your Uploaded Prescriptions</Text>
            <View style={styles.prescriptionsGrid}>
              {prescriptions.map((item, index) =>
                renderPrescriptionItem(item, index),
              )}
            </View>
          </View>
        )}

        {prescriptions.length === 0 && (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No prescriptions found</Text>
          </View>
        )}
        <TouchableOpacity style={styles.uploadMoreButton}>
          <Text style={styles.uploadMoreText}>Upload more prescriptions</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        <LinearGradient
          colors={['#58D163', '#1C9B31']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.exploreBtn}>
          <TouchableOpacity style={styles.whatsappButton} activeOpacity={0.8}>
            <Whatsapp height={20} width={20} />
            <Text style={styles.exploreText}>Contact with Pharmacist</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default PrescriptionVerification;
