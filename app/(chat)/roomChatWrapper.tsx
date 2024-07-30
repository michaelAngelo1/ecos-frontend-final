import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../config/Fonts";

interface RoomChatWrapperInterface {
  children: React.ReactNode;
  title: string;
}
export default function RoomChatWrapper(prop: RoomChatWrapperInterface) {
  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <Text
        className="text-2xl text-black mt-4 ml-5"
        style={styles.montserratBold}
      >
        {prop.title }
      </Text>
      <ScrollView className="w-full">
        <View className="flex flex-col min-h-[100vh] w-full justify-start items-center px-4">
          {prop.children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
