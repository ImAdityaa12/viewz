import React, { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "@/components/search-input";
import Trending from "@/components/trending";
import { getAllPosts, getLatestPost } from "@/lib/appwrite";
import VideoCard from "@/components/video-card";
import { useAppwrite } from "@/lib/useAppwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);
  const { user } = useGlobalContext();
  const { data, refetch } = useAppwrite(getAllPosts);
  const { data: latest } = useAppwrite(getLatestPost);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <FlatList
        data={data}
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
            <View className="justify-between flex-row mb-6 w-full">
              <View>
                <Text className="font-pmedium text-2xl text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl text-white font-psemibold">
                  {user?.username}
                </Text>
              </View>
              <View className="my-1.5">
                <Image
                  source={images.logoSmall}
                  className="h-9 w-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular">
                Latest Videos
              </Text>
            </View>
            <Trending posts={latest ?? []} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default Home;
