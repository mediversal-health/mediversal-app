import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../types';

interface ProductStore {
  userQuantityMap: Record<string, Record<number, number>>;
  userCartData: Record<string, CartItem[]>;

  setProductQuantity: (
    customerId: string,
    productId: number,
    quantity: number,
  ) => void;
  getProductQuantity: (customerId: string, productId: number) => number;
  setUserCart: (customerId: string, cartData: CartItem[]) => void;
  getUserCart: (customerId: string) => CartItem[];
  clearUserData: (customerId: string) => void;
  removeFromCart: (customerId: string, productId: number) => void;

  subscribe: (listener: () => void) => () => void;
}

export const useCartStore = create<ProductStore>()(
  persist(
    (set, get, api) => ({
      userQuantityMap: {},
      userCartData: {},

      setProductQuantity: (customerId, productId, quantity) => {
        set((state) => ({
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

      setUserCart: (customerId, cartData) => {
        set((state) => ({
          userCartData: {
            ...state.userCartData,
            [customerId]: cartData,
          },
        }));
      },

      getUserCart: (customerId) => {
        return get().userCartData[customerId] || [];
      },

      clearUserData: (customerId) => {
        set((state) => {
          const newUserQuantityMap = { ...state.userQuantityMap };
          const newUserCartData = { ...state.userCartData };
          delete newUserQuantityMap[customerId];
          delete newUserCartData[customerId];
          return {
            userQuantityMap: newUserQuantityMap,
            userCartData: newUserCartData,
          };
        });
      },

      removeFromCart: (customerId, productId) => {
        set((state) => {
          const currentCart = state.userCartData[customerId] || [];
          const updatedCart = currentCart.filter(
            (item) => item.productId !== productId,
          );

          const currentQuantityMap = {
            ...(state.userQuantityMap[customerId] || {}),
          };
          delete currentQuantityMap[productId];

          return {
            userCartData: {
              ...state.userCartData,
              [customerId]: updatedCart,
            },
            userQuantityMap: {
              ...state.userQuantityMap,
              [customerId]: currentQuantityMap,
            },
          };
        });
      },

      subscribe: (listener) => {
        return api.subscribe((state, prevState) => {
          if (
            state.userCartData !== prevState.userCartData ||
            state.userQuantityMap !== prevState.userQuantityMap
          ) {
            listener();
          }
        });
      },
    }),
    {
      name: 'product-store',
      storage: {
        getItem: async (name) => {
          const item = await AsyncStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);
