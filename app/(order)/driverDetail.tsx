import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { styles } from "../config/Fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image } from "expo-image";
import CustomButton from "@/components/CustomButton";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { customerOrderHeaderInstance } from "../config/axiosConfig";

const driverDetail = () => {
  const { userId, orderId, name, email, phone, street } =
    useLocalSearchParams();

  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken !== null) {
        console.log("User token read: ", userToken);
        return userToken;
      }
    } catch (e) {
      console.log("Error reading JWT", e);
    }
  };

  const handleOrderFromCustomer = async (addNanny: number) => {
    let userToken = await getToken();
    try {
      console.log(
        "order_id: ",
        orderId,
        "user_id: ",
        userId,
        "extraPassenger: ",
        addNanny
      );
      const response = await customerOrderHeaderInstance(userToken!).post("", {
        order_id: orderId,
        user_id: userId,
        extra_passenger: addNanny,
      });
      console.log("response order customer: ", response.data.response.customer_order_id);
      router.replace({
        pathname: "/paymentProcess",
        params: {
          customer_order_id: response.data.response.customer_order_id,
        },
      });
    } catch (e) {
      console.log("error handle order from customer: ", e.response);
    }
  };

  const [isNannyAdded, setIsNannyAdded] = useState(false);

  return (
    <SafeAreaView className="bg-white h-full px-4 py-8">
      <Text className="text-2xl text-black" style={styles.montserratBold}>
        Driver Details
      </Text>

      <ScrollView>
        <View className="flex flex-col items-center mt-8">
          <Image
            className="w-48 h-48 rounded-full mb-4"
            source={images.driver_dummy} // Replace with actual driver image
          />
          <View className="flex-row gap-1 items-center justify-center">
            <Text
              className="text-xl font-semibold text-black"
              style={styles.montserratSemiBold}
            >
              {name}
            </Text>
            <Image className="w-6 h-6" source={icons.verified_icon} />
          </View>
          <Text
            className="text-base text-black"
            style={styles.montserratRegular}
          >
            {street}
          </Text>

          <View className="flex flex-col items-start">
            <View className="flex-row gap-1 mt-2">
              <Image className="w-6 h-6" source={icons.people_green} />
              <Text
                className="text-base text-black"
                style={styles.montserratMedium}
              >
                5 persons
              </Text>
            </View>
            <View className="flex-row gap-1">
              <Image className="w-6 h-6" source={icons.pickup_time} />
              <Text
                className="text-base text-black"
                style={styles.montserratMedium}
              >
                06.00 - 07.00 WIB
              </Text>
            </View>
            <View className="flex-row gap-1">
              <Image className="w-6 h-6" source={icons.phone_icon} />
              <Text
                className="text-base text-black"
                style={styles.montserratMedium}
              >
                {phone}
              </Text>
            </View>
            <View className="flex-row gap-1">
              <Image className="w-6 h-6" source={icons.payment_icon} />
              <Text
                className="text-base text-black mt-2"
                style={styles.montserratMedium}
              >
                Rp1.200.000/month
              </Text>
            </View>
            <View className="flex-row gap-1">
              <Text
                className="text-base text-black mt-2"
                style={styles.montserratMedium}
              >
                Add nanny:{" "}
              </Text>
              <Pressable onPress={() => setIsNannyAdded(!isNannyAdded)}>
                {isNannyAdded ? (
                  <Image className="w-6 h-6" source={icons.verified_icon} />
                ) : (
                  <View className="w-6 h-6 rounded-full border border-1 border-green"></View>
                )}
              </Pressable>
            </View>
          </View>

          <CustomButton
            actionText="Order driver"
            textColor="text-white"
            bgColor="bg-green"
            handlePress={() => handleOrderFromCustomer(isNannyAdded ? 1 : 0)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default driverDetail;
