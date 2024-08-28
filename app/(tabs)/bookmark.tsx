import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/search-input";
import { getLikedPosts } from "@/lib/appwrite";
import VideoCard from "@/components/video-card";
import { useAppwrite } from "@/lib/useAppwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

function Bookmark() {
  const [refreshing, setRefreshing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);
  const { data, refetch } = useAppwrite(() => getLikedPosts(user?.$id ?? ""));
  console.log(data);
  const [filteredData, setFilteredData] = useState<any>([]);
  const { user } = useGlobalContext();
  useEffect(() => {
    setFilteredData(
      data.filter((item: any) =>
        item.likes.some((like: any) => like.$id === user?.$id)
      )
    );
  }, [data]);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <FlatList
        data={filteredData}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item, index }) => (
          <VideoCard
            video={item}
            currentVideo={currentVideo}
            setCurrentVideo={setCurrentVideo}
            index={index}
            videoId={item.$id}
            refetch={refetch}
          />
        )}
        className="px-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => (
          <View className="w-full my-6 space-y-6">
            <View className="justify-between flex-row mb-6 w-full"></View>
            <SearchInput />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default Bookmark;
