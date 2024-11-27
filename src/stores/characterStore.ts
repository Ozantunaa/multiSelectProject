import { create } from "zustand";
import { CharacterState } from "../types";

export const useCharacterStore = create<CharacterState>((set) => ({
  searchTerm: "",
  characters: [],
  selectedCharacters: [],
  setSearchTerm: (term) => set({ searchTerm: term }),
  setCharacters: (characters) => set({ characters }),
  toggleCharacter: (character) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.includes(character)
        ? state.selectedCharacters.filter((c) => c.id !== character.id)
        : [...state.selectedCharacters, character],
    })),
}));
