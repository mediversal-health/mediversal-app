import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {useCouponStore} from '../../../store/couponStore';
import {Coupon} from '../../../types';
import styles from './index.styles';
interface CouponCardProps {
  coupon: Coupon;
  applyButtonText?: string;
  removeButtonText?: string;
  onApply?: (coupon: Coupon) => void;
  onRemove?: (coupon: Coupon) => void;
}

const CouponCard: React.FC<CouponCardProps> = ({
  coupon,
  applyButtonText = 'Apply',
  removeButtonText = 'Remove',
  onApply,
  onRemove,
}) => {
  const {selectedCoupon, setSelectedCoupon} = useCouponStore();

  const isApplied = selectedCoupon?.couponCode === coupon.couponCode;

  const handleApply = () => {
    setSelectedCoupon(coupon);
    onApply?.(coupon);
  };

  const handleRemove = () => {
    setSelectedCoupon(null);
    onRemove?.(coupon);
  };

  return (
    <View style={[styles.container, isApplied && styles.appliedContainer]}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Text style={styles.couponCode}>{coupon.couponCode}</Text>
          <Text style={styles.title}>{coupon.title}</Text>
          <Text style={styles.description}>{coupon.description}</Text>
        </View>

        <View style={styles.rightSection}>
          {!isApplied ? (
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>{applyButtonText}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemove}>
              <Text style={styles.removeButtonText}>{removeButtonText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CouponCard;
