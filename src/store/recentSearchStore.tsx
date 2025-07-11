import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RecentSearchStore {
  searches: string[];
  addSearch: (term: string, customerId: string) => Promise<void>;
  clearSearches: (customerId: string) => Promise<void>;
  removeSearch: (index: number, customerId: string) => Promise<void>;
  hydrate: (customerId: string) => Promise<void>;
}

const getStorageKey = (customerId: string) => `recent_searches_${customerId}`;

const useRecentSearchStore = create<RecentSearchStore>((set, get) => ({
  searches: [],

  addSearch: async (term, customerId) => {
    try {
      set(state => {
        if (!term.trim() || state.searches.includes(term)) {
          return state;
        }

        const newSearches = [term, ...state.searches].slice(0, 10);
        return { searches: newSearches };
      });

      await AsyncStorage.setItem(
        getStorageKey(customerId),
        JSON.stringify(get().searches),
      );
    } catch (error) {
      console.error('Failed to add search term:', error);
    }
  },

  clearSearches: async customerId => {
    try {
      set({ searches: [] });
      await AsyncStorage.removeItem(getStorageKey(customerId));
    } catch (error) {
      console.error('Failed to clear searches:', error);
    }
  },

  removeSearch: async (index, customerId) => {
    try {
      set(state => {
        const newSearches = [...state.searches];
        newSearches.splice(index, 1);
        return { searches: newSearches };
      });

      await AsyncStorage.setItem(
        getStorageKey(customerId),
        JSON.stringify(get().searches),
      );
    } catch (error) {
      console.error('Failed to remove search term:', error);
    }
  },

  hydrate: async customerId => {
    try {
      const data = await AsyncStorage.getItem(getStorageKey(customerId));
      if (data) {
        set({ searches: JSON.parse(data) });
      } else {
        set({ searches: [] });
      }
    } catch (error) {
      console.error('Failed to hydrate searches:', error);
    }
  },
}));

export default useRecentSearchStore;
