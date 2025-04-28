import { create } from "zustand";

interface CharStore {
    searchCharacter: string;
    setSearchCharacter: (character: string) => void;
}

export const useCharStore = create<CharStore>()((set) => ({
    
    // Store for the search bar at the header
    searchCharacter: '',
    setSearchCharacter: (searchCharacter) => set({ searchCharacter }),

}))