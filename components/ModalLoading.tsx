import React from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";

export default function ModalLoading() {
  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <ActivityIndicator size="large" color="green" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 10,
    top: 0,
    left: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
