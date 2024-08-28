import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Search } from "lucide-react-native";
import { router, usePathname } from "expo-router";

const SearchInput = () => {
  const pathName = usePathname();
  const [query, setQuery] = useState<string>("");
  return (
    <View className="w-full h-16 bg-black-100 rounded-xl border-2 border-primary flex-row items-center focus:border-1 focus:border-gray-400">
      <TextInput
        onChangeText={(text) => setQuery(text)}
        value={query}
        placeholder={"Search for a video topic"}
        placeholderTextColor="#7b7b8b"
        className="text-xl text-white text-start flex-1 h-full px-4 focus:border-yellow-200 focus:px-10 placeholder:px-4"
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            Alert.alert("Missing Query", "Please enter a search query");
          }
          if (pathName.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Search className="h-16 w-16 text-white mr-4" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
