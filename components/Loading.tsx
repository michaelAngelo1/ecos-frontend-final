import { ActivityIndicator } from "react-native";
import React from "react";

interface LoadingInterface {
  color: string;
}
export default function Loading(prop: LoadingInterface) {
  return (
    <ActivityIndicator className="p-1" size="large" color={prop.color} />
  );
}
