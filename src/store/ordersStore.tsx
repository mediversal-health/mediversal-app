import {create} from 'zustand';
import {OrderData} from '../types';

interface OrdersState {
  orders: OrderData[];
  setOrders: (orders: OrderData[]) => void;
  clearOrders: () => void;
}

export const useOrdersStore = create<OrdersState>(set => ({
  orders: [],
  setOrders: orders => set({orders}),
  clearOrders: () => set({orders: []}),
}));
