import { driverOrderHeaderInstance } from "@/app/config/axiosConfig";
import { styles } from "@/app/config/Fonts";
import CustomModal from "@/components/CustomModal";
import OverlayLoading from "@/components/OverlayLoading";
import useGetOrderWave from "@/hooks/useGetOrderWave";
import useGetToken from "@/hooks/useGetToken";
import useGetUserData from "@/hooks/useGetUserData";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DriverOrders() {
  const [modalVisible, setModalVisible] = useState(false);

  // custom hooks
  const { token } = useGetToken();
  const { userId } = useGetUserData(token);
  const { orderWaveList, loading } = useGetOrderWave(token);

  console.log("USER ID ON CUSTOMER ORDERS: ", userId);

  function convertDateToIso(dateValue: string): Date {
    const formattedDateString = dateValue.replace(/\//g, "-");
    return new Date(formattedDateString);
  }

  // DRIVER ORDER WAVE REGISTRATION
  const [currentDate, setCurrentDate] = useState(new Date());
  const getCurrentDate = () => {
    const date = new Date();
    console.log("Date: ", date);
    setCurrentDate(date);
  };

  const [hasRegistered, setHasRegistered] = useState(false);
  const handlePartnerRegisAsDriver = async (
    timeBlockId: string,
    driverId: string
  ) => {
    try {
      const response = await driverOrderHeaderInstance(token!).post("", {
        driver_id: driverId,
        time_block_id: timeBlockId,
      });
      console.log("response partner regis driver: ", response.data.response);
      setModalVisible(false);

      setHasRegistered(true);
    } catch (e: any) {
      console.log("error partner regis driver: ", e.response);
    }
  };

  console.log("ORDERWAVE LIST: ", orderWaveList);

  if (loading) return <OverlayLoading />;

  return (
    <>
      <View className="flex-row gap-1 mt-4 ml-5 mb-4">
        <Text className="text-2xl text-black" style={styles.montserratBold}>
          Orders
        </Text>
      </View>
      <ScrollView className="w-full h-screen">
        <Text
          className="text-xl ml-2 mb-1 px-4"
          style={styles.montserratSemiBold}
        >
          Register as Driver in this period
        </Text>

        <ScrollView className="min-h-[220px] overflow-auto">
          <View className="flex flex-col px-4">
            {loading ? (
              <ActivityIndicator
                className="mt-3 p-1"
                size="large"
                color="green"
              />
            ) : (
              orderWaveList.map((orderWave) => {
                const orderWaveStartDate: Date = new Date(orderWave.start_date);
                const orderWaveEndDate: Date = new Date(orderWave.end_date);
                console.log(currentDate <= orderWaveEndDate);
                if (currentDate <= orderWaveEndDate) {
                  return (
                    <View
                      key={orderWave.time_block_id}
                      className="relative w-full h-28 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mb-3"
                    >
                      <View className="absolute top-4 left-4 w-14 h-14 bg-green rounded-full"></View>
                      <Text
                        className="absolute top-0 left-[70px] text-black text-lg p-4"
                        style={styles.montserratSemiBold}
                      >
                        {orderWave.start_date.substring(0, 10)}
                      </Text>
                      <Text
                        className="absolute top-0 left-[200px] text-black text-lg p-4"
                        style={styles.montserratSemiBold}
                      >
                        {orderWave.end_date.substring(0, 10)}
                      </Text>
                      <Text
                        className="absolute top-7 left-[70px] text-black text-sm p-4"
                        style={styles.montserratRegular}
                      >
                        {orderWave.time_block_id.substring(0, 8)}
                      </Text>
                      <TouchableOpacity
                        className="absolute bottom-3 right-3 bg-green w-[114px] rounded-[20px] mt-3 p-2"
                        activeOpacity={0.7}
                        onPress={() => setModalVisible(true)}
                      >
                        <Text
                          className="text-white text-sm text-center"
                          style={styles.montserratBold}
                        >
                          Register
                        </Text>
                      </TouchableOpacity>
                      {modalVisible && (
                        <CustomModal
                          isVisible={true}
                          message="Are you sure you want to register as driver to this order wave?"
                          onPress={() =>
                            handlePartnerRegisAsDriver(
                              orderWave.time_block_id,
                              userId
                            )
                          }
                          onCancelPress={() => setModalVisible(false)}
                        />
                      )}
                    </View>
                  );
                }
              })
            )}
          </View>
        </ScrollView>

        <View className="flex flex-col justify-start items-start px-4">
          <Text className="text-xl ml-2 mb-1" style={styles.montserratSemiBold}>
            Your users this month
          </Text>
          <Text className="text-base ml-2 mb-1" style={styles.montserratMedium}>
            July 2024
          </Text>
        </View>

        <ScrollView className="min-h-[365px] overflow-auto">
          <View className="flex flex-col justify-start items-start px-4">
            <View className="relative w-full h-28 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm">
              <View className="absolute top-4 left-4 w-14 h-14 bg-green rounded-full"></View>
              <Text
                className="absolute top-0 left-[70px] text-black text-lg p-4"
                style={styles.montserratSemiBold}
              >
                Max Quok
              </Text>
              <Text
                className="absolute top-7 left-[70px] text-black text-sm p-4"
                style={styles.montserratRegular}
              >
                +62 818 0313 3100
              </Text>
              <Text
                className="absolute top-12 left-[70px] text-black text-sm p-4"
                style={styles.montserratRegular}
              >
                Jl. Kendangsari 1 No. 5
              </Text>
            </View>

            <View className="relative w-full h-28 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3">
              <View className="absolute top-4 left-4 w-14 h-14 bg-green rounded-full"></View>
              <Text
                className="absolute top-0 left-[70px] text-black text-lg p-4"
                style={styles.montserratSemiBold}
              >
                Steven Halim
              </Text>
              <Text
                className="absolute top-7 left-[70px] text-black text-sm p-4"
                style={styles.montserratRegular}
              >
                +62 828 0316 2100
              </Text>
              <Text
                className="absolute top-12 left-[70px] text-black text-sm p-4"
                style={styles.montserratRegular}
              >
                Jl. Mulyosari 2 No. 3
              </Text>
            </View>

            <View className="relative w-full h-28 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3">
              <View className="absolute top-4 left-4 w-14 h-14 bg-green rounded-full"></View>
              <Text
                className="absolute top-0 left-[70px] text-black text-lg p-4"
                style={styles.montserratSemiBold}
              >
                Mike Angelo
              </Text>
              <Text
                className="absolute top-7 left-[70px] text-black text-sm p-4"
                style={styles.montserratRegular}
              >
                +62 828 0316 2100
              </Text>
              <Text
                className="absolute top-12 left-[70px] text-black text-sm p-4"
                style={styles.montserratRegular}
              >
                Jl. Galaxy Bumi Permai V No. 5
              </Text>
            </View>
          </View>
        </ScrollView>
        <View className="flex flex-col justify-start items-start px-4">
          <Text
            className="text-xl ml-2 mb-1 mt-3"
            style={styles.montserratSemiBold}
          >
            Your order request this month
          </Text>
          <Text className="text-base ml-2 mb-1" style={styles.montserratMedium}>
            July 2024
          </Text>
        </View>
        <ScrollView className="min-h-[365px] overflow-auto">
          <View className="flex flex-col justify-center items-center px-4">
            <Text
              className="text-sm text-black"
              style={styles.montserratRegular}
            >
              No order request for this month
            </Text>
          </View>
        </ScrollView>
      </ScrollView>
    </>
  );
}
