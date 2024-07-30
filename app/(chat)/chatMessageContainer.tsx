import { Text, View } from "react-native";
import RoomChatWrapper from "./roomChatWrapper";

export default function ChatMessageContainer() {
  return (
    <RoomChatWrapper title="chat">
      <View className="py-6 flex flex-col gap-4 w-full">
        <Text className="bg-chat-self p-2 text-white rounded-md w-64" style={{alignSelf:'flex-end'}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda,
          laboriosam eaque laudantium optio aperiam consequatur id inventore rem
          sit in reiciendis minima eos? Explicabo, modi nobis nostrum quo quasi
          neque!
        </Text>
        <Text className="bg-chat-other p-2 rounded-md w-64">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
          vero facere temporibus facilis, labore quod ipsam illo adipisci quae,
          sunt, voluptatibus eos. Impedit minus dolores ducimus animi fugit, sed
          voluptatem.
        </Text>
      </View>
    </RoomChatWrapper>
  );
}
