import {StyleProp, ViewStyle} from 'react-native';

export type AuthState = {
  token: string | null;
  email: string | null;
  phoneNumber: string | null;

  setAuthentication: (params: {
    token: string;
    email?: string;
    phoneNumber?: string;
  }) => void;

  clearAuthentication: () => void;
};
export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    quantity: string;
    delivery: string;
    originalPrice: number;
    discountedPrice: number;
    discountPercentage: number;
    image: string;
  };
  onAddToCart?: (id: string, quantity: number) => void;
  borderColor?: string;
  buttonColor?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}
