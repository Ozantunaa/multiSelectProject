import { View, Text, TouchableOpacity } from "react-native";
import { SelectedCharacterItemProps } from "../types";

const SelectedCharacterItem = ({
  character,
  onRemove,
}: SelectedCharacterItemProps) => (
  <View className="flex-row items-center bg-[#e2e8f0] rounded-lg p-2 mr-2 mb-2">
    <Text className="text-xs text-[#475569] font-[500]">{character.name}</Text>
    <TouchableOpacity
      onPress={() => onRemove(character)}
      className="bg-[#94a3b8] rounded w-4 h-4 ml-1 items-center justify-center"
    >
      <Text className="text-xs text-white">X</Text>
    </TouchableOpacity>
  </View>
);

export default SelectedCharacterItem;