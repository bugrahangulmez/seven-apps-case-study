import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useCharacterStore from "../zustand/character-store";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

interface SelectedCharacterProps {
  character: Character;
}

const SelectedCharacter: React.FC<SelectedCharacterProps> = ({ character }) => {
  const { setSelectedCharacters, selectedCharacters } = useCharacterStore(
    (state) => state
  );

  return (
    <View className="flex flex-row justify-center items-center gap-2 m-[6px] py-[2px] px-3 rounded-md bg-custom-color-1">
      <Text className=" text-custom-text-color-1 font-bold">
        {character.name.length > 20
          ? `${character.name.slice(0, 20)}...`
          : character.name}
      </Text>
      <TouchableOpacity
        onPress={() => {
          const filteredCharacters = selectedCharacters.filter(
            (c) => c.id !== character.id
          );
          setSelectedCharacters(filteredCharacters);
        }}
      >
        <AntDesign name="closesquare" size={18} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default SelectedCharacter;

const styles = StyleSheet.create({});
