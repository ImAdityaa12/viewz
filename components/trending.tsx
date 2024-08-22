import { FlatList, Image, TouchableOpacity, ViewToken } from "react-native";
import React, { useState } from "react";
import EmptyState from "./empty-state";
import { Models } from "react-native-appwrite";
import * as Animatable from "react-native-animatable";
import { CirclePlay } from "lucide-react-native";
import { ResizeMode, Video } from "expo-av";
interface TrendingProps {
  posts: Models.Document[];
}
const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};
const TrendingItem = ({
  item,
  activeItem,
  currentVideo,
  setCurrentVideo,
  index,
}: {
  item: Models.Document;
  activeItem: Models.Document;
  currentVideo: number;
  setCurrentVideo: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      // @ts-ignore
      animation={item.$id === activeItem.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play && index === currentVideo ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-xl mt-3 bg-black/10"
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
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
            setCurrentVideo(index);
          }}
        >
          <Image
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 shadow-lg shadow-black/40 overflow-hidden"
          />
          <CirclePlay className="absolute z-10 text-white" size={50} />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[1]);
  const [currentVideo, setCurrentVideo] = useState(0);
  const viewItemChange = (viewableItems: ViewToken<Models.Document>[]) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item, index }) => (
        <TrendingItem
          activeItem={activeItem}
          item={item}
          currentVideo={currentVideo}
          setCurrentVideo={setCurrentVideo}
          index={index}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={
        <EmptyState
          title="No trending videos"
          subtitle="Add your first video"
        />
      }
      onViewableItemsChanged={({ viewableItems }) => {
        viewItemChange(viewableItems);
      }}
      viewabilityConfig={{
        viewAreaCoveragePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};
export default Trending;
