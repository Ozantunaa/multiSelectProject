import React from 'react';
import { View, TextInput, FlatList, ActivityIndicator, Text, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useCharacters } from '../services/characterService';
import { useCharacterStore } from '../stores/characterStore';
import SelectedCharacterList from './SelectedCharacterList';
import CharacterListItem from './ CharacterListItem';
import { Character } from '../types';

const CharacterSelect = () => {
    const {
        searchTerm,
        selectedCharacters,
        setSearchTerm,
        toggleCharacter
    } = useCharacterStore();

    const { data: characters = [], isLoading, error } = useCharacters(searchTerm);

    const updatedCharacters = characters.map((character: Character) => {
        const isSelected = selectedCharacters.some(selected => selected.id === character.id);
        return isSelected ? selectedCharacters.find(selected => selected.id === character.id)! : character;
    });

    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='mx-4 flex-1'
        >
            <SafeAreaView className='flex-1'>
            <View className='border border-[#94a3b8] rounded-xl p-3 mb-4'>
                <View className='flex-row flex-wrap items-center'>
                    <SelectedCharacterList
                        characters={selectedCharacters}
                        onRemove={toggleCharacter}
                    />
                    <TextInput
                        placeholder='Search Character'
                        onChangeText={setSearchTerm}
                        value={searchTerm}
                        className='flex-1 min-w-[120px]'
                    />
                </View>
            </View>

            {isLoading && <ActivityIndicator size="large" color="black" />}
            {!isLoading && updatedCharacters.length === 0 && searchTerm && (
                <Text>No results found.</Text>
            )}

            {updatedCharacters.length > 0 && (
                <View className='flex-1 border border-[#94a3b8] rounded-xl'>
                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        data={updatedCharacters}
                        keyExtractor={character => character.id.toString()}
                        renderItem={({ item: character, index }) => (
                            <CharacterListItem
                                character={character}
                                searchTerm={searchTerm}
                                isSelected={selectedCharacters.includes(character)}
                                onToggle={toggleCharacter}
                                isLastItem={index === updatedCharacters.length - 1}
                            />
                        )}
                    />
                </View>
            )}
        </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default CharacterSelect;