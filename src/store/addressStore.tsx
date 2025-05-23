import {create} from 'zustand';
import {AddressBookTypes} from '../types';

interface AddressBookState {
  addresses: AddressBookTypes[];
  setAddresses: (data: AddressBookTypes[]) => void;
}

export const useAddressBookStore = create<AddressBookState>(set => ({
  addresses: [],

  setAddresses: data => set({addresses: data}),
}));
