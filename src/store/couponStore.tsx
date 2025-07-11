import { create } from 'zustand';
import { Coupon } from '../types';

interface CouponState {
  customerCoupons: Record<string, Coupon | null>;

  setSelectedCoupon: (customerId: string, coupon: Coupon | null) => void;

  getSelectedCoupon: (customerId: string) => Coupon | null;
}

export const useCouponStore = create<CouponState>((set, get) => ({
  customerCoupons: {},

  setSelectedCoupon: (customerId: string, coupon: Coupon | null) => {
    set(state => ({
      customerCoupons: {
        ...state.customerCoupons,
        [customerId]: coupon,
      },
    }));
  },

  getSelectedCoupon: (customerId: string) => {
    return get().customerCoupons[customerId] || null;
  },
}));
