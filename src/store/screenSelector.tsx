import { create } from 'zustand';

type ScreenState = {
  currentScreen: 'Home' | 'Pharmacy' | 'Homecare' | 'Consultation' | 'Profile';
  setCurrentScreen: (
    screen: 'Home' | 'Pharmacy' | 'Homecare' | 'Consultation' | 'Profile',
  ) => void;
};

export const useScreenStore = create<ScreenState>(set => ({
  currentScreen: 'Home',
  setCurrentScreen: screen => set({ currentScreen: screen }),
}));
