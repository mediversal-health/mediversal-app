import axios from 'axios';

const IP_ADDR = 'https://1qjdu8gryi.execute-api.ap-south-1.amazonaws.com/dev/';

export const sendOTP = async (phoneNumber: string) => {
  return axios.post(`${IP_ADDR}/api/login`, {
    identifier: phoneNumber,
    method: 'phone',
  });
};

export const verifyOTP = async (phoneNumber: string, otp: string) => {
  return axios.post(`${IP_ADDR}/api/verify-otp`, {
    identifier: phoneNumber,
    otp,
    method: 'phone',
  });
};
