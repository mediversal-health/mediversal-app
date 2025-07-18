// store/prescriptionStore.ts
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PrescriptionFile {
  uri: string;
  type: string;
  name: string;
}

interface CustomerPrescriptions {
  [customerId: string]: PrescriptionFile[];
}

interface PrescriptionState {
  customerPrescriptions: CustomerPrescriptions;
  addFiles: (customerId: string, files: PrescriptionFile[]) => void;
  removeFile: (customerId: string, index?: number) => void;
  clearPrescriptions: (customerId: string) => void;
  getFiles: (customerId: string) => PrescriptionFile[];
}

export const usePrescriptionStore = create<PrescriptionState>()(
  persist(
    (set, get) => ({
      customerPrescriptions: {},

      addFiles: (customerId, files) =>
        set(state => ({
          customerPrescriptions: {
            ...state.customerPrescriptions,
            [customerId]: [
              ...(state.customerPrescriptions[customerId] || []),
              ...files,
            ],
          },
        })),

      removeFile: (customerId, index) => {
        if (typeof index === 'number') {
          set(state => ({
            customerPrescriptions: {
              ...state.customerPrescriptions,
              [customerId]:
                state.customerPrescriptions[customerId]?.filter(
                  (_, i) => i !== index,
                ) || [],
            },
          }));
        } else {
          const {[customerId]: _, ...rest} = get().customerPrescriptions;
          set({customerPrescriptions: rest});
        }
      },

      clearPrescriptions: customerId => {
        const {[customerId]: _, ...rest} = get().customerPrescriptions;
        set({customerPrescriptions: rest});
      },

      getFiles: customerId => {
        return get().customerPrescriptions[customerId] || [];
      },
    }),
    {
      name: 'prescription-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
