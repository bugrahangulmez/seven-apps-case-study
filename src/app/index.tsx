import { useInfiniteQuery } from "@tanstack/react-query";
import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchAllCharactersIncludingQuery } from "../api/functions";
import {
  ResultCharacterItem,
  SelectedCharacter,
  Loading,
  ErrorWithRetry,
  InlineError,
} from "../components";
import { useState, useRef, useEffect } from "react";
import useCharacterStore from "../zustand/character-store";
import { AntDesign } from "@expo/vector-icons";

const DropdownIcon = ({ dropdownOpen }: { dropdownOpen: boolean }) => {
  return dropdownOpen ? (
    <AntDesign name="downcircle" size={24} color="black" />
  ) : (
    <AntDesign name="upcircle" size={24} color="black" />
  );
};

/**
 * This screen is the main screen of the app. It displays a search bar and a list of characters.
 * It uses Zustand for state management and React Query for data fetching
 */
const Index = () => {
  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(true);

  // Zustand store
  const { selectedCharacters } = useCharacterStore((state) => state);

  // Fetching characters
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery<FetchResponse>({
      queryKey: ["characters", searchQuery],
      queryFn: ({ pageParam }) =>
        fetchAllCharactersIncludingQuery(searchQuery, pageParam as number),
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        return lastPage.info.next ? (lastPageParam as number) + 1 : undefined;
      },
      initialPageParam: 1,
    });

  // Merging selected characters with fetched characters
  const selectedCharactersIds = selectedCharacters.map((c) => c.id);
  const results = data
    ? [
        ...selectedCharacters,
        ...data.pages
          .map((val) => val.characters)
          .flat()
          .filter((item) => !selectedCharactersIds.includes(item.id)),
      ]
    : selectedCharacters;

  // ScrollView reference
  const scrollViewRef = useRef<ScrollView>(null);
  const previousSelectedCharactersCount = useRef(selectedCharacters.length);

  // This is necessary to scrool to end when user selects a character. It scrolls to end to show textinput visible
  // But it should NOT scroll to end when user delete charcter from selected characters
  useEffect(() => {
    if (selectedCharacters.length > previousSelectedCharactersCount.current) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
    previousSelectedCharactersCount.current = selectedCharacters.length;
  }, [selectedCharacters]);

  // Render functions
  const handleRenderResults = ({ item }: ListRenderItemInfo<Character>) => (
    <ResultCharacterItem character={item} searchQuery={searchQuery} />
  );
  const handleRenderSelectedCharacters = (character: Character) => {
    return <SelectedCharacter key={character.id} character={character} />;
  };
  const renderSeparator = () => (
    <View className="border-t border-custom-color-2" />
  );
  const renderResulstFooter = () => {
    if (!hasNextPage) {
      return null;
    }
    return (
      <View className="h-20 mt-4 mb-4">
        <TouchableOpacity
          onPress={async () => {
            fetchNextPage();
          }}
          className="p-3 bg-blue-500 rounded-lg m-3"
        >
          <Text className="text-white text-center">Load more</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Event handlers
  const handleSearchQueryChange = (text: string) => {
    setSearchQuery(text);
  };
  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleRetry = () => {
    setSearchQuery("");
  };

  // Error handling
  if (error && selectedCharacters.length === 0)
    return <ErrorWithRetry onPress={handleRetry} />;

  return (
    <View className="flex-1">
      {/* Search bar */}
      <View className="flex-row">
        <ScrollView
          ref={scrollViewRef}
          className="border border-custom-color-2 rounded-md m-3 w-330 h-12"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {/* Selected characters */}
          <View className="flex-row">
            {selectedCharacters.map(handleRenderSelectedCharacters)}
          </View>
          {/* Input */}
          <View>
            <TextInput
              onChangeText={handleSearchQueryChange}
              placeholder="Search for a character"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              value={searchQuery}
              autoFocus={false}
              className="w-[300px] p-3"
            />
          </View>
        </ScrollView>
        {/* Toggle dropdown button */}
        <TouchableOpacity
          onPress={handleToggleDropdown}
          className="justify-center align-middle m-3"
        >
          <DropdownIcon dropdownOpen={dropdownOpen} />
        </TouchableOpacity>
      </View>
      {/* Loading */}
      {isLoading && <Loading />}
      {/* Error */}
      {error && selectedCharacters.length > 0 && <InlineError />}
      {/* Characters list */}
      {dropdownOpen && results.length > 0 && (
        <View className="h-96 border border-black m-2 rounded-lg">
          <FlatList
            data={results}
            renderItem={handleRenderResults}
            ItemSeparatorComponent={renderSeparator}
            ListFooterComponent={renderResulstFooter()}
          />
        </View>
      )}
    </View>
  );
};

export default Index;
