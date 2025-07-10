import axios from 'axios';
import Config from 'react-native-config';

const ACCESS_TOKEN = Config.RAPID_SHYP_ACCESS_TOKEN;
const API_URL = Config.RAPID_SHYP_API_URL;
export const trackOrders = async (seller_order_id: number, awb: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/track_order`,
      {
        seller_order_id,
        awb,
      },
      {
        headers: {
          'content-type': 'application/json',
          'rapidshyp-token': ACCESS_TOKEN,
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

export const cancelOrder = async (orderId: string | number) => {
  try {
    const response = await axios.post(
      `${API_URL}/cancel_order`,
      {
        orderId: orderId.toString(),
        storeName: 'DEFAULT',
      },
      {
        headers: {
          'content-type': 'application/json',
          'rapidshyp-token': ACCESS_TOKEN,
        },
        timeout: 15000,
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Order cancellation failed:', {
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
