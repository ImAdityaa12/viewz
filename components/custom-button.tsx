import { Text, TouchableOpacity } from "react-native";
import React from "react";
interface ButtonProp {
  title: string;
  handlePress?: () => void;
  textStyles?: string;
  isLoading?: boolean;
  constainerStyles?: string;
}
const CustomButton = ({
  title,
  handlePress,
  textStyles,
  isLoading,
  constainerStyles,
}: ButtonProp) => {
  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${
        isLoading ? "opacity-50" : ""
      }  ${constainerStyles}`}
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text
        className={`${textStyles} text-primary font-psemibold text-lg text-center`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
