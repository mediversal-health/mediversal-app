import {create} from 'zustand';
import {AuthState} from '../types';

export const useAuthStore = create<AuthState>(set => ({
  token: null,
  email: null,
  phoneNumber: null,

  setAuthentication: ({token, email, phoneNumber}) =>
    set({
      token,
      email: email || null,
      phoneNumber: phoneNumber || null,
    }),

  clearAuthentication: () =>
    set({
      token: null,
      email: null,
      phoneNumber: null,
    }),
}));
