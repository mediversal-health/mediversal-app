// authStore.ts
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthState} from '../types';

interface AuthStore extends AuthState {
  setAuthentication: (data: Partial<AuthState>) => void;
  clearAuthentication: () => void;
  rehydrated: boolean;
  setRehydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      token: null,
      customer_id: null,
      email: null,
      phoneNumber: null,
      fullName: null,
      profileImage: null,
      dateOfBirth: null,
      joinedDate: null,
      rehydrated: false,

      setAuthentication: ({
        token,
        customer_id,
        email,
        phoneNumber,
        fullName,
        profileImage,
        dateOfBirth,
        joinedDate,
      }) =>
        set(state => ({
          ...state,
          token,
          customer_id: customer_id || null,
          email: email || null,
          phoneNumber: phoneNumber || null,
          fullName: fullName || state.fullName || null,
          profileImage: profileImage || state.profileImage || null,
          dateOfBirth: dateOfBirth || state.dateOfBirth || null,
          joinedDate: joinedDate || state.joinedDate || null,
        })),

      clearAuthentication: () =>
        set({
          token: null,
          customer_id: null,
          email: null,
          phoneNumber: null,
          fullName: null,
          profileImage: null,
          dateOfBirth: null,
          joinedDate: null,
        }),

      setRehydrated: value => set({rehydrated: value}),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        state?.setRehydrated(true);
      },
    },
  ),
);
