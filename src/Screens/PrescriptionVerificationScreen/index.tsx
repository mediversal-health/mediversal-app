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
} from 'react-native';
import {styles} from './index.styles';
import {ChevronRight, FileText, Clock} from 'lucide-react-native';

import {getPrescriptions} from '../../Services/prescription';
import {useAuthStore} from '../../store/authStore';
import PharmacistCard from '../../components/cards/PharmacistCard';

interface PrescriptionItem {
  sno: number;
  customer_id: number;
  prescriptionURL: string;
  created_at: string;
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
          // Check if response.data exists and is an array
          if (response.data && Array.isArray(response.data)) {
            // Sort prescriptions by created_at (newest first)
            const sortedPrescriptions = [...response.data].sort(
              (a: PrescriptionItem, b: PrescriptionItem) => {
                return (
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
                );
              },
            );
            setPrescriptions(sortedPrescriptions);
          } else if (response.data) {
            // If response.data exists but is not an array (might be a single object or different format)
            console.log('Response data is not an array:', response.data);
            // Try to handle other potential formats
            if (typeof response.data === 'object' && response.data !== null) {
              // Check if there's a nested data property
              const dataArray =
                response.data.data || response.data.prescriptions || [];
              if (Array.isArray(dataArray)) {
                const sortedPrescriptions = [...dataArray].sort(
                  (a: PrescriptionItem, b: PrescriptionItem) => {
                    return (
                      new Date(b.created_at).getTime() -
                      new Date(a.created_at).getTime()
                    );
                  },
                );
                setPrescriptions(sortedPrescriptions);
              } else {
                setPrescriptions([]);
              }
            } else {
              setPrescriptions([]);
            }
          } else {
            // Handle empty data
            setPrescriptions([]);
          }
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

  // Separate PDFs and images from the prescriptions
  const pdfs = prescriptions.filter(item =>
    item.prescriptionURL?.toLowerCase().endsWith('.pdf'),
  );
  const images = prescriptions.filter(
    item =>
      item.prescriptionURL &&
      !item.prescriptionURL.toLowerCase().endsWith('.pdf'),
  );

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

        {pdfs.length > 0 && (
          <View style={styles.pdfListContainer}>
            <Text style={styles.heading}>Uploaded PDFs:</Text>
            {pdfs.map(pdf => (
              <View key={`pdf-${pdf.sno}`} style={styles.pdfItem}>
                <FileText size={16} color="#007AFF" />
                <Text style={styles.pdfName}>
                  {pdf.prescriptionURL.split('/').pop()}
                </Text>
                <Text style={styles.uploadTime}>
                  {new Date(pdf.created_at).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        )}

        {images.length > 0 && (
          <View style={styles.imageListContainer}>
            <Text style={styles.heading}>Uploaded Images:</Text>
            <View style={styles.imageGrid}>
              {images.map(image => (
                <View key={`img-${image.sno}`} style={styles.imageItem}>
                  <Image
                    source={{uri: image.prescriptionURL}}
                    style={styles.uploadedImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.uploadTime}>
                    {new Date(image.created_at).toLocaleString()}
                  </Text>
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
