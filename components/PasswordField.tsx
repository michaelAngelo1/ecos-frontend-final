import { TextInput, TouchableOpacity, View, Text } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/app/config/Fonts";

interface PasswordFieldProps {
  title: string;
  value: string;
  handleChangeText: (e: string) => void;
  otherStyles: string;
}

const PasswordField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`w-full space-y-2 ${otherStyles}`}>
      <View className="w-full h-14 bg-white px-4 rounded-lg flex-row items-center">
        <TextInput
          className="flex-1 text-green text-base opacity-80"
          style={styles.montserratRegular}
          value={value}
          placeholder={title}
          placeholderTextColor="#387d4e"
          onChangeText={handleChangeText}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordField;
