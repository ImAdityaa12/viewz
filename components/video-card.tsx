import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Models } from "react-native-appwrite";
import { CirclePlay, Ellipsis, Heart, HeartPulse } from "lucide-react-native";
import { ResizeMode, Video } from "expo-av";
import { addUserIdInLiked } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

interface VideoCardProps {
  video: Models.Document;
  index: number;
  currentVideo: number | null;
  setCurrentVideo: React.Dispatch<React.SetStateAction<number | null>>;
  videoId: string | undefined;
}
const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    likes,
    creator: { Avatar, username },
  },
  index,
  currentVideo,
  setCurrentVideo,

  videoId,
}: VideoCardProps) => {
  const { user } = useGlobalContext();
  const [play, setPlay] = useState(false);
  return (
    <View className="min-h-72 mt- flex-col items-center justify-center mb-6">
      <View className="h-14 flex flex-row w-full items-center py-2">
        <View className="w-[46px] h-[46px] rounded-lg border border-secondary-100 justify-center items-center p-[0.5]">
          <Image
            src={Avatar}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />
        </View>
        <View className="flex flex-col ml-2">
          <Text className="text-white">{title}</Text>
          <Text className="text-gray-100">{username}</Text>
        </View>
        <TouchableOpacity className="ml-auto">
          {likes
            .map((user: Models.Document) => user.$id)
            .includes(user?.$id) ? (
            <HeartPulse
              className="text-red-500"
              onPress={() => {
                if (user !== null) {
                  addUserIdInLiked(user, videoId ?? "", "unlike");
                }
              }}
            />
          ) : (
            <Heart
              className="text-red-500"
              onPress={() => {
                if (user !== null) {
                  addUserIdInLiked(user, videoId ?? "", "like");
                }
              }}
            />
          )}
        </TouchableOpacity>
      </View>
      {play && index === currentVideo ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3 bg-black/10"
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          useNativeControls
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative h-60 w-full mt-2 flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
            setCurrentVideo(index);
          }}
        >
          <Image
            src={thumbnail}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
          <CirclePlay className="absolute w-full h-full z-10 text-white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
