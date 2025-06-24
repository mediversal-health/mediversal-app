import {create} from 'zustand';
import {AddressBookTypes} from '../types';

interface AddressBookState {
  addresses: AddressBookTypes[];
  selectedAddress: AddressBookTypes | null;
  hasLoadedAddresses: boolean;
  setAddresses: (data: AddressBookTypes[]) => void;
  setSelectedAddress: (address: AddressBookTypes | null) => void;
  setHasLoadedAddresses: (loaded: boolean) => void;
}

export const useAddressBookStore = create<AddressBookState>(set => ({
  addresses: [],
  selectedAddress: null,
  hasLoadedAddresses: false, // Initialize as false
  setAddresses: data => set({addresses: data}),
  setSelectedAddress: address => set({selectedAddress: address}),
  setHasLoadedAddresses: loaded => set({hasLoadedAddresses: loaded}),
}));
