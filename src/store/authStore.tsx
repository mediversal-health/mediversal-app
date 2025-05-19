import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthState} from '../types';

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
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
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
