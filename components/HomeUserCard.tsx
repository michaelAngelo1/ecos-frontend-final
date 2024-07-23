import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { styles } from "@/app/config/Fonts";
import { Image } from "expo-image";
import { ModelUserInterface } from "@/app/config/ModelInterface";

interface HomeUserCardInterface {
  user: ModelUserInterface;
  getAllUsers: () => void;
  verifyUser: (e: string) => void;
}
export default function HomeUserCard(prop: HomeUserCardInterface) {
  return (
    <View className="flex-col p-4 w-full bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3">
      <View className="flex-row gap-4 w-70">
        <View className="w-14 h-14 bg-green rounded-full flex items-center justify-center">
          <Image
            className="w-12 h-12 rounded-full"
            source={{
              uri: `http://ecos.joheee.com:4050/public/user/${prop.user.user_detail.profile_image}`,
            }}
          />
        </View>

        <View className="w-60">
          <Text
            className="text-black text-lg"
            style={styles.montserratSemiBold}
          >
            {prop.user.user_detail.name}
          </Text>
          <Text className="text-black text-sm" style={styles.montserratRegular}>
            {prop.user.email}
          </Text>
        </View>
      </View>

      <View className="flex-col items-end">
        {prop.user.user_detail.is_admin_approved ? (
          <TouchableOpacity
            className="mt-4 bg-green-50 w-[104px] rounded-[20px] p-2"
            activeOpacity={0.7}
            disabled={true}
          >
            <Text
              className="text-white text-sm text-center"
              style={styles.montserratBold}
            >
              Verified
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="mt-4 bg-green w-[104px] rounded-[20px] p-2"
            activeOpacity={0.7}
            onPress={() => {
              prop.verifyUser(prop.user.user_id);
              prop.getAllUsers();
            }}
          >
            <Text
              className="text-white text-sm text-center"
              style={styles.montserratMedium}
            >
              Verify
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
