// store/prescriptionStore.ts
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PrescriptionFile {
  uri: string;
  type: string;
  name: string;
}

interface PrescriptionState {
  prescriptionFiles: PrescriptionFile[];
  addFiles: (files: PrescriptionFile[]) => void;
  clearPrescriptions: () => void;
}

export const usePrescriptionStore = create<PrescriptionState>()(
  persist(
    set => ({
      prescriptionFiles: [],
      addFiles: files =>
        set(state => ({
          prescriptionFiles: [...state.prescriptionFiles, ...files],
        })),
      clearPrescriptions: () => set({prescriptionFiles: []}),
    }),
    {
      name: 'prescription-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
