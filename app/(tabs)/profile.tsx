import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { images } from "../../constants";
import SearchInput from "@/components/search-input";
import Trending from "@/components/trending";
import VideoCard from "@/components/video-card";
import { searchPosts, userPosts } from "@/lib/appwrite";
import { Models } from "react-native-appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import EmptyState from "@/components/empty-state";
import { useGlobalContext } from "@/context/GlobalProvider";

const Profile = () => {
  const { user } = useGlobalContext();
  const [refreshing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);
  const { data, refetch } = useAppwrite(() => userPosts(user?.$id));
  console.log(user);
  useEffect(() => {
    refetch();
  }, [user]);

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
        ListHeaderComponent={() => (
          <View className="w-full my-6 space-y-6">
            <View className="justify-between flex-row mb-6 w-full">
              <View>
                <Text className="font-pmedium text-2xl text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl text-white font-psemibold">
                  Aditya
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
            <View className="w-full flex-1 pt-5">
              <Text className="text-gray-100 text-lg font-pregular">
                Latest Videos
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
export default Profile;
