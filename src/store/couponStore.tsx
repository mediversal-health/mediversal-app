import {create} from 'zustand';
import {Coupon} from '../types';
interface CouponState {
  selectedCoupon: Coupon | null;

  setSelectedCoupon: (coupon: Coupon | null) => void;
  getSelectedCoupon: () => Coupon | null;
}

export const useCouponStore = create<CouponState>((set, get) => ({
  selectedCoupon: null,

  setSelectedCoupon: (coupon: Coupon | null) => {
    set({selectedCoupon: coupon});
  },

  getSelectedCoupon: () => {
    return get().selectedCoupon;
  },
}));
