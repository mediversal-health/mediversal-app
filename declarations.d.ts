declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
declare module 'react-native-razorpay' {
  interface RazorpayOptions {
    description?: string;
    image?: string;
    currency?: string;
    key: string;
    amount: string | number;
    name?: string;
    prefill?: {
      email?: string;
      contact?: string;
      name?: string;
    };
    theme?: {
      color?: string;
    };
  }

  interface RazorpaySuccess {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
  }

  const RazorpayCheckout: {
    open(options: RazorpayOptions): Promise<RazorpaySuccess>;
    onExternalWalletSelection?(callback: (data: any) => void): void;
  };

  export default RazorpayCheckout;
}
