import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {useCouponStore} from '../../../store/couponStore';
import {Coupon} from '../../../types';
import styles from './index.styles';
import {useAuthStore} from '../../../store/authStore';
import {useToastStore} from '../../../store/toastStore';

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
  const {getSelectedCoupon, setSelectedCoupon} = useCouponStore();
  const customer_id = useAuthStore(state => state.customer_id);
  const showToast = useToastStore(state => state.showToast);
  const selectedCoupon = customer_id
    ? getSelectedCoupon(String(customer_id))
    : null;
  const isApplied = selectedCoupon?.coupon_code === coupon.coupon_code;

  const handleApply = () => {
    if (customer_id !== null && customer_id !== undefined) {
      setSelectedCoupon(String(customer_id), coupon);
      showToast('Coupon Applied', 'success', 3000, true);
      onApply?.(coupon);
    }
  };

  const handleRemove = () => {
    if (customer_id !== null && customer_id !== undefined) {
      setSelectedCoupon(String(customer_id), null);

      onRemove?.(coupon);
    }
  };

  return (
    <View style={[styles.container, isApplied && styles.appliedContainer]}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Text style={styles.couponCode}>{coupon.coupon_code}</Text>
          <Text style={styles.title}>{coupon.coupon_name}</Text>
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
