import axios from 'axios';
const IP_ADDR = process.env.API_URL;
import {Product} from '../../types';

export const getCartItems = async (customerId: any) => {
  try {
    const response = await axios.get(`${IP_ADDR}/api/cart/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export const addToCart = async (customerId: any, productData: Product) => {
  try {
    const response = await axios.post(
      `${IP_ADDR}/api/cart/${customerId}`,
      productData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCart = async (
  customerId: any,
  productId: any,
  quantity: number,
) => {
  try {
    const response = await axios.post(
      `${IP_ADDR}/api/cart/quantity/${customerId}`,
      {productId, quantity},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const DeleteFromCart = async (customerId: any, productIds: number[]) => {
  try {
    const response = await axios.delete(`${IP_ADDR}/api/cart/${customerId}`, {
      data: {productIds: productIds},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};
