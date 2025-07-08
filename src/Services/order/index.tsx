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

export const trackOrders = async (seller_order_id: number, awb: string) => {
  try {
    const response = await axios.post(
      'https://api.rapidshyp.com/rapidshyp/apis/v1/track_order',
      {
        seller_order_id,
        awb,
      },
      {
        headers: {
          'content-type': 'application/json',
          'rapidshyp-token':
            '61cb98382ffe7f898e7a2d655a65cc74590f47ddfa310bb56fa81ab0cda695ae',
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Tracking failed:', {
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
