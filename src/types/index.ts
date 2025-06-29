import {StyleProp, ViewStyle} from 'react-native';

export type AuthState = {
  token: string | null;
  customer_id: number | string | null;
  email: string | null;
  phoneNumber: string | null;

  first_name?: string | null;
  last_name?: string | null;
  profileImage: string | {uri: string} | null;
  birthday?: string | null;
  joinedDate?: string | null;

  setAuthentication: (params: {
    token?: string;
    customer_id?: number | string;
    email?: string;
    phoneNumber?: string;
    first_name?: string;
    last_name?: string;
    profileImage?: string;
    birthday?: string;
    joinedDate?: string;
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
    Category: string;
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
  StockAvailableInInventory: number;
  InventoryUpdated: string;
  InventoryUpdatedBy: number;
  DiscountedPercentage: string;
  updated_by: number;
  archivedProduct: number;
  Category: String;
  subCategory: string;
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
  | 'COMPLETED'
  | 'ON GOING'
  | 'CLARIFICATION NEEDED'
  | 'SHIPPED'
  | 'CANCELLED';

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
  id: number;
  coupon_name: string;
  coupon_code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: string;
  minimum_order_value: string;
  start_date: string;
  expiry_date: string;
  uses_limit: number | null;
  category: string;
  description: string;
  status: 'active' | 'inactive';
  is_for_first_time_user: 0 | 1;
  is_for_comeback_user: 0 | 1;
  is_for_loyal_user: 0 | 1;
  is_for_birthday_user: 0 | 1;
  is_general_coupon: 0 | 1;
  is_for_new_customer: 0 | 1;
  is_for_existing_customer: 0 | 1;
  created_at: string;
  updated_at: string;
}
export interface CartItem {
  GST: string;
  SKU: string;
  Type: string;
  Coupons: string;
  Category: string | null;
  HSN_Code: string;
  quantity: number;
  ColdChain: string;
  CostPrice: string;
  productId: number;
  updated_by: number;
  Composition: string;
  ProductName: string;
  Subcategory: string | null;
  Substitutes: string;
  SellingPrice: string;
  SafetyAdvices: string;
  DiscountedPrice: string;
  SimilarProducts: string;
  archivedProduct: number;
  InventoryUpdated: string;
  ManufacturerName: string;
  InventoryUpdatedBy: number;
  ProductInformation: string;
  StorageInstructions: string;
  DiscountedPercentage: string;
  PrescriptionRequired: string;
  StockAvailableInInventory: number;
}

interface Customer {
  customerId: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface PaymentDetails {
  transactionId: string;
}

interface Payment {
  status: string;
  method: string;
  time: string;
  details: PaymentDetails;
}

interface ProductItem {
  productId: number;
  quantity: number;
}

export interface OrderData {
  customer: Customer;
  payment: Payment;
  products: ProductItem[];
  totalOrderAmount: number;
  deliveryStatus: String;
}
