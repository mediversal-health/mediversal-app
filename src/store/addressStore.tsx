import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AddressBookTypes} from '../types';

interface AddressBookState {
  addresses: AddressBookTypes[];
  selectedAddress: AddressBookTypes | null;
  hasLoadedAddresses: boolean;
  customerAddressMap: Record<string, AddressBookTypes>;
  setAddresses: (data: AddressBookTypes[]) => void;
  setSelectedAddress: (address: AddressBookTypes | null) => void;
  setHasLoadedAddresses: (loaded: boolean) => void;
  updateCustomerAddressMap: (
    customerId: string,
    address: AddressBookTypes,
  ) => void;
}

export const useAddressBookStore = create<AddressBookState>()(
  persist(
    set => ({
      addresses: [],
      selectedAddress: null,
      hasLoadedAddresses: false,
      customerAddressMap: {},
      setAddresses: data => set({addresses: data}),
      setSelectedAddress: address => set({selectedAddress: address}),
      setHasLoadedAddresses: loaded => set({hasLoadedAddresses: loaded}),
      updateCustomerAddressMap: (customerId, address) =>
        set(state => ({
          customerAddressMap: {
            ...state.customerAddressMap,
            [customerId]: address,
          },
        })),
    }),
    {
      name: 'address-book-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        selectedAddress: state.selectedAddress,
        customerAddressMap: state.customerAddressMap,
      }),
    },
  ),
);
