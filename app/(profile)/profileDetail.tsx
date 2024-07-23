import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../config/Fonts";
import { userDetailInstance } from "../config/axiosConfig";
import { User } from "@/models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { Image } from "expo-image";
import useGetUserData from "@/hooks/useGetUserData";
import useGetToken from "@/hooks/useGetToken";

interface ProfileDetailProps {
  name: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
}

const profileDetail = () => {
  const [form, setForm] = useState<ProfileDetailProps>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const { token } = useGetToken();
  const { user } = useGetUserData(token);

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <Text
        className="text-2xl text-black mt-4 ml-5"
        style={styles.montserratBold}
      >
        Edit your profile
      </Text>
      <ScrollView>
        <View className="flex flex-col justify-center items-center px-4 mt-5">
          <Image
            className="w-40 h-40 rounded-full"
            source={`http://ecos.joheee.com:4050/public/user/${user?.user_detail.profile_image}`}
          />
          <Text className="text-2xl mt-3" style={styles.montserratSemiBold}>
            {user?.user_detail.name}
          </Text>
          <Text className="text-lg" style={styles.montserratMedium}>
            {user?.user_detail.phone}
          </Text>

          <FormField
            title=""
            value={user?.user_detail.name}
            handleChangeText={(e: string) => setForm({ ...form, name: e })}
            otherStyles="mt-3"
            keyboardType="name"
          />
          <FormField
            title=""
            value={user?.user_detail.phone}
            handleChangeText={(e: string) => setForm({ ...form, phone: e })}
            otherStyles="mt-3"
            keyboardType="phone"
          />
          <FormField
            title=""
            value={user?.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-3"
            keyboardType="email"
          />
          <FormField
            title=""
            value={user?.user_detail.street}
            handleChangeText={(e: string) => setForm({ ...form, address: e })}
            otherStyles="mt-3"
            keyboardType="address"
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

export default profileDetail;
