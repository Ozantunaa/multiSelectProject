export interface Character {
    id: number;
    name: string;
    image: string;
    episode: any[];
}
export interface CharacterState {
    searchTerm: string;
    characters: Character[];
    selectedCharacters: Character[];
    setSearchTerm: (term: string) => void;
    setCharacters: (characters: Character[]) => void;
    toggleCharacter: (character: Character) => void;
  }

export interface SelectedCharacterItemProps {
    character: Character;
    onRemove: (character: Character) => void;
}

