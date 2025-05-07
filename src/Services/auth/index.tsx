import axios from 'axios';

const IP_ADDR = 'https://1qjdu8gryi.execute-api.ap-south-1.amazonaws.com/dev/';

export const sendOTP = async (
  identifier: string,
  password: string,
  method: string,
) => {
  return axios.post(`${IP_ADDR}/api/login`, {
    identifier: identifier,
    password: password,
    method: method,
  });
};

export const verifyOTP = async (identifier: string, otp: string) => {
  return axios.post(`${IP_ADDR}/api/verify-otp`, {
    identifier: identifier,
    otp,
    method: 'phone',
  });
};

export const forgotPassword = async (identifier: string, method: string) => {
  return axios.post(`${IP_ADDR}/api/forgot-password`, {
    identifier: identifier,
    method: method,
  });
};

export const verifyResetOtp = async (
  identifier: string,
  otp: string,
  method: string,
) => {
  return axios.post(`${IP_ADDR}/api/verify-reset-otp`, {
    identifier: identifier,
    otp,
    method: method,
  });
};

export const ResetPassword = async (
  identifier: string,
  newPassword: string,
  method: string,
) => {
  return axios.post(`${IP_ADDR}/api/reset-password`, {
    identifier: identifier,
    newPassword: newPassword,
    method: method,
  });
};

export const RegisterUser = async (identifier: string, password: string) => {
  return axios.post(`${IP_ADDR}/api/register`, {
    email: identifier,
    password: password,
  });
};

export const verifyRegisterUser = async (
  identifier: string,
  otp: string,
  password: string,
) => {
  return axios.post(`${IP_ADDR}/api/verify-register-otp`, {
    email: identifier,
    otp,
    password: password,
  });
};
