import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/form-field";
import CustomButton from "@/components/custom-button";
import { Link, router } from "expo-router";
// import { signIn } from "@/lib/appwrite";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setItSubmitting] = useState(false);
  const userSignIn = async () => {
    // if (formData.email === "" || formData.password === "") {
    //   Alert.alert("Error", "Please fill in all fields");
    // } else {
    //   setItSubmitting(true);
    //   try {
    //     const result = await signIn(formData.email, formData.password);
    //     console.log(result);
    router.replace("/home");
    //   } catch (error) {
    //     if (error instanceof Error) {
    //       Alert.alert("Error", error.message);
    //     } else {
    //       Alert.alert("Error", "Failed to sign in");
    //     }
    //   } finally {
    //     setItSubmitting(false);
    //   }
    // }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="h-full">
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-semibold font-psemibold mt-10 ">
            Login To Aora
          </Text>
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
            title="Login"
            constainerStyles="mt-10"
            handlePress={userSignIn}
            isLoading={isSubmitting}
            textStyles="text-primary font-psemibold"
          />
          <View className="mt-5">
            <Text className="text-white font-psemibold text-center">
              Don't have an account?{" "}
              <Link
                href={"/sign-up"}
                className="font-psemibold text-secondary-200"
              >
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
