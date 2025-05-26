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
export const updateCustomerAddress = async (
  customerId: string,
  addressId: string,
  addressData: AddressBookTypes,
) => {
  return axios.put(
    `${IP_ADDR}/api/customerAddress/${customerId}/${addressId}`,
    {
      ...addressData,
    },
  );
};

// Delete a specific customer address
export const deleteCustomerAddress = async (
  customerId: string,
  addressId: string,
) => {
  return axios.delete(
    `${IP_ADDR}/api/customerAddress/${customerId}/${addressId}`,
  );
};
