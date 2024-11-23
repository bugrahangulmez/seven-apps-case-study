import { create } from "zustand";

interface CharacterState {
  selectedCharacters: Character[];
  setSelectedCharacters: (characters: Character[]) => void;
  loadMoreCharacters: (characters: Character[]) => void;
}

const useCharacterStore = create<CharacterState>()((set) => ({
  selectedCharacters: [],
  setSelectedCharacters: (characters: Character[]) =>
    set({ selectedCharacters: characters }),
  loadMoreCharacters: (characters: Character[]) =>
    set((state) => ({
      selectedCharacters: [...state.selectedCharacters, ...characters],
    })),
}));

export default useCharacterStore;
