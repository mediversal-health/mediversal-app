// stores/useRecentSearchStore.ts
import {create} from 'zustand';

interface RecentSearchStore {
  searches: string[];
  addSearch: (term: string) => void;
  clearSearches: () => void;
  removeSearch: (index: number) => void;
}

const useRecentSearchStore = create<RecentSearchStore>(set => ({
  searches: [],
  addSearch: term => {
    set(state => {
      // Avoid duplicates and empty terms
      if (!term.trim() || state.searches.includes(term)) {
        return state;
      }
      // Add new term to beginning of array
      const newSearches = [term, ...state.searches].slice(0, 10); // Limit to 10 recent searches
      return {searches: newSearches};
    });
  },
  clearSearches: () => set({searches: []}),
  removeSearch: index => {
    set(state => {
      const newSearches = [...state.searches];
      newSearches.splice(index, 1);
      return {searches: newSearches};
    });
  },
}));

export default useRecentSearchStore;
