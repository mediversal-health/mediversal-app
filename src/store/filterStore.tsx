// In your filterStore.ts
import {create} from 'zustand';
import {ProductCardProps} from '../types';

interface FilterStore {
  filteredProducts: ProductCardProps['product'][] | null;
  setFilteredProducts: (products: ProductCardProps['product'][] | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>(set => ({
  filteredProducts: null,
  setFilteredProducts: products => set({filteredProducts: products}),
  resetFilters: () => set({filteredProducts: null}),
}));
