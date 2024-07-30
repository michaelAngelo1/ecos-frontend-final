import { Image, Text, View } from "react-native";
import ChatMessageWrapper from "./chatMessageWrapper";
import ChatBubbleCard from "./chatBubbleCard";
import useGetToken from "@/hooks/useGetToken";
import useGetUserData from "@/hooks/useGetUserData";
import OverlayLoading from "@/components/OverlayLoading";
import FormField from "@/components/FormField";
import { useState } from "react";

export default function ChatMessageContainer() {
  const { token } = useGetToken();
  const { user } = useGetUserData(token);
  const [message, setMessage] = useState<string>("");
  if (!user) return <OverlayLoading />;

  return (
    <ChatMessageWrapper title="chat">
      <View className="py-6 flex flex-col w-full" style={{ gap: 12.0 }}>
        <ChatBubbleCard message="testt" currUser={user} msgUser={user} />
        <ChatBubbleCard message="testt" currUser={user} msgUser={user} />
      </View>
      <FormField
        title="Enter your email"
        value={message}
        handleChangeText={setMessage}
        otherStyles="mt-4"
        keyboardType="email-address"
      />
    </ChatMessageWrapper>
  );
}
