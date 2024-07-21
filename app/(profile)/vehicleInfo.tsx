import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import images from "@/constants/images";
import { styles } from "../config/Fonts";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { driverDetailInstance } from "../config/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserInterface {
  user_id: string;
  email: string;
  role: string;
  driver_detail: DriverDetailInterface;
  created_at: string;
}

interface DriverDetailInterface {
  payment_id: string;
  vehicle_image: string;
  vehicle_category: string;
  vehicle_model: string;
  vehicle_capacity: number;
  vehicle_number_plate: string;
  updated_at: string;
}

const vehicleInfo = () => {
  const [vehicle_model, setVehicleModel] = useState<string>("");
  const [vehicle_capacity, setSeatCapacity] = useState<string>("");
  const [vehicle_number_plate, setNumberPlate] = useState<string>("");
  const [data, setData] = useState<UserInterface | null>(null);

  useEffect(() => {
    getDriverDetail();
  }, []);

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

  async function getDriverDetail() {
    const token = await getToken();
    const driverDetail = await driverDetailInstance(token!!).get("");
    console.log(driverDetail.data.response);
    setData(driverDetail.data.response);
    const driverData = driverDetail.data.response.driver_detail;
    setData(driverDetail.data.response);
    setVehicleModel(driverData.vehicle_model);
    setSeatCapacity(driverData.vehicle_capacity.toString());
    setNumberPlate(driverData.vehicle_number_plate);
  }

  async function handleUpdate() {
    try {
      const token = await getToken();
      const driverDetail = await driverDetailInstance(token!!).patch("", {
        vehicle_model: vehicle_model,
        vehicle_capacity: parseInt(vehicle_capacity),
        vehicle_number_plate: vehicle_number_plate,
      });
      console.log(driverDetail.data);
    } catch (e) {
      console.log(e.response);
    }
  }

  if (!data) {
    return <View></View>;
  }

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <Text
        className="text-2xl text-black mt-4 ml-5"
        style={styles.montserratBold}
      >
        Vehicle Information
      </Text>
      <ScrollView>
        <View className="flex flex-col justify-center items-center px-4 mt-5">
          <Image
            className="w-40 h-40 rounded-full"
            // source={`http://ecos.joheee/com:4050/public/vehicle/${data.driver_detail.vehicle_image}`}
            source={`http://ecos.joheee.com:4050/public/user/dummy.png`}
          />
          <Text className="text-2xl mt-3" style={styles.montserratSemiBold}>
            Toyota Voxy
          </Text>
          {/* <Text className='text-lg' style={styles.montserratMedium}>{user?.user_detail.phone}</Text> */}

          <FormField
            title="Vehicle Model"
            value={vehicle_model}
            handleChangeText={setVehicleModel}
            otherStyles="mt-3"
            keyboardType="default"
          />
          <FormField
            title="Vehicle Capacity"
            value={vehicle_capacity}
            handleChangeText={setSeatCapacity}
            otherStyles="mt-3"
            keyboardType="numeric"
          />
          <FormField
            title="Vehicle Number Plate"
            value={vehicle_number_plate}
            handleChangeText={setNumberPlate}
            otherStyles="mt-3"
            keyboardType="default"
          />

          <CustomButton
            actionText="Update"
            textColor="text-white"
            bgColor="bg-green"
            handlePress={handleUpdate}
          />

          <CustomButton
            actionText="Back"
            textColor="text-white"
            bgColor="bg-green"
            handlePress={() => {
              router.push("(tabs)/profile");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default vehicleInfo;
