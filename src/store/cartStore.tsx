import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Product} from '../types';

interface ProductStore {
  userQuantityMap: Record<string, Record<number, number>>;
  setProductQuantity: (
    customerId: string,
    productId: number,
    quantity: number,
  ) => void;
  getProductQuantity: (customerId: string, productId: number) => number;
  clearUserData: (customerId: string) => void;
}

export const useCartStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      userQuantityMap: {},

      setProductQuantity: (customerId, productId, quantity) => {
        set(state => ({
          userQuantityMap: {
            ...state.userQuantityMap,
            [customerId]: {
              ...(state.userQuantityMap[customerId] || {}),
              [productId]: quantity,
            },
          },
        }));
      },

      getProductQuantity: (customerId, productId) => {
        return get().userQuantityMap[customerId]?.[productId] ?? 0;
      },

      clearUserData: customerId => {
        set(state => {
          const newUserQuantityMap = {...state.userQuantityMap};
          delete newUserQuantityMap[customerId];
          return {userQuantityMap: newUserQuantityMap};
        });
      },
    }),
    {
      name: 'product-store',
      storage: {
        getItem: async name => {
          const item = await AsyncStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async name => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);
