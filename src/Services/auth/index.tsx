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

export const updateProfile = async (
  customer_id: string,
  formData: {
    first_name: string | undefined;
    last_name: string | undefined;
    birthday: string;
    email: string;
    phone_number: string;
    image?: {
      uri: string;
      type: string;
      name: string;
    };
  },
) => {
  const data = new FormData();

  data.append('first_name', formData.first_name);
  data.append('last_name', formData.last_name);
  data.append('dateof_birth', formData.birthday);
  data.append('email', formData.email);
  data.append('phone_number', formData.phone_number);

  if (formData.image) {
    data.append('images', {
      uri: formData.image.uri,
      type: formData.image.type || 'image/jpeg',
      name: formData.image.name || 'profile.jpg',
    });
  }

  return axios.put(`${IP_ADDR}/api/Auth/update-profile/${customer_id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
