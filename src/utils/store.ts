import { create } from "zustand";

interface CharStore {
    searchCharacter: string;
    setSearchCharacter: (character: string) => void;

    selectedFilter: string;
    setSelectedFilter: (filter: string) => void;
}

export const useCharStore = create<CharStore>()((set) => ({
    
    // Store for the search bar at the header
    searchCharacter: '',
    setSearchCharacter: (searchCharacter) => set({ searchCharacter }),

    // Store for the selected filter in the filter button
    selectedFilter: 'Todos',
    setSelectedFilter: (selectedFilter) => set({ selectedFilter }),
}))