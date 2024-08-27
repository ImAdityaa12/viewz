import React, { useEffect } from "react";
import { Image, ScrollView, Text, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "@/components/custom-button";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
const index = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className=" items-center h-full w-full pt-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="realtive mt-5">
            <Text className="text-white text-3xl font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary"> Viewz</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute w-[100px] h-[15px] -bottom-3 -right-2"
            />
          </View>
          <Text className="text-gray-100 text-center mt-7 text-sm">
            Where creativity meets innovation: A platform that brings together
            the best of both worlds.
          </Text>
          <CustomButton
            title="Continue With Email"
            textStyles="w-full"
            constainerStyles="mt-auto mb-4 w-[90%]"
            handlePress={() => router.push("/sign-in")}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default index;
