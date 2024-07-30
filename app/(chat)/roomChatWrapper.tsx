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
      <ScrollView>
        <View className="flex flex-col min-h-[100vh] justify-start items-start px-4">
          {prop.children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
