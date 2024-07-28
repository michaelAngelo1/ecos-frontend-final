import { styles } from "@/app/config/Fonts";
import useGetOrderWave from "@/hooks/useGetOrderWave";
import useGetToken from "@/hooks/useGetToken";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CustomerOrders() {
  const [orderCategory, setOrderCategory] = useState("History");
  let orderCategories: string[] = ["History", "Ongoing"];

  class OrderHistory {
    driverName: string;
    date: string;
    payment: string;
    isOngoing: boolean;

    constructor(
      driverName: string,
      date: string,
      payment: string,
      isOngoing: boolean
    ) {
      this.driverName = driverName;
      this.date = date;
      this.payment = payment;
      this.isOngoing = isOngoing;
    }
  }

  let order2 = new OrderHistory(
    "Pak Haryanto",
    "May 2024",
    "Rp 1.400.000",
    false
  );
  let order3 = new OrderHistory(
    "Pak Setyono",
    "June 2024",
    "Rp 1.000.000",
    false
  );
  let order4 = new OrderHistory(
    "Bu Lily Halim",
    "July 2024",
    "Rp 1.200.000",
    true
  );

  let orders: OrderHistory[] = [order2, order3];

  const handleCurrentOrder = () => {
    console.log("to current order page");
    router.push("/dailyTripDetail");
  };

  const handleHistoryOrder = () => {
    console.log("to order history page");
  };

  return (
    <>
      <Text
        className="text-2xl text-black mt-4 ml-5"
        style={styles.montserratBold}
      >
        Orders
      </Text>
      <View className="flex-row gap-2 ml-2 mt-4">
        {orderCategories.map((category) => (
          <Pressable
            key={category}
            className="w-[110px] h-9 bg-white justify-center items-center rounded-full"
            onPress={() => {
              setOrderCategory(category);
              console.log(category);
            }}
          >
            <Text
              className={`text-base ${
                orderCategory === category ? "opacity-100" : "opacity-40"
              }`}
              style={styles.montserratSemiBold}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>
      <ScrollView>
        <View className="flex flex-col justify-start items-start px-4">
          {orders
            .filter((e) => {
              return orderCategory == "Ongoing" ? e.isOngoing : !e.isOngoing;
            })
            .map((orderHistory) => (
              <View
                key={orderHistory.driverName}
                className="relative mt-5 w-full h-32 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm"
              >
                <View className="absolute top-4 left-4 w-14 h-14 bg-green border border-green rounded-full"></View>
                <Text
                  className="absolute top-0 left-[70px] text-black text-lg p-4"
                  style={styles.montserratSemiBold}
                >
                  {orderHistory.driverName}
                </Text>

                <Text
                  className="absolute top-5 right-3 text-black text-base"
                  style={styles.montserratRegular}
                >
                  {orderHistory.payment}
                </Text>
                {orderHistory.isOngoing ? (
                  <Text
                    className="absolute top-10 left-[88px] text-black text-sm"
                    style={styles.montserratRegular}
                  >
                    Trip ongoing
                  </Text>
                ) : (
                  <Text
                    className="absolute top-10 left-[88px] text-black text-sm"
                    style={styles.montserratRegular}
                  >
                    Trip finished
                  </Text>
                )}
                <Text
                  className="absolute top-14 left-[88px] text-black text-sm"
                  style={styles.montserratRegular}
                >
                  {orderHistory.date}
                </Text>
                {orderHistory.isOngoing ? (
                  <TouchableOpacity
                    className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
                    activeOpacity={0.7}
                    onPress={handleCurrentOrder}
                  >
                    <Text
                      className="text-white text-sm text-center"
                      style={styles.montserratBold}
                    >
                      Track
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
                    activeOpacity={0.7}
                    onPress={handleHistoryOrder}
                  >
                    <Text
                      className="text-white text-sm text-center"
                      style={styles.montserratBold}
                    >
                      Rejoin
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
        </View>
      </ScrollView>
    </>
  );
}
