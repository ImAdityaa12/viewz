import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/form-field";
import CustomButton from "@/components/custom-button";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setItSubmitting] = useState(false);
  const submit = async () => {
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.username === ""
    ) {
      Alert.alert("Error", "Please fill in all fields");
    } else {
      setItSubmitting(true);
      try {
        await createUser(formData.email, formData.password, formData.username);
        router.replace("/home");
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert("Error", error.message);
        } else {
          Alert.alert("Error", "Failed to create account");
        }
      } finally {
        setItSubmitting(false);
      }
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="h-full">
        <View className="w-full justify-center min-h-[85vh] px-4 my-16">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[150px] h-[75px]"
          />
          <Text className="text-2xl text-white font-semibold font-psemibold mt-10">
            Sign Up To Aora
          </Text>
          <FormField
            name="Username"
            value={formData.username}
            handleChange={(e: string) =>
              setFormData({ ...formData, username: e })
            }
            styles="mt-7"
            placeHolder="Username"
          />
          <FormField
            name="Email"
            value={formData.email}
            handleChange={(e: string) => setFormData({ ...formData, email: e })}
            styles="mt-7"
            placeHolder="Email"
          />
          <FormField
            name="Password"
            value={formData.password}
            handleChange={(e: string) =>
              setFormData({ ...formData, password: e })
            }
            styles="mt-7"
            placeHolder="Password"
          />
          <CustomButton
            title="Sign Up"
            constainerStyles="mt-10"
            handlePress={submit}
            isLoading={isSubmitting}
            textStyles="text-primary font-psemibold"
          />
          <View className="mt-5">
            <Text className="text-white font-psemibold text-center">
              Have an account?{" "}
              <Link
                href={"/sign-in"}
                className="font-psemibold text-secondary-200"
              >
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
