import axios from 'axios';
const IP_ADDR = process.env.API_URL;

export const sendOTP = async (
  identifier: string,
  password: string,
  method: string,
) => {
  return axios.post(`${IP_ADDR}/api/Auth/login`, {
    identifier: identifier,
    password: password,
    method: method,
  });
};

export const verifyOTP = async (
  identifier: string,
  otp: string,
  method: string,
) => {
  return axios.post(`${IP_ADDR}/api/Auth/verify-otp`, {
    identifier: identifier,
    otp,
    method: method,
  });
};

export const forgotPassword = async (identifier: string, method: string) => {
  return axios.post(`${IP_ADDR}/api/Auth/forgot-password`, {
    identifier: identifier,
    method: method,
  });
};

export const verifyResetOtp = async (
  identifier: string,
  otp: string,
  method: string,
) => {
  return axios.post(`${IP_ADDR}/api/Auth/verify-reset-otp`, {
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
  return axios.post(`${IP_ADDR}/api/Auth/reset-password`, {
    identifier: identifier,
    newPassword: newPassword,
    method: method,
  });
};

export const RegisterUser = async (identifier: string, password: string) => {
  return axios.post(`${IP_ADDR}/api/Auth/register`, {
    email: identifier,
    password: password,
  });
};

export const verifyRegisterUser = async (
  identifier: string,
  otp: string,
  password: string,
) => {
  return axios.post(`${IP_ADDR}/api/Auth/verify-register-otp`, {
    email: identifier,
    otp,
    password: password,
  });
};

export const googleSignIn = async (email: string | undefined) => {
  return axios.post(`${IP_ADDR}/api/Auth/google-login`, {
    email,
  });
};
