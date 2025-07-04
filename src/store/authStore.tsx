import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthState} from '../types';

interface AuthStore extends AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
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
      first_name: null,
      last_name: null,
      profileImage: null,
      birthday: null,
      joinedDate: null,
      rehydrated: false,
      isAuthenticated: false,

      // Add setIsAuthenticated action
      setIsAuthenticated: (value: boolean) => set({isAuthenticated: value}),

      setAuthentication: ({
        token,
        customer_id,
        email,
        phoneNumber,
        first_name,
        last_name,
        profileImage,
        birthday,
        joinedDate,
      }) =>
        set(state => ({
          ...state,
          token,
          customer_id: customer_id || null,
          email: email || null,
          phoneNumber: phoneNumber || null,
          first_name: first_name || state.first_name || null,
          last_name: last_name || state.last_name || null,
          profileImage:
            typeof profileImage === 'string'
              ? profileImage
              : profileImage?.uri || state.profileImage || null,
          birthday: birthday || state.birthday || null,
          joinedDate: joinedDate || state.joinedDate || null,
        })),

      clearAuthentication: () =>
        set({
          token: null,
          customer_id: null,
          email: null,
          phoneNumber: null,
          first_name: null,
          last_name: null,
          profileImage: null,
          birthday: null,
          joinedDate: null,
        }),

      setRehydrated: value => set({rehydrated: value}),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        state?.setRehydrated(true);
        // After rehydration, set isAuthenticated based on token presence
        if (state) {
          state.setIsAuthenticated(!!state.token);
        }
      },
    },
  ),
);
