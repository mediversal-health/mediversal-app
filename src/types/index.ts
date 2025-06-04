import {StyleProp, ViewStyle} from 'react-native';

export type AuthState = {
  token: string | null;
  customer_id: number | String | null;
  email: string | null;
  phoneNumber: string | null;

  setAuthentication: (params: {
    token: string;
    customer_id?: number | String;
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
  onUpdateCart?: (id: string, quantity: number) => void;
  borderColor?: string;
  buttonColor?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  addingToCart?: boolean;
}

export interface AddressBookTypes {
  sno?: number;
  Customer_id?: string;
  Customer_Address_id?: string;
  Address: string;
  Home_Floor_FlatNumber: string;
  Area_details: string;
  LandMark: string;
  City: string;
  State: string;
  Contact_details: string;
  Recipient_name: string;
  PhoneNumber: string;
  PinCode: number;
  Country: string;
  Address_type: string;
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
  quantity?: number;
}

export type UploadType = 'image' | 'pdf' | 'camera';

export interface UploadPickerHandle {
  openPicker: (type: UploadType) => void;
  openCamera: () => void;
  openGallery: () => void;
  openDocumentPicker: () => void;
}
export type OrderStatus =
  | 'Completed'
  | 'On Going'
  | 'Clarification Needed'
  | 'Shipped'
  | 'Cancelled';

export interface Order {
  name: string;
  orderId: string;
  date: string;
  items: string;
  amount: string;
  status: OrderStatus;
}
export type PrescribedOrderStatus = 'Approved' | 'Clarification Needed';
export interface PrescribedOrder {
  name: string;
  orderId: string;
  quantity: string;
  amount: string;
  status: PrescribedOrderStatus;
}
export interface Coupon {
  couponCode: string;
  title: string;
  discountType?: 'Fixed' | 'Percentage';
  discountNumber: string;
  description: string;
}
