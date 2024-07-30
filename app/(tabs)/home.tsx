import React, { useState } from "react";
import HomeLayout from "../layout/HomeLayout";
import OverlayLoading from "@/components/OverlayLoading";
import useGetToken from "@/hooks/useGetToken";
import useGetUserData from "@/hooks/useGetUserData";
import AdminHome from "../page/home/AdminHome";
import DriverHome from "../page/home/DriverHome";
import CustomerHome from "../page/home/CustomerHome";
import { useLocalSearchParams } from "expo-router";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { token } = useGetToken();
  const { role } = useGetUserData(token);

  const { customer_order_id, customer_payment_id } = useLocalSearchParams();
  // console.log('cust order id: ', customer_order_id);
  // const customerOrderId = customer_order_id!.toString();

  console.log('CUSTOMER ORDER ID ON HOME: ', customer_order_id);

  if (role === "CUSTOMER") {
    return (
      <HomeLayout modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <CustomerHome/>
      </HomeLayout>
    );
  } else if (role === "DRIVER") {
    return (
      <HomeLayout modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <DriverHome />
      </HomeLayout>
    );
  } else if (role === "ADMIN") {
    return (
      <HomeLayout modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <AdminHome />
      </HomeLayout>
    );
  } else {
    return <OverlayLoading />;
  }
};

export default Home;
