import axios from 'axios';
import {API_URL} from '@env';

const IP_ADDR = API_URL;

// export const fetchCoupons = async (userId: any, cartTotal: number) => {
//   try {
//     const response = await axios.post(
//       'http://192.168.1.29:5001/admin/customers/coupons/eligible',
//       {
//         userId,
//         cartTotal,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//     throw error;
//   }
// };
export const fetchCoupons = async () => {
  try {
    const response = await axios.get(`${IP_ADDR}/admin/coupons`);
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};
