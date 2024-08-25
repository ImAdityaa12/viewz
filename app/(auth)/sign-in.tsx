import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/form-field";
import CustomButton from "@/components/custom-button";
import { Link, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getCurrentUser, signIn } from "@/lib/appwrite";
// import { signIn } from "@/lib/appwrite";

const SignIn = () => {
  const { setUser, setIsLoggedIn, isLoggedIn } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      router.replace("/home");
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setSubmitting(false);
    }
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
            value={form.email}
            handleChange={(e: string) => setForm({ ...form, email: e })}
            styles="mt-7"
            placeHolder="Email"
          />
          <FormField
            name="Password"
            value={form.password}
            handleChange={(e: string) => setForm({ ...form, password: e })}
            styles="mt-7"
            placeHolder="Password"
          />
          <CustomButton
            title="Login"
            constainerStyles="mt-10"
            handlePress={submit}
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
