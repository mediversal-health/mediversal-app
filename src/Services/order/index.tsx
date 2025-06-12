import axios from 'axios';
import {API_URL} from '@env';

const IP_ADDR = API_URL;

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

interface OrderData {
  customer: Customer;
  payment: Payment;
  products: ProductItem[];
  totalOrderAmount: number;
  deliveryStatus: String;
}

export const createOrder = async (orderData: OrderData) => {
  try {
    const response = await axios.post(`${IP_ADDR}/api/order`, orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Order creation failed:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
export const getOrders = async (customerId: string) => {
  return axios.get(`${IP_ADDR}/api/order/CustomerId/${customerId}`);
};
