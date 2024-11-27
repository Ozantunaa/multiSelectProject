import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { CharacterListItemProps } from "../types";

const CharacterListItem = ({
  character,
  searchTerm,
  isSelected,
  onToggle,
  isLastItem,
}: CharacterListItemProps) => {
  const name = character.name;
  const search = searchTerm.toLowerCase();
  const startIndex = name.toLowerCase().indexOf(search);
  const endIndex = startIndex + search.length;

  return (
    <View
      className={`flex-row items-center mt-2 pl-2 ${
        !isLastItem ? "border-b border-[#94a3b8]" : ""
      } pb-2`}
    >
      <TouchableOpacity
        onPress={() => onToggle(character)}
        className={`border rounded w-4 h-4 mr-2 justify-center items-center ${
          isSelected ? "bg-blue-500" : "bg-white"
        }`}
      >
        {isSelected && <Entypo name="check" size={12} color="white" />}
      </TouchableOpacity>
      <Image
        source={{ uri: character.image }}
        className="w-12 h-12 rounded-lg mr-2"
      />
      <View className="flex-1">
        {startIndex !== -1 ? (
          <Text className="text-[#475569] flex-row text-base">
            {name.substring(0, startIndex)}
            <Text className="font-bold">
              {name.substring(startIndex, endIndex)}
            </Text>
            {name.substring(endIndex)}
          </Text>
        ) : (
          <Text className="text-base">{name}</Text>
        )}
        <Text className="text-gray-500 text-sm">
          {character.episode.length} Episodes
        </Text>
      </View>
    </View>
  );
};

export default CharacterListItem;
