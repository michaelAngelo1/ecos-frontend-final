import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../config/Fonts";

interface HomeLayoutInterface {
  children: ReactNode;
  modalVisible: boolean;
  setModalVisible: (e: boolean) => void;
}
export default function HomeLayout(prop: HomeLayoutInterface) {
  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <Modal
        animationType="slide"
        transparent={true}
        visible={prop.modalVisible}
        onRequestClose={() => {
          prop.setModalVisible(!prop.modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center">
          <View className="bg-white p-6 rounded-lg shadow-lg items-center">
            <Text
              className="text-green text-center text-lg mb-4"
              style={styles.montserratBold}
            >
              You have arrived to your destination. Mind your belongings and
              thanks for using ECOS!
            </Text>
            <TouchableOpacity
              className="bg-green w-20 py-3 rounded-lg"
              onPress={() => prop.setModalVisible(false)}
            >
              <Text
                className="text-white text-center"
                style={styles.montserratBold}
              >
                End trip
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {prop.children}
    </SafeAreaView>
  );
}
