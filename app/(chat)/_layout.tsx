import React from "react";
import { Stack } from "expo-router";

const ChatLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="roomChatCard"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="customerRoomChat"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="driverRoomChat"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="roomChatWrapper"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="chatMessageContainer"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="chatMessageWrapper"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default ChatLayout;
