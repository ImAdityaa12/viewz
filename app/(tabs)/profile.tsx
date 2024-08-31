import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import VideoCard from "@/components/video-card";
import { signOut, userPosts } from "@/lib/appwrite";
import { Models } from "react-native-appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import EmptyState from "@/components/empty-state";
import { useGlobalContext } from "@/context/GlobalProvider";
import { LogOut } from "lucide-react-native";

const Profile = () => {
  const { user, setIsLoggedIn } = useGlobalContext();
  const [refreshing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);
  const { data, refetch } = useAppwrite(() => userPosts(user?.$id));
  useEffect(() => {
    refetch();
  }, [user]);
  const signOutAPP = async () => {
    await signOut();
    setIsLoggedIn(false);
    router.push("/sign-in");
    ToastAndroid.show("Signed out successfully", ToastAndroid.SHORT);
    router.dismissAll();
  };
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
            videoId={item.$id}
            refetch={refetch}
          />
        )}
        className="px-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refetch} />
        }
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity className="w-full" onPress={signOutAPP}>
              <LogOut className="text-red-500 ml-auto" />
            </TouchableOpacity>
            <View className="w-full items-center  justify-center">
              <View className="h-16 w-16 border-2 border-yellow-400 rounded-full items-center justify-center">
                <Image
                  source={{ uri: user?.Avatar }}
                  className="w-[90%] h-[90%] rounded-full"
                />
              </View>
              <Text className="text-white font-pmedium mt-2">
                {user?.username}
              </Text>
              <View className="w-full justify-center items-center">
                <View className="w-[40%] flex flex-row justify-between">
                  <View className="items-center mt-2 justify-center">
                    <Text className="text-white text-xl font-pmedium">
                      {data?.length}
                    </Text>
                    <Text className="text-white text-sm font-pmedium">
                      Posts
                    </Text>
                  </View>
                  <View className="items-center mt-2 justify-center">
                    <Text className="text-white text-xl font-pmedium">
                      1.5k
                    </Text>
                    <Text className="text-white text-sm font-pmedium">
                      Followers
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
export default Profile;
