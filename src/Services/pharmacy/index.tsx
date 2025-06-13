import axios from 'axios';
const IP_ADDR = process.env.API_URL;

export const getProducts = async () => {
  return axios.get(`${IP_ADDR}/api/Product/getProducts`);
};

export const getProductsById = async (productId: number) => {
  return axios.get(`${IP_ADDR}/api/Product/getProductById/${productId}`);
};
