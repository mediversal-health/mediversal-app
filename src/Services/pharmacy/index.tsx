import axios from 'axios';
import {API_URL} from '@env';

const IP_ADDR = API_URL;

export const getProducts = async () => {
  return axios.get(`${IP_ADDR}/api/Product/getProducts`);
};

export const getProductsById = async (productId: number) => {
  return axios.get(`${IP_ADDR}/api/Product/getProductById/${productId}`);
};
