import React from "react";
import { Tabs } from "expo-router";
import { Bookmark, Home, Plus, User } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#161622",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ size, focused }) => {
              return (
                <Home
                  size={size}
                  color={focused ? Colors.light.icon : Colors.dark.icon}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ size, focused }) => {
              return (
                <Plus
                  size={size}
                  color={focused ? Colors.light.icon : Colors.dark.icon}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ size, focused }) => {
              return (
                <User
                  size={size}
                  color={focused ? Colors.light.icon : Colors.dark.icon}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ size, focused }) => {
              return (
                <Bookmark
                  size={size}
                  color={focused ? Colors.light.icon : Colors.dark.icon}
                />
              );
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
