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
    console.error('Error creating order:', error);
    throw error;
  }
};
