/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, Text} from 'react-native';
import ExpandableSection from './index';
import styles from './index.styles';

const ProductInfo: React.FC = () => {
  return (
    <ScrollView style={{flex: 1}}>
      <ExpandableSection title="Product Information">
        <Text style={styles.section}>
          Dolo 650 Tablet helps relieve pain and fever by blocking the release
          of certain chemical messengers responsible for fever and pain. It is
          used to treat headaches, migraine, toothaches, sore throats, period
          (menstrual) pains, arthritis, muscle aches, and the common cold.
        </Text>
        <Text style={styles.section}>
          Dolo 650 Tablet has been one of the most widely prescribed
          paracetamol-based medications during the COVID-19 pandemic. It should
          be taken regularly as per the doctor’s advice. Take it with food to
          avoid an upset stomach. It may be taken alone or in combination with
          other medications. However, no more than four doses of Dolo 650 Tablet
          can be taken in 24 hours with a gap of at least 4 hours between two
          doses. Please do not take it for longer than recommended.
        </Text>
        <Text style={styles.section}>
          Generally, Dolo 650 Tablet is well tolerated, and side effects are
          rare. However, it may temporarily cause stomach pain, nausea, and
          vomiting in some people. Consult the doctor if any of these side
          effects persist or become bothersome..
        </Text>
        <Text style={styles.section}>
          Though Dolo 650 Tablet is essentially safe, it may not suit everyone.
          Before taking this medicine, let the doctor know if you have any liver
          or kidney problems, are allergic to it, or are taking other
          medications as this might affect the dose or suitability of the
          medicine. In general, take the lowest dose that works for the shortest
          possible time. It is also the first choice of painkillers during
          pregnancy or breastfeeding.
        </Text>
        <Text style={styles.heading}>Uses of Dolo 650 Tablet</Text>
        <Text style={styles.list}>• Pain relief</Text>
        <Text style={styles.list}>• Treatment of Fever</Text>
        <Text style={styles.heading}>Uses of Dolo 650 Tablet</Text>
        <Text style={styles.heading}>Safety</Text>
        <Text style={styles.section}>
          In Pain Relief Dolo 650 Tablet is a common painkiller used to treat
          aches and pains. It works by blocking chemical messengers in the brain
          that tell us we have pain. It is effective in relieving pain caused by
          headache, migraine, nerve pain, toothache, sore throat, period
          (menstrual) pains, arthritis, and muscle aches. This medicine is very
          widely used and very rarely causes side effects if taken at the right
          dosage. Take it as it is prescribed to get the most benefit. Do not
          take more or for longer than needed as that can be dangerous. In
          general, you should take the lowest dose that works, for the shortest
          possible time. It is also the first choice of painkiller during
          pregnancy or breastfeeding. In Treatment of Fever Dolo 650 Tablet is
          also used to reduce a high temperature (fever). It works by blocking
          the release of certain chemical messengers that cause fever. It may be
          prescribed alone or in combination with another medicine. You should
          take it regularly as advised by your doctor.
        </Text>
      </ExpandableSection>

      <ExpandableSection title="Safety Advices">
        <Text style={styles.heading}>Safety Advice of Dolo 650 Tablet</Text>
        <Text style={styles.heading}>Safety Advice of Dolo 650 Tablet</Text>
        <Text style={styles.section}>
          Dolo 650 Tablet is safe to use during pregnancy. Most studies have
          shown no risk to the developing baby. However, it is always best to
          consult your doctor before taking any medicine during pregnancy. Dolo
          650 Tablet is safe to use during breastfeeding. Most studies have
          shown no risk to the baby. However, it is always best to consult your
          doctor before taking any medicine during breastfeeding. Dolo 650
          Tablet is safe to use in patients with kidney disease. No dose
          adjustment of Dolo 650 Tablet is recommended. However, consult your
          doctor before taking it. Dolo 650 Tablet is safe to use in patients
          with liver disease. No dose adjustment of Dolo 650 Tablet is
          recommended. However, consult your doctor before taking it. Dolo 650
          Tablet is not recommended for use in patients with severe liver
          disease. Dolo 650 Tablet is not recommended for use in patients with
          severe liver disease. Dolo 650 Tablet is not recommended for use in
          patients with severe liver disease. Dolo 650 Tablet is not recommended
          for use in patients with severe liver disease. Dolo 650 Tablet is not
          recommended for use in patients with severe liver disease.
        </Text>
      </ExpandableSection>

      <ExpandableSection title="Storage & Special Instructions">
        <Text style={styles.heading}>Storage & Special Instructions</Text>
        <Text style={styles.heading}>Alcohol UNSAFE</Text>
        <Text style={styles.section}>
          Dolo 650 Tablet is safe to use during pregnancy. Most studies have
          shown no risk to the developing baby. However, it is always best to
          consult your doctor before taking any medicine during pregnancy. Dolo
          650 Tablet is safe to use during breastfeeding. Most studies have
          shown no risk to the baby. However, it is always best to consult your
          doctor before taking any medicine during breastfeeding. Dolo 650
          Tablet is safe to use in patients with kidney disease. No dose
          adjustment of Dolo 650 Tablet is recommended. However, consult your
          doctor before taking it. Dolo 650 Tablet is safe to use in patients
          with liver disease. No dose adjustment of Dolo 650 Tablet is
          recommended. However, consult your doctor before taking it. Dolo 650
          Tablet is not recommended for use in patients with severe liver
          disease. Dolo 650 Tablet is not recommended for use in patients with
          severe liver disease. Dolo 650 Tablet is not recommended for use in
          patients with severe liver disease. Dolo 650 Tablet is not recommended
          for use in patients with severe liver disease. Dolo 650 Tablet is not
          recommended for use in patients with severe liver disease.
        </Text>
      </ExpandableSection>
    </ScrollView>
  );
};

export default ProductInfo;
