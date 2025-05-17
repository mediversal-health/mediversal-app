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

export interface AddressBookTypes {
  houseNo: string;
  areaDetails: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  recipient: string;
  phoneNumber: string;
  addressType: string;
}

export interface Product {
  productId: number;
  ProductName: string;
  CostPrice: string;
  SellingPrice: string;
  DiscountedPrice: string;
  Type: string;
  PrescriptionRequired: string;
  ColdChain: string;
  ManufacturerName: string;
  Composition: string;
  ProductInformation: string;
  SafetyAdvices: string;
  StorageInstructions: string;
  Substitutes: string;
  SimilarProducts: string;
  GST: string;
  Coupons: string | null;
  AvailableInInventory: number;
  InventoryUpdated: string;
  InventoryUpdatedBy: number;
  DiscountedPercentage: string;
  updated_by: number;
  archivedProduct: number;
  images: string[];
}
