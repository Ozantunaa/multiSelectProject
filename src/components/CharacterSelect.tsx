import React from "react";
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useCharacters } from "../services/characterService";
import { useCharacterStore } from "../stores/characterStore";
import SelectedCharacterItem from "./SelectedCharacterItem";
import CharacterListItem from "./ CharacterListItem";
import { Character } from "../types";

const CharacterSelect = () => {
  const { searchTerm, selectedCharacters, setSearchTerm, toggleCharacter } =
    useCharacterStore();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCharacters(searchTerm);

  const allCharacters = data?.pages.flatMap((page) => page.results) ?? [];

  const updatedCharacters = allCharacters.map(
    (character: Character) =>
      selectedCharacters.find((selected) => selected.id === character.id) ||
      character
  );

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="mx-4 flex-1"
    >
      <SafeAreaView className="flex-1">
        <View className="border border-[#94a3b8] rounded-xl p-3 mb-4">
          <View className="flex-row flex-wrap items-center">
            {selectedCharacters.map((character: Character) => (
              <SelectedCharacterItem
                key={character.id}
                character={character}
                onRemove={toggleCharacter}
              />
            ))}
            <TextInput
              placeholder="Search Character"
              onChangeText={setSearchTerm}
              value={searchTerm}
              className="flex-1 min-w-[120px]"
            />
          </View>
        </View>

        {isLoading && <ActivityIndicator size="large" color="black" />}
        {!isLoading && updatedCharacters.length === 0 && searchTerm && (
          <View className="p-4 mb-4 bg-red-100 rounded-xl">
            <Text className="text-red-500 text-center">No results found.</Text>
          </View>
        )}

        {updatedCharacters.length > 0 && (
          <View className="flex-1 border border-[#94a3b8] rounded-xl">
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={updatedCharacters}
              keyExtractor={(character) => character.id.toString()}
              renderItem={({ item: character, index }) => (
                <CharacterListItem
                  character={character}
                  searchTerm={searchTerm}
                  isSelected={selectedCharacters.includes(character)}
                  onToggle={toggleCharacter}
                  isLastItem={index === updatedCharacters.length - 1}
                />
              )}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() =>
                isFetchingNextPage ? (
                  <ActivityIndicator size="small" color="black" />
                ) : null
              }
            />
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CharacterSelect;
