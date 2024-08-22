import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { images } from "../../constants";
import SearchInput from "@/components/search-input";
import Trending from "@/components/trending";
import VideoCard from "@/components/video-card";
import { searchPosts } from "@/lib/appwrite";
import { Models } from "react-native-appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import EmptyState from "@/components/empty-state";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [refreshing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);
  const { data, refetch, isLoading } = useAppwrite(() =>
    searchPosts(query as string)
  );

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="h-full w-full bg-primary">
      <FlatList
        data={data}
        keyExtractor={(item: Models.Document) => item.$id}
        ListEmptyComponent={() => (
          <EmptyState title="No results found" subtitle="Try another search" />
        )}
        renderItem={({ item, index }) => (
          <VideoCard
            video={item}
            currentVideo={currentVideo}
            setCurrentVideo={setCurrentVideo}
            index={index}
          />
        )}
        className="px-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refetch} />
        }
      />
    </SafeAreaView>
  );
};
export default Search;
