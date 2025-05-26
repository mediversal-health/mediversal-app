import {create} from 'zustand';
import {AddressBookTypes} from '../types';

interface AddressBookState {
  addresses: AddressBookTypes[];
  setAddresses: (data: AddressBookTypes[]) => void;
  selectedAddress: AddressBookTypes | null;
  setSelectedAddress: (address: AddressBookTypes) => void;
}

export const useAddressBookStore = create<AddressBookState>(set => ({
  addresses: [],
  selectedAddress: null,

  setAddresses: data => set({addresses: data}),
  setSelectedAddress: address => set({selectedAddress: address}),
}));
