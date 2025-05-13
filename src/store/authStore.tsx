import {create} from 'zustand';

type AuthState = {
  token: string | null;
  email: string | null;
  phoneNumber: string | null;

  setAuthentication: (params: {
    token: string;
    email?: string;
    phoneNumber?: string;
  }) => void;

  clearAuthentication: () => void;
};

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
