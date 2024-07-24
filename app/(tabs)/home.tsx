import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../config/Fonts";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { adminApprovalInstance, reverseGeocodeInstance } from "../config/axiosConfig";
import { Image } from "expo-image";
import icons from "@/constants/icons";
import Maps from "@/components/Maps";
import HomeUserCard from "@/components/HomeUserCard";
import HomeLayout from "../layout/HomeLayout";
import OverlayLoading from "@/components/OverlayLoading";
import useGetToken from "@/hooks/useGetToken";
import useGetUserData from "@/hooks/useGetUserData";
import useGetAllUsers from "@/hooks/useGetAllUsers";
import useGetAvailableDrivers from "@/hooks/useGetAvailableDrivers";

const Home = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const { token } = useGetToken();
  const { role, email, loading, user, userId } = useGetUserData(token);
  const { customers, drivers, refetch } = useGetAllUsers(token);
  const { availableDrivers } = useGetAvailableDrivers(token);
  const [currentDate, setCurrentDate] = useState(new Date());

  const verifyUser = async (id: string) => {
    try {
      console.log("verify user");
      await adminApprovalInstance(token!)
        .post("", {
          id: id,
        })
        .then((res) => {
          console.log("USER EMAIL VERIFIED: ", res.data.response.name);
          console.log("VERIF RESPONSE: ", res.data.response.is_admin_approved);
        });
    } catch (e) {
      console.log("error verify user", e);
    }
  };

  function convertDateToIso(dateValue: string): Date {
    const formattedDateString = dateValue.replace(/\//g, "-");
    return new Date(formattedDateString);
  }

  const getCurrentDate = () => {
    const date = new Date();
    // console.log("Date: ", date);
    setCurrentDate(date);
  };

  const { precise_address, usePrecise } = useLocalSearchParams();
  useEffect(() => {
    getCurrentDate();
    // if(role == 'ADMIN') {
    //   console.log('ALL FETCHED USERs', customers);
    //   getAllUsers();
    // }
  }, []);
  

  if (role === "CUSTOMER") {
    return (
      <HomeLayout modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <View className="flex-row gap-1 mt-4 ml-5 mb-4">
          <Text
            className="text-2xl text-black"
            style={styles.montserratRegular}
          >
            Welcome,{" "}
          </Text>
          <Text className="text-2xl text-black" style={styles.montserratBold}>
            {user?.user_detail.name.split(" ")[0]}
          </Text>
        </View>
        <View className="flex flex-col justify-start items-start px-4">
          <Text
            className="text-black text-sm ml-2"
            style={styles.montserratRegular}
          >
            Your current locations
          </Text>
          <View className="flex-row gap-2 mb-2 items-center p-2">
            <Image className="w-6 h-6" source={icons.mylocation_icon} />
            <TouchableOpacity
              onPress={() => router.push({
                pathname: "/locationDetail",
                params: {
                  customer_address: user?.user_detail.street,
                },
              })}
            >
              {
                usePrecise ?
                  <Text className="text-xl" style={styles.montserratBold}>
                    {precise_address}
                  </Text>
                :
                  <Text className="text-xl" style={styles.montserratBold}>
                    {user?.user_detail.street}
                  </Text>
              }
            </TouchableOpacity>
          </View>
          <View className="w-96 h-52 bg-white rounded-xl">
            <Maps />
          </View>
          <View className="flex-row gap-2 mt-2 mb-2 items-center">
            <Image className="w-6 h-6" source={icons.destination_icon} />
            <Text className="text-xl" style={styles.montserratBold}>
              Binus School Bekasi
            </Text>
          </View>
          <Text
            className="text-base ml-2 mb-1"
            style={styles.montserratSemiBold}
          >
            Available drivers to choose
          </Text>
        </View>
        <ScrollView>
          <View className="flex flex-col justify-start items-start px-4">
            {availableDrivers.map((driver) => {
              const orderWaveEndDate: Date = convertDateToIso(
                driver.admin_time_block.end_date
              );
              if (currentDate < orderWaveEndDate) {
                return (
                  <View
                    key={driver.order_id}
                    className="relative w-full h-32 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mb-3 p-3"
                  >
                    <View className="flex flex-row gap-3">
                      <View className="w-16 h-16 bg-green rounded-full"></View>
                      <View className="flex flex-col">
                        <Text
                          className="text-black text-lg"
                          style={styles.montserratSemiBold}
                        >
                          {driver.user.user_detail.name}
                        </Text>
                        <Text
                          className=" text-black text-sm"
                          style={styles.montserratRegular}
                        >
                          {driver.user.email}
                        </Text>
                        <Text
                          className=" text-black text-sm"
                          style={styles.montserratRegular}
                        >
                          {driver.user.user_detail.phone}
                        </Text>
                        <Text
                          className=" text-black text-sm"
                          style={styles.montserratRegular}
                        >
                          {driver.user.user_detail.street}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
                      activeOpacity={0.7}
                      onPress={() =>
                        router.push({
                          pathname: "/driverDetail",
                          params: {
                            name: driver.user.user_detail.name,
                            email: driver.user.email,
                            phone: driver.user.user_detail.phone,
                            street: driver.user.user_detail.street,
                            orderId: driver.order_id,
                            userId: userId,
                          },
                        })
                      }
                    >
                      {
                        <Text
                          className="text-white text-sm text-center"
                          style={styles.montserratMedium}
                        >
                          Order
                        </Text>
                      }
                    </TouchableOpacity>
                  </View>
                );
              }
            })}

            {/* <View className='relative w-full h-32 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3'>
                <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                <Image className='absolute top-4 left-4 w-14 h-14 rounded-full' source={images.driver_dummy3}/>
                <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Pak Setyono</Text>
                <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 828 0316 2100</Text>

              
                <Image className='absolute top-16 left-[80px] w-6 h-6' source={icons.destination_icon}/>
                <Text className='absolute top-12 left-[90px] text-black text-sm p-4' style={styles.montserratRegular}>3 km away</Text>
                <Image className='absolute top-[85px] left-[80px] w-6 h-6' source={icons.passengers_icon}/>
                <Text className='absolute top-[70px] left-[90px] text-black text-sm p-4' style={styles.montserratRegular}>4 persons</Text>


                <Text className='absolute top-5 right-3 text-black text-base' style={styles.montserratRegular}>Rp 1.100.000</Text>
                <TouchableOpacity 
                  className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
                  activeOpacity={0.7}
                  onPress={() => router.push('/driverDetail')}
                >
                  <Text className="text-white text-sm text-center" style={styles.montserratBold}>Order</Text>
                </TouchableOpacity>
              </View> */}
          </View>
        </ScrollView>
      </HomeLayout>
    );
  } else if (role === "DRIVER") {
    return (
      <HomeLayout modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <View className="flex-row gap-1 mt-4 ml-5 mb-4">
          <Text
            className="text-2xl text-black"
            style={styles.montserratRegular}
          >
            Welcome,{" "}
          </Text>
          <Text className="text-2xl text-black" style={styles.montserratBold}>
            {user?.user_detail.name.split(" ")[0]}
          </Text>
        </View>
        <ScrollView>
          <View className="flex flex-col justify-start items-start px-4">
            <Text
              className="text-xl ml-2 mb-1"
              style={styles.montserratSemiBold}
            >
              Your trip this month
            </Text>
          </View>
          <View className="w-fit h-36 bg-[#fff] rounded-2xl border border-gray-200 justify-start items-start mx-4 mb-3">
            <View className="absolute top-4 left-4 w-14 h-14 bg-green rounded-full"></View>
            <Text
              className="absolute top-0 left-[70px] text-black text-lg p-4"
              style={styles.montserratSemiBold}
            >
              Trip #243881D
            </Text>
            <Text
              className="absolute top-1 left-[274px] text-black text-sm p-4"
              style={styles.montserratMedium}
            >
              July 2024
            </Text>
            <Text
              className="absolute top-7 left-[70px] text-black text-sm p-4"
              style={styles.montserratRegular}
            >
              User (s): 3 persons
            </Text>
            <Text
              className="absolute top-12 left-[70px] text-black text-sm p-4"
              style={styles.montserratRegular}
            >
              To: Binus School Bekasi
            </Text>
            <TouchableOpacity
              className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
              activeOpacity={0.7}
              onPress={() => router.push("/tripDetail")}
            >
              <Text
                className="text-white text-sm text-center"
                style={styles.montserratBold}
              >
                Details
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex flex-col justify-start items-start px-4">
            <Text
              className="text-xl ml-2 mb-1"
              style={styles.montserratSemiBold}
            >
              Your daily trip
            </Text>
          </View>
          <View className="w-fit h-44 bg-[#fff] rounded-2xl border border-gray-200 justify-start items-start mx-4 mb-3">
            <View className="absolute top-4 left-4 w-14 h-14 bg-green rounded-full"></View>
            <Text
              className="absolute top-[2px] left-[70px] text-black text-base p-4"
              style={styles.montserratSemiBold}
            >
              Daily Trip #243881D
            </Text>
            <Text
              className="absolute top-1 left-[264px] text-black text-sm p-4"
              style={styles.montserratMedium}
            >
              12/07/2024
            </Text>
            <Text
              className="absolute top-7 left-[70px] text-black text-sm p-4"
              style={styles.montserratRegular}
            >
              User (s): 3 persons
            </Text>
            <Text
              className="absolute top-12 left-[70px] text-black text-sm p-4"
              style={styles.montserratRegular}
            >
              To: Binus School Bekasi
            </Text>
            <Text
              className="absolute top-[68px] left-[70px] text-black text-sm p-4"
              style={styles.montserratRegular}
            >
              Scheduled for: 06:00 - 07:00
            </Text>
            <Text
              className="absolute bottom-0 left-0 text-black text-sm p-4"
              style={styles.montserratMedium}
            >
              Your trip is ongoing
            </Text>
            <TouchableOpacity
              className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
              activeOpacity={0.7}
              onPress={() => router.push("/dailyTripDetail")}
            >
              <Text
                className="text-white text-sm text-center"
                style={styles.montserratBold}
              >
                Details
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-col justify-start items-start px-4">
            <Text
              className="text-xl ml-2 mb-1"
              style={styles.montserratSemiBold}
            >
              Your users this month
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
              className="text-xl ml-2 mb-1"
              style={styles.montserratSemiBold}
            >
              Choose who to pick up first
            </Text>
            {/* Logic prioritize pick-up:
              1. Pressable component: 'Prioritize Pick-up' triggers Pop-up
              2. Pop-up shows a PRESSABLE list of passengers with its corresponding address: Max Quok - address, Steven Halim - address,  Aditya David - address
              3. Passenger is FIRST pressed -> change bgcolor to blue and add '1' in front of the name
              4. Passenger is SECOND pressed -> change bgcolor to green and add '2' in front of the name
              5. So on and so forth
              6. 'Clear config' and 'Save config' options
              7. 'Clear config' clears all state and returns the bgcolor of all list to white
              8. 'Save config' saves all state and THIS CAN be seen by EACH PASSENGER */}
            <TouchableOpacity
              className="bg-[#fff] border-2 border-green w-full h-12 mt-3 p-2 items-center justify-center"
              activeOpacity={0.7}
              onPress={() => router.replace("/paymentProcess")}
              disabled={true}
            >
              <Text
                className="text-green text-sm text-center"
                style={styles.montserratBold}
              >
                Click to prioritize{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </HomeLayout>
    );
  } else if (role === "ADMIN") {
    return (
      <HomeLayout modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <View className="flex-row gap-1 mt-4 ml-5 mb-4">
          <Text
            className="text-2xl text-black"
            style={styles.montserratRegular}
          >
            Welcome,{" "}
          </Text>
          <Text className="text-2xl text-black" style={styles.montserratBold}>
            {user?.user_detail.name.split(" ")[0]}
          </Text>
        </View>
        <ScrollView>
          <View className="flex flex-col justify-start items-start px-4">
            <Text
              className="text-base ml-2 mb-1"
              style={styles.montserratSemiBold}
            >
              Users who need to be verified
            </Text>
            {customers.length > 0 ? (
              customers?.map((item, index) => (
                <HomeUserCard
                  user={item}
                  refetch={refetch}
                  verifyUser={verifyUser}
                  key={index}
                />
              ))
            ) : (
              <View className="w-full h-14 justify-center items-center">
                <Text style={styles.montserratRegular}>
                  No users need to be verified
                </Text>
              </View>
            )}
            <Text
              className="text-base mt-10 ml-2 mb-1"
              style={styles.montserratSemiBold}
            >
              Partners who need to be verified
            </Text>
            {drivers.length > 0 ? (
              drivers?.map((item, index) => (
                <HomeUserCard
                  user={item}
                  refetch={refetch}
                  verifyUser={verifyUser}
                  key={index}
                />
              ))
            ) : (
              <View className="w-full h-14 justify-center items-center">
                <Text style={styles.montserratRegular}>
                  No partners need to be verified
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </HomeLayout>
    );
  } else {
    return <OverlayLoading />;
  }
};

export default Home;
