import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

const index = () => {
  return (
    <View>
      <Text className="text-sm">index</Text>
      <StatusBar style="auto" />
      <Link href="/profile" className="text-blue-500">
        Profile
      </Link>
    </View>
  );
};

export default index;
