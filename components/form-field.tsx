import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";

interface FormFieldProps {
  name: string;
  styles: string;
  value: string;
  handleChange: (text: string) => void;
  placeHolder: string;
}
const FormField = ({
  name,
  value,
  styles,
  handleChange,
  placeHolder,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2  ${styles}`}>
      <Text className="text-2xl text-gray-200">{name}</Text>
      <View className="w-full h-16 bg-black-100 rounded-xl border-2 border-primary flex-row items-center focus:border-1 focus:border-gray-400">
        <TextInput
          value={value}
          onChangeText={handleChange}
          placeholder={placeHolder}
          placeholderTextColor="#7b7b8b"
          className="text-xl text-white text-start w-full h-full px-4 flex-1 focus:border-yellow-200"
          secureTextEntry={name === "Password" && showPassword ? true : false}
        />
        {name === "Password" && (
          <TouchableOpacity className="h-16 w-16 flex items-center justify-center">
            {showPassword ? (
              <EyeOff
                size={20}
                color="#7b7b8b"
                onPress={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Eye
                size={20}
                color="#7b7b8b"
                onPress={() => setShowPassword(!showPassword)}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
