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
    <View className="w-full h-32 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3">
      <View className="relative w-14 h-14 bg-green rounded-full flex items-center justify-center">
        <Image
          className="w-12 h-12 rounded-full"
          source={{
            uri: `http://ecos.joheee.com:4050/public/user/${prop.user.user_detail.profile_image}`,
          }}
        />
      </View>

      <Text
        className="absolute top-0 left-[70px] text-black text-lg p-4 truncate w-full"
        style={styles.montserratSemiBold}
      >
        {prop.user.user_detail.name}
      </Text>
      <Text
        className="absolute top-7 left-[70px] text-black text-sm p-4"
        style={styles.montserratRegular}
      >
        {prop.user.email}
      </Text>
      <TouchableOpacity
        className={`absolute bottom-3 right-3 ${
          prop.user.user_detail.is_admin_approved ? "bg-green-50" : "bg-green"
        } w-[104px] rounded-[20px] mt-3 p-2`}
        activeOpacity={0.7}
        disabled={prop.user.user_detail.is_admin_approved ? true : false}
        onPress={() => {
          prop.verifyUser(prop.user.user_id);
          prop.getAllUsers();
        }}
      >
        {prop.user.user_detail.is_admin_approved ? (
          <Text
            className="text-white text-sm text-center"
            style={styles.montserratBold}
          >
            Verified
          </Text>
        ) : (
          <Text
            className="text-white text-sm text-center"
            style={styles.montserratMedium}
          >
            Verify
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
