import React from "react";
import useGetToken from "@/hooks/useGetToken";
import useGetUserData from "@/hooks/useGetUserData";
import RoomChatWrapper from "../(chat)/roomChatWrapper";
import OverlayLoading from "@/components/OverlayLoading";
import CustomerRoomChat from "../(chat)/customerRoomChat";
import DriverRoomChat from "../(chat)/driverRoomChat";

const Chats = () => {
  const { token } = useGetToken();
  const userData = useGetUserData(token);

  if (userData.loading) {
    return <OverlayLoading />;
  }

  if (userData.role === "CUSTOMER") {
    return <CustomerRoomChat />;
  }
  if (userData.role === "DRIVER") {
    return <DriverRoomChat />;
  }
};

export default Chats;
