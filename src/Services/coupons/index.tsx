import axios from 'axios';
const IP_ADDR = process.env.API_URL;

export const fetchCoupons = async (
  userId: any,
  cartTotal: number,
  birthday: string,
) => {
  try {
    const response = await axios.post(
      `${IP_ADDR}/admin/customers/coupons/eligible`,
      {
        userId,
        cartTotal,
        birthday: birthday || '',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching coupons:', error);
    throw error;
  }
};
