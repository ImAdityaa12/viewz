import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ResizeMode, Video } from "expo-av";
import { UploadCloud, X } from "lucide-react-native";
import CustomButton from "@/components/custom-button";
import * as DocumentPicker from "expo-document-picker";
import { createPost } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
type formData = {
  title: string;
  video: DocumentPicker.DocumentPickerAsset;
  thumbnail: DocumentPicker.DocumentPickerAsset;
  prompt: string;
  creator: string | undefined;
};
const Create = () => {
  const { user } = useGlobalContext();
  const [form, setForm] = useState<formData>({
    title: "",
    video: {} as DocumentPicker.DocumentPickerAsset,
    thumbnail: {} as DocumentPicker.DocumentPickerAsset,
    prompt: "",
    creator: user?.$id,
  });
  const [uploading, setUploading] = useState(false);
  const picker = async (pickerType: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        pickerType === "video"
          ? ["video/mp4", "video/gif"]
          : ["image/png", "image/jpg"],
    });
    if (!result.canceled) {
      if (pickerType === "video") {
        setForm({ ...form, video: result.assets[0] });
        ToastAndroid.show("Document Picked", ToastAndroid.SHORT);
      } else {
        setForm({ ...form, thumbnail: result.assets[0] });
        ToastAndroid.show("Document Picked", ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show("Upload Failed", ToastAndroid.SHORT);
    }
  };
  const submit = async () => {
    if (
      form.title === "" ||
      !form.video.uri ||
      !form.thumbnail.uri ||
      form.prompt === ""
    ) {
      let error = "";
      if (form.title === "") {
        error = error + "Title is required\n";
      }
      if (!form.video.uri) {
        error = error + "Video is required\n";
      }
      if (!form.thumbnail.uri) {
        error = error + "Thumbnail is required\n";
      }
      if (form.prompt === "") {
        error = error + "Prompt is required\n";
      }
      ToastAndroid.show(error, ToastAndroid.SHORT);
    } else {
      setUploading(true);
      try {
        ToastAndroid.show("Uploading...", ToastAndroid.SHORT);
        await createPost(form);
      } catch (error) {
        if (error instanceof Error) {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("Upload Failed", ToastAndroid.SHORT);
        }
      } finally {
        setUploading(false);
        setForm({
          title: "",
          video: {} as DocumentPicker.DocumentPickerAsset,
          thumbnail: {} as DocumentPicker.DocumentPickerAsset,
          prompt: "",
          creator: user?.$id,
        });
      }
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 py-6 overflow-auto h-full">
        <Text className="text-2xl font-psemibold text-white">Upload Video</Text>
        <Text className="text-base text-gray-100 font-pmedium mt-7">Title</Text>
        <TextInput
          placeholder="Enter Title"
          placeholderTextColor="#7b7b8b"
          className="text-base text-gray-100 font-pmedium mt-4 w-full h-16 bg-black-100 rounded-2xl px-4 border-2 border-black-200 placeholder:text-gray-100"
          value={form.title}
          onChangeText={(e) => setForm({ ...form, title: e })}
        />
        <Text className="text-base text-gray-100 font-pmedium mt-4">
          Upload Video
        </Text>
        <TouchableOpacity
          activeOpacity={form.video.uri ? 1 : 0.7}
          onPress={() => {
            if (!form.video.uri) {
              picker("video");
            }
          }}
        >
          {form.video.uri ? (
            <View className="relative flex-row">
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
              />
              <TouchableOpacity
                onPress={() =>
                  setForm({
                    ...form,
                    video: {} as DocumentPicker.DocumentPickerAsset,
                  })
                }
              >
                <X
                  size={20}
                  className="text-red-500 absolute top-2 right-2 bg-white rounded-full p-4"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="text-base text-gray-100 font-pmedium mt-4 w-full h-40 bg-black-100 rounded-2xl justify-center items-center px-4">
              <UploadCloud size={40} className="text-gray-100" />
            </View>
          )}
        </TouchableOpacity>
        <View className="mt-4">
          <Text className="text-base text-gray-100 font-pmedium mt-4">
            Upload Thumbnail
          </Text>
          <TouchableOpacity
            activeOpacity={form.thumbnail.uri ? 1 : 0.7}
            onPress={() => {
              if (!form.thumbnail.uri) {
                picker("image");
              }
            }}
          >
            {form.thumbnail.uri ? (
              <View className="relative flex-row">
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  resizeMode="cover"
                  className="w-full h-64 rounded-2xl"
                />
                <X
                  size={20}
                  className="text-red-500 absolute top-2 right-2 bg-white rounded-full p-4"
                  onPress={() =>
                    setForm({
                      ...form,
                      thumbnail: {} as DocumentPicker.DocumentPickerAsset,
                    })
                  }
                />
              </View>
            ) : (
              <View className="text-base text-gray-100 font-pmedium mt-4 w-full h-16 bg-black-100 rounded-2xl justify-center items-center px-4 border-2 border-black-200 flex-row">
                <UploadCloud size={20} className="text-gray-100" />
                <Text className="text-sm text-gray-100 font-pmedium ml-2">
                  Choose A File
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <Text className="text-base text-gray-100 font-pmedium mt-4">
            Prompt
          </Text>
          <TextInput
            placeholder="Enter Prompt"
            placeholderTextColor="#7b7b8b"
            className="text-base text-gray-100 font-pmedium mt-4 w-full h-16 bg-black-100 rounded-2xl px-4 border-2 border-black-200 placeholder:text-gray-100"
            value={form.prompt}
            onChangeText={(e) => setForm({ ...form, prompt: e })}
          />
        </View>
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          constainerStyles="mt-5 mb-10"
          textStyles="text-primary font-psemibold"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Create;
