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
} from 'react-native';
import {styles} from './index.styles';
import {
  ChevronRight,
  FileText,
  Clock,
  Image as ImageIcon,
} from 'lucide-react-native';
import {getPrescriptions} from '../../Services/prescription';
import {useAuthStore} from '../../store/authStore';
import PharmacistCard from '../../components/cards/PharmacistCard';

interface PrescriptionItem {
  sno: number;
  customer_id: number;
  prescriptionURL: string;
  created_at: string;
  fileType?: 'pdf' | 'image'; // Add fileType for easier categorization
}

const PrescriptionVerification = () => {
  const customer_id = useAuthStore(state => state.customer_id);
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

          // Handle different response formats
          if (Array.isArray(response.data)) {
            prescriptionsData = response.data;
          } else if (response.data && typeof response.data === 'object') {
            prescriptionsData =
              response.data.data || response.data.prescriptions || [];
          }

          // Enhance data with fileType information
          const enhancedPrescriptions = prescriptionsData.map(item => ({
            ...item,
            fileType: item.prescriptionURL?.toLowerCase().endsWith('.pdf')
              ? 'pdf'
              : 'image',
          })) as PrescriptionItem[];

          // Sort by date (newest first)
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

  // Separate PDFs and images
  const pdfs = prescriptions.filter(item => item.fileType === 'pdf');
  const images = prescriptions.filter(item => item.fileType === 'image');

  const handleOpenPDF = (url: string) => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open PDF:', err),
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0088B1" />
          <Text style={styles.description}>Loading your prescriptions...</Text>
        </View>
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

  return (
    <SafeAreaView style={styles.safeArea}>
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

        <Text style={styles.heading}>
          Your prescription is being verified by:
        </Text>

        <PharmacistCard
          name="Dr. Neha Sharma"
          experience="5+ years"
          specialization="Pharma_D"
        />

        {/* PDF Section with improved UI */}
        {pdfs.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Uploaded PDF Documents</Text>
            <View style={styles.pdfList}>
              {pdfs.map((pdf, index) => (
                <TouchableOpacity
                  key={`pdf-${pdf.sno}-${index}`}
                  style={styles.pdfCard}
                  onPress={() => handleOpenPDF(pdf.prescriptionURL)}>
                  <View style={styles.pdfIconContainer}>
                    <FileText size={24} color="#007AFF" />
                  </View>
                  <View style={styles.pdfInfo}>
                    <Text style={styles.pdfName} numberOfLines={1}>
                      {pdf.prescriptionURL.split('/').pop() || 'Document.pdf'}
                    </Text>
                    <Text style={styles.pdfDate}>
                      Uploaded: {new Date(pdf.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                  <ChevronRight size={18} color="#6D7578" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Images Section with improved UI */}
        {images.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Uploaded Images</Text>
            <View style={styles.imageGrid}>
              {images.map((image, index) => (
                <View
                  key={`img-${image.sno}-${index}`}
                  style={styles.imageCard}>
                  <Image
                    source={{uri: image.prescriptionURL}}
                    style={styles.uploadedImage}
                    resizeMode="cover"
                  />
                  <View style={styles.imageInfo}>
                    <ImageIcon size={14} color="#6D7578" />
                    <Text style={styles.imageDate}>
                      {new Date(image.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {prescriptions.length === 0 && (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No prescriptions found</Text>
          </View>
        )}

        <TouchableOpacity style={styles.exploreBtn}>
          <Text style={styles.exploreText}>Explore More Products</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrescriptionVerification;
