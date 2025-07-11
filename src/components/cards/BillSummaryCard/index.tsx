/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronUp, Percent, FileText } from 'lucide-react-native';
import { styles } from './index.styles';

type BillDetails = {
  cartTotal: number;
  couponDiscount: number;
  handlingFee: number;
  platformFee: number;
  deliveryCharges: number;
};

type Props = {
  originalPrice: number;
  finalPrice: number;
  details: BillDetails;
};

const BillSummaryCard: React.FC<Props> = ({
  originalPrice,
  finalPrice,
  details,
}) => {
  const [expanded, setExpanded] = useState(false);
  const savings = originalPrice - finalPrice;

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <View>
      {/* Main Card */}
      <TouchableOpacity
        style={[styles.card, expanded ? { height: 60 } : { height: 60 }]}
        onPress={toggleExpand}>
        <View style={styles.cardContent}>
          <FileText color="#161D1F" size={20} />
          <View style={{ flex: 1 }}>
            <Text style={styles.billTitle}>Total Bill</Text>
            <Text style={styles.inclCharges}>Incl. charges</Text>
          </View>

          <View style={styles.priceWrapper}>
            <Text style={styles.finalPrice}>₹{finalPrice}</Text>
            <Text style={styles.cutPrice}>₹{originalPrice}</Text>
            {expanded ? (
              <ChevronUp size={18} color="#000" />
            ) : (
              <ChevronDown size={18} color="#000" />
            )}
          </View>
        </View>
      </TouchableOpacity>

      {/* Savings Info (always visible) */}
      <View style={styles.savingsRow}>
        <Percent size={16} color="#FE90E2" />
        <Text style={styles.savingsText}>
          You will save ₹{savings} on this order
        </Text>
      </View>

      {/* Expanded Bill Details */}
      {expanded && (
        <View style={styles.detailsSection}>
          <Text style={styles.detailsHeading}>Bill Details</Text>
          <View style={styles.row}>
            <Text style={styles.leftText}>Cart Total</Text>

            <Text style={styles.rightText}>₹{details.cartTotal}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftText}>Coupon Discount</Text>
            <Text style={styles.rightText}>- ₹{details.couponDiscount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftText}>Handling & Packaging Fee</Text>
            <Text style={styles.rightText}>₹{details.handlingFee}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftText}>Platform Fee</Text>
            <Text style={styles.rightText}>₹{details.platformFee}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftText}>Delivery Charges</Text>
            <Text style={styles.rightText}>₹{details.deliveryCharges}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.totalToPay}>To Pay</Text>
            <Text style={styles.totalToPay}>₹{finalPrice}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default BillSummaryCard;
