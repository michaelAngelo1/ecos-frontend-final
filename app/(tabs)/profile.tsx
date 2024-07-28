import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../config/Fonts";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import icons from "@/constants/icons";
import { Image } from "expo-image";
import useGetToken from "@/hooks/useGetToken";
import useGetUserData from "@/hooks/useGetUserData";
import OverlayLoading from "@/components/OverlayLoading";

const Profile = () => {
  const { token, checkAuthToken } = useGetToken();
  const { role, user, loading } = useGetUserData(token);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("userToken");
    checkAuthToken();
  };

  if (loading) return <OverlayLoading />;

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <Text
        className="text-2xl text-black mt-4 ml-5"
        style={styles.montserratBold}
      >
        Profile
      </Text>
      <ScrollView>
        <View className="flex flex-col justify-start items-start px-4 mt-5">
          <View className="relative w-full h-24">
            <Image
              className="absolute left-0 bottom-5 w-20 h-20 rounded-full"
              source={`http://ecos.joheee.com:4050/public/user/${user?.user_detail.profile_image}`}
            />
            {/* <View className='absolute left-0 bottom-5 w-20 h-20 rounded-full bg-green'></View> */}
            <Text
              className="absolute top-0 left-24 text-xl"
              style={styles.montserratSemiBold}
            >
              {user?.user_detail.name}
            </Text>
            <Text
              className="absolute top-7 left-24 text-base"
              style={styles.montserratRegular}
            >
              {user?.user_detail.phone}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-white w-full h-12 rounded-[8px] p-2 justify-center"
            activeOpacity={0.7}
            onPress={() => router.push("/profileDetail")}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row gap-1">
                <Image className="w-6 h-6" source={icons.profile_filled} />
                <Text
                  className="text-black text-sm text-start"
                  style={styles.montserratSemiBold}
                >
                  Personal Details
                </Text>
              </View>
              <Image
                className="w-8 h-8 opacity-70"
                source={icons.arrow_right}
              />
            </View>
          </TouchableOpacity>
          {role == "DRIVER" ? (
            <TouchableOpacity
              className="bg-white w-full h-12 rounded-[8px] mt-3 p-2 justify-center"
              activeOpacity={0.7}
              onPress={() => router.push("(profile)/vehicleInfo")}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row gap-1">
                  <Image className="w-6 h-6" source={icons.vehicle_info} />
                  <Text
                    className="text-black text-sm text-start"
                    style={styles.montserratSemiBold}
                  >
                    Vehicle Information
                  </Text>
                </View>
                <Image
                  className="w-8 h-8 opacity-70"
                  source={icons.arrow_right}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity
            className="bg-white w-full h-12 rounded-[8px] mt-3 p-2 justify-center"
            activeOpacity={0.7}
            onPress={() => router.push("(auth)/changePassword")}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row gap-1">
                <Image className="w-6 h-6" source={icons.lock_icon} />
                <Text
                  className="text-black text-sm text-start"
                  style={styles.montserratSemiBold}
                >
                  Change password
                </Text>
              </View>
              <Image
                className="w-8 h-8 opacity-70"
                source={icons.arrow_right}
              />
            </View>
          </TouchableOpacity>

          <CustomButton
            actionText="Sign out"
            textColor="text-white"
            bgColor="bg-green"
            handlePress={handleSignOut}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
