import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import useCharacterStore from "../zustand/character-store";
import { Image } from "expo-image";
import { AntDesign, Feather } from "@expo/vector-icons";

interface ResultCharacterItemProps {
  character: Character;
  searchQuery: string;
}

const ResultCharacterItem: React.FC<ResultCharacterItemProps> = ({
  character,
  searchQuery,
}) => {
  const selectedCharacters = useCharacterStore(
    (state) => state.selectedCharacters
  );

  return (
    <TouchableOpacity
      onPress={() => {
        if (selectedCharacters.some((c) => c.id === character.id)) {
          useCharacterStore.setState((state) => ({
            selectedCharacters: state.selectedCharacters.filter(
              (c) => c.id !== character.id
            ),
          }));
        } else {
          useCharacterStore.setState((state) => ({
            selectedCharacters: [...state.selectedCharacters, character],
          }));
        }
      }}
      className="rounded m-1 p-3 flex-row justify-between items-center"
    >
      <View className="flex-row items-center gap-4">
        <View style={{ marginLeft: 10 }} className="">
          {selectedCharacters.some((c) => c.id === character.id) ? (
            <AntDesign name="checksquare" size={24} color="green" />
          ) : (
            <Feather name="square" size={24} color="black" />
          )}
        </View>
        <Image
          style={{ width: 35, height: 35, borderRadius: 4 }}
          source={{ uri: character.image }}
        />
        <View>
          <Text className="text-black">
            {character.name
              .split(new RegExp(`(${searchQuery})`, "gi"))
              .map((part, index) =>
                part.toLowerCase() === searchQuery.toLowerCase() ? (
                  <Text key={index} className="font-bold">
                    {part}
                  </Text>
                ) : (
                  <Text key={index}>{part}</Text>
                )
              )}
          </Text>
          <Text className="text-black">{`${character.episode.length} episodes`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ResultCharacterItem;

const styles = StyleSheet.create({});
