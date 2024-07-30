import useGetToken from "@/hooks/useGetToken";
import useGetUserData from "@/hooks/useGetUserData";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../config/Fonts";
import { router } from "expo-router";

export default function RoomChatCard() {
  const { token } = useGetToken();
  const { user } = useGetUserData(token);

  function handlePress() {
    router.push("(chat)/chatMessageContainer");
  }

  if (user)
    return (
      <TouchableOpacity className="w-full" onPress={handlePress}>
        <View className="flex-col p-4 w-full bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3">
          <View className="flex-row gap-4 w-70">
            <View className="w-14 h-14 bg-green rounded-full flex items-center justify-center">
              <Image
                className="w-12 h-12 rounded-full"
                source={{
                  uri: `http://ecos.joheee.com:4050/public/user/${
                    user!.user_detail.profile_image
                  }`,
                }}
              />
            </View>

            <View className="w-60">
              <Text
                className="text-black text-lg"
                style={styles.montserratSemiBold}
              >
                Chat group name
              </Text>
              <Text
                className="text-black text-sm"
                style={styles.montserratRegular}
              >
                last chat
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
}
