import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Product} from '../types';

interface ProductStore {
  quantityMap: Record<number, number>;
  // cartItems: Record<number, Product>;
  setProductQuantity: (productId: number, quantity: number) => void;
  getProductQuantity: (productId: number) => number;
  // setProductData: (productId: number, product: Product) => void;
  // getProductData: (productId: number) => Product | undefined;
}

export const useCartStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      quantityMap: {},
      // cartItems: {},

      setProductQuantity: (productId, quantity) => {
        set(state => ({
          quantityMap: {
            ...state.quantityMap,
            [productId]: quantity,
          },
        }));
      },

      getProductQuantity: productId => {
        return get().quantityMap[productId] ?? 0;
      },

      // setProductData: (productId, product) => {
      //   set(state => ({
      //     cartItems: {
      //       ...state.cartItems,
      //       [productId]: product,
      //     },
      //   }));
      // },

      // getProductData: productId => {
      //   return get().cartItems[productId];
      // },
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
