import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./custom-button";
import { router } from "expo-router";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}
const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center w-[91vw]">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-xl text-gray-100 text-center">
        {title}
      </Text>
      <Text className="text-xl text-white font-psemibold text-center">
        {subtitle}
      </Text>
      <View className="w-full h-10"></View>
      <CustomButton
        title="Create Video"
        constainerStyles="min-w-full mt-5"
        handlePress={() => {
          router.push("/create");
        }}
        textStyles="text-primary"
      />
    </View>
  );
};

export default EmptyState;
