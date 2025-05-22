import axios from 'axios';
import {API_URL} from '@env';
import {AddressBookTypes} from '../../types';

const IP_ADDR = API_URL;

export const saveCustomerAddress = async (
  customerId: string,
  addressData: AddressBookTypes,
) => {
  axios.post(`${IP_ADDR}/api/customerAddress/${customerId}`, {
    ...addressData,
  });
};

export const getCustomerAddresses = async (customerId: string) => {
  return axios.get(`${IP_ADDR}/api/customerAddress/${customerId}`);
};
