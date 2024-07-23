import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function OverlayLoading() {
  return (
    <View className="w-full h-full items-center justify-center">
      <ActivityIndicator size="large" color="green" />
    </View>
  );
}