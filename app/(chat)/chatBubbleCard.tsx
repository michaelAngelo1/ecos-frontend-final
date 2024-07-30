import { User } from "@/models/User";
import { Image, Text, View } from "react-native";

interface ChatBubbleChatInterface {
  currUser: User;
  msgUser: User;
  message: string;
}
function SelfChatBubbleCard(prop: ChatBubbleChatInterface) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignSelf: "flex-end",
        gap: 8.0,
      }}
    >
      <Text
        className="bg-green p-2 text-white rounded-md"
        style={{ maxWidth: 200 }}
      >
        {prop.message}
      </Text>
      <Image
        className="w-12 h-12 rounded-full"
        source={{
          uri: `http://ecos.joheee.com:4050/public/user/${prop.msgUser.user_detail.profile_image}`,
        }}
      />
    </View>
  );
}

function OtherChatBubbleCard(prop: ChatBubbleChatInterface) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        alignSelf: "flex-start",
        gap: 8.0,
      }}
    >
      <Text className="bg-white p-2 rounded-md" style={{ maxWidth: 200 }}>
        {prop.message}
      </Text>
      <Image
        className="w-12 h-12 rounded-full"
        source={{
          uri: `http://ecos.joheee.com:4050/public/user/${prop.msgUser.user_detail.profile_image}`,
        }}
      />
    </View>
  );
}
export default function ChatBubbleCard(prop: ChatBubbleChatInterface) {
  if (prop.currUser.user_id === prop.msgUser.user_id) {
    return <SelfChatBubbleCard {...prop} />;
  }
  return <OtherChatBubbleCard {...prop} />;
}
