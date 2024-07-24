import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { startTransition, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../config/Fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  adminTimeBlockInstance,
  driverOrderHeaderByIdInstance,
  driverOrderHeaderInstance,
  userDetailInstance,
} from "../config/axiosConfig";
import { router } from "expo-router";
import DatePicker from "react-native-modern-datepicker";
import CustomButton from "@/components/CustomButton";
import { parse } from "date-fns";
import Snackbar from "@/components/Snackbar";
import CustomModal from "@/components/CustomModal";
import DriverRegisCard from "@/components/DriverRegisCard";
import useGetAllDriverRequests from "@/hooks/useGetAllDriverRequests";
import useGetToken from "@/hooks/useGetToken";

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

function convertDateToIso(dateValue: string): Date {
  const formattedDateString = dateValue.replace(/\//g, "-");
  return new Date(formattedDateString);
}

const Orders = () => {
  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken !== null) {
        console.log("User token read: ", userToken);
        return userToken;
      }
    } catch (e) {
      console.log("Error reading JWT", e);
    }
  };

  // const [email, setEmail] = useState('');
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const getUserData = async () => {
    try {
      let userToken = await getToken();
      const response = await userDetailInstance(userToken!).get("");
      setRole(response.data.response.role);
      console.log(
        "USER DATA RESPONSE: ",
        response.data.response.user_detail.user_id
      );
      setUserId(response.data.response.user_detail.user_id);
      // setEmail(response.data.response.email);
      console.log("response", response.data.response.role);
    } catch (e) {
      console.log("error get user data: ", e);
    }
  };

  const [orderCategory, setOrderCategory] = useState("History");
  let orderCategories: string[] = ["History", "Ongoing"];

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

  let orders: OrderHistory[] = [order2, order3, order4];

  const handleCurrentOrder = () => {
    console.log("to current order page");
    router.push("/dailyTripDetail");
  };

  const handleHistoryOrder = () => {
    console.log("to order history page");
  };

  // ORDER WAVE IN A SPECIFIC DATE PERIOD
  // const [form, setForm] = useState({
  //   startDate: Date,
  //   endDate: Date,
  // });

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startDateVisible, setStartDateVisible] = useState(false);
  const [endDateVisible, setEndDateVisible] = useState(false);
  const [startConfirmButton, setStartConfirmButton] = useState(false);
  const [endConfirmButton, setEndConfirmButton] = useState(false);

  const [successOrderwave, setSuccessOrderwave] = useState<boolean>();
  const [snackbarFailed, setSnackbarFailed] = useState(false);

  const handleSubmitOrderWaveDate = async () => {
    const start_date: Date = convertDateToIso(startDate);
    const end_date: Date = convertDateToIso(endDate);

    console.log(start_date, end_date);

    try {
      const userToken = await getToken();
      const response = await adminTimeBlockInstance(userToken!).post("", {
        start_date,
        end_date,
      });
      console.log("response submit date: ", response.data.response);
      console.log("successfully created order wave");

      setSuccessOrderwave(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      setSuccessOrderwave(false);
    } catch (e: any) {
      console.log("error submiting order wave date", e.response);
      setSnackbarFailed(true);
    }
  };

  // DRIVER ORDER WAVE REGISTRATION
  const [currentDate, setCurrentDate] = useState(new Date());
  const getCurrentDate = () => {
    const date = new Date();
    console.log("Date: ", date);
    setCurrentDate(date);
  };

  const [orderWaveList, setOrderWaveList] = useState([
    {
      time_block_id: "",
      start_date: "",
      end_date: "",
      driver_order_header: [],
      user: {
        user_id: "",
        email: "",
        password: "",
        role: "",
        created_at: false,
      },
    },
  ]);

  const [hasRegistered, setHasRegistered] = useState(false);
  const fetchOrderWave = async () => {
    try {
      let userToken = await getToken();
      const response = await adminTimeBlockInstance(userToken!).get("");
      console.log("order wave available: ", response.data.response);
      setOrderWaveList(response.data.response);
    } catch (e) {
      console.log("error fetch order wave: ", e.response);
    }
  };

  const handlePartnerRegisAsDriver = async (
    timeBlockId: string,
    driverId: string
  ) => {
    try {
      let userToken = await getToken();
      const response = await driverOrderHeaderInstance(userToken!).post("", {
        driver_id: driverId,
        time_block_id: timeBlockId,
      });
      console.log("response partner regis driver: ", response.data.response);
      setModalVisible(false);
      
      setHasRegistered(true);
    
    } catch (e) {
      console.log("error partner regis driver: ", e.response);
    }
  };

  // ADMIN APPROVE DRIVER REGISTRATION

  const { token } = useGetToken();
  const { driverRegistrationList, refetch } = useGetAllDriverRequests(token)
  const handleAdminApproveDriverRegistration = async (
    orderId: string,
    driverId: string,
    timeBlockId: string,
    isAdminApproved: boolean
  ) => {
    try {
      let userToken = await getToken();
      const response = await driverOrderHeaderByIdInstance(
        userToken!,
        orderId
      ).patch("", {
        driver_id: driverId,
        time_block_id: timeBlockId,
        is_admin_approved: isAdminApproved,
      });
      console.log("admin approve driver registration: ", response.data);
    } catch (e) {
      console.log("error approve driver registration: ", e.response);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserData();
    fetchOrderWave();
    
  }, []);

  useEffect(() => {
    if (orderWaveList) {
      setLoading(false);
    }
  }, [orderWaveList]);

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      {role == "CUSTOMER" ? (
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
                  return orderCategory == "Ongoing"
                    ? e.isOngoing
                    : !e.isOngoing;
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
      ) : role == "DRIVER" ? (
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
                    const orderWaveEndDate: Date = convertDateToIso(
                      orderWave.end_date
                    );
                    if (currentDate < orderWaveEndDate) {
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
                            onPress={() =>
                              setModalVisible(true)
                            }
                          >
                          <Text
                            className="text-white text-sm text-center"
                            style={styles.montserratBold}
                          >
                            Register
                          </Text>
                          </TouchableOpacity>
                          {
                            modalVisible &&
                              <CustomModal
                                isVisible={true}
                                message='Are you sure you want to register as driver to this order wave?'
                                onPress={ () => handlePartnerRegisAsDriver(orderWave.time_block_id, userId)}
                                onCancelPress={() => setModalVisible(false)}
                              />
                          }
                        </View>
                      );
                    }
                  })
                )}
              </View>
            </ScrollView>
            <View className="flex flex-col justify-start items-start px-4">
              <Text
                className="text-xl ml-2 mb-1"
                style={styles.montserratSemiBold}
              >
                Your users this month
              </Text>
              <Text
                className="text-base ml-2 mb-1"
                style={styles.montserratMedium}
              >
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
              <Text
                className="text-base ml-2 mb-1"
                style={styles.montserratMedium}
              >
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
      ) : role == "ADMIN" ? (
        <>
          <View className="flex-row gap-1 mt-4 ml-5 mb-4">
            <Text className="text-2xl text-black" style={styles.montserratBold}>
              Orders
            </Text>
          </View>
          <ScrollView>
            <View className="flex-col gap-1 px-4">
              <Text className="text-base" style={styles.montserratBold}>
                Set order wave
              </Text>
              <Text className="mb-3" style={styles.montserratMedium}>
                Set an order wave period where ECOS partners can register as
                drivers.
              </Text>
              <Text style={styles.montserratMedium}>
                Set start order wave date
              </Text>
              <TextInput
                className="w-full h-14 bg-white px-3"
                style={styles.montserratMedium}
                placeholder="Select Date"
                editable={true}
                value={startDate.toString()}
                onPress={() => setStartDateVisible(true)}
                showSoftInputOnFocus={false}
              />
              {startDateVisible && (
                <Modal
                  animationType="fade"
                  visible={startDateVisible}
                  onRequestClose={() => setStartDateVisible(!startDateVisible)}
                >
                  <View className="flex flex-col justify-center items-center w-full min-h-[100vh] px-4 bg-white">
                    <DatePicker
                      onSelectedChange={(dateValue: string) => {
                        setStartDate(dateValue);
                        setStartConfirmButton(true);
                      }}
                    />
                    {startConfirmButton && (
                      <CustomButton
                        actionText="Confirm start date"
                        textColor="text-white"
                        bgColor="bg-green"
                        handlePress={() => {
                          setStartDateVisible(false);
                          setStartConfirmButton(false);
                        }}
                      />
                    )}
                  </View>
                </Modal>
              )}

              <Text style={styles.montserratMedium}>
                Set end order wave date
              </Text>
              <TextInput
                className="w-full h-14 bg-white px-3"
                style={styles.montserratMedium}
                placeholder="Select Date"
                editable={true}
                value={endDate.toString()}
                onPress={() => setEndDateVisible(true)}
                showSoftInputOnFocus={false}
              />
              {endDateVisible && (
                <Modal
                  animationType="fade"
                  visible={endDateVisible}
                  onRequestClose={() => setEndDateVisible(!endDateVisible)}
                >
                  <View className="flex flex-col justify-center items-center w-full min-h-[100vh] px-4 bg-white">
                    <DatePicker
                      onSelectedChange={(dateValue: string) => {
                        setEndDate(dateValue);
                        setEndConfirmButton(true);
                      }}
                    />
                    {endConfirmButton && (
                      <CustomButton
                        actionText="Confirm end date"
                        textColor="text-white"
                        bgColor="bg-green"
                        handlePress={() => {
                          setEndDateVisible(false);
                          setEndConfirmButton(false);
                        }}
                      />
                    )}
                  </View>
                </Modal>
              )}
              <CustomButton
                actionText="Set order wave period"
                bgColor="bg-green"
                textColor="text-white"
                handlePress={() => {
                  handleSubmitOrderWaveDate();
                }}
              />

              <Text className="text-base pt-3" style={styles.montserratBold}>
                Driver Registration Requests
              </Text>
              <Text className="text-sm" style={styles.montserratMedium}>
                Approve or disapprove ECOS partners registration as drivers.
              </Text>
              <ScrollView className="min-h-[200px] overflow-auto">
                {driverRegistrationList.map((driverRegistration, index) => {
                  return (
                    <DriverRegisCard
                      driver={driverRegistration}
                      refetch={refetch}
                      handleAdminApproveDriverRegistration={() => handleAdminApproveDriverRegistration(driverRegistration.order_id, driverRegistration.driver_id, driverRegistration.admin_time_block.time_block_id, driverRegistration.is_admin_approved)}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </ScrollView>
          {
            successOrderwave &&
            <Snackbar
              message="Successfully created order wave" // Update message if needed
              setVisible={() => true} // Pass the function to update visibility
              duration={3000}
              bgColor='bg-blue'
            />
          }
          {
            snackbarFailed && 
            <Snackbar
              message="Failed creating order wave." // Update message if needed
              setVisible={() => true} // Pass the function to update visibility
              duration={3000}
              bgColor='bg-red-900'
            />
          }
        </>
      ) : (
        <View className="w-full h-full items-center justify-center">
          <ActivityIndicator size="large" color="green" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Orders;
