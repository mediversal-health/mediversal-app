import axios from 'axios';
const IP_ADDR = process.env.API_URL;
import {OrderData} from '../../types';

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
