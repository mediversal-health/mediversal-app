/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { styles } from './index.styles';

const OtherDetailsCard: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      {/* Collapsible Card Header */}
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={[styles.card, expanded && { backgroundColor: '#E8F4F7' }]}
      >
        <Text style={styles.title}>Other Details</Text>
        {expanded ? (
          <ChevronUp size={18} color="#000" />
        ) : (
          <ChevronDown size={18} color="#000" />
        )}
      </TouchableOpacity>

      {/* Expanded Content */}
      {expanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.expandedText}>
            Mediversal’s 24/7 is a technology platform to connect sellers and
            buyers and is not involved in sales of any product. Offer for sale
            on the products and services are provided/sold by the sellers only.
            For more details read{' '}
            <Text style={styles.terms}>Terms and Conditions</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default OtherDetailsCard;
