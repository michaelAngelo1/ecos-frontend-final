import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../config/Fonts";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  adminApprovalInstance,
  driverOrderHeaderInstance,
  userDetailInstance,
} from "../config/axiosConfig";
import { User } from "@/models/User";
import { Image } from "expo-image";
import icons from "@/constants/icons";
import Maps from "@/components/Maps";
import HomeUserCard from "@/components/HomeUserCard";
import { ModelUserInterface } from "../config/ModelInterface";
import Loading from "@/components/Loading";

const Home = () => {
  // LOCATION SERVICES
  // const [currLocation, setCurrLocation] = useState<Location.LocationObject | null>(null);
  // const [longitude, setLongitude] = useState<number>();
  // const [latitude, setLatitude] = useState<number>();
  // useEffect(() => {
  //   (async () => {

  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       console.log('Permission for location denied');
  //       return;
  //     }
  //     let location = await Location.getCurrentPositionAsync({});
  //     console.log('Users current location: ', location);
  //     setCurrLocation(location);
  //     setLongitude(location.coords.longitude);
  //     setLatitude(location.coords.latitude);
  //     console.log('longitude disini: ', location.coords.longitude);
  //     console.log('latitude disini: ', location.coords.latitude);
  //   })();
  // }, []);

  // const getGeocodedAddress = async () => {
  //   try {
  //     console.log('LATITUDE: ', latitude);
  //     console.log('LONGITUDE: ', longitude);
  //     const response = await reverseGeocodeInstance(latitude!, longitude!).get('',);
  //     console.log('geocoded address response: ', response);
  //   } catch (e) {
  //     console.log('error reverse geocoding: ', e);
  //   }
  // }
  // END LOCATION SERVICES

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

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const getUserData = async () => {
    try {
      let userToken = await getToken();
      const response = await userDetailInstance(userToken!).get("");
      setRole(response.data.response.role);
      setEmail(response.data.response.email);
      setUserId(response.data.response.user_detail.user_id);
      console.log("USER DATA: ", response.data.response.user_detail.user_id);
      const user = new User(
        response.data.response.email,
        response.data.response.password,
        response.data.response.role,
        response.data.response.user_detail
      );
      setUser(user);
    } catch (e) {
      console.log("error get user data: ", e);
    }
  };

  const [customers, setCustomers] = useState<ModelUserInterface[]>([
    {
      user_id: "",
      email: "",
      password: "",
      role: "",
      user_detail: {
        name: "",
        grade: "",
        street: "",
        phone: "",
        is_admin_approved: false,
        is_email_verified: false,
        is_phone_verified: false,
        profile_image: "",
      },
    },
  ]);

  const [drivers, setDrivers] = useState<ModelUserInterface[]>([
    {
      user_id: "",
      email: "",
      password: "",
      role: "",
      user_detail: {
        name: "",
        grade: "",
        street: "",
        phone: "",
        is_admin_approved: false,
        is_email_verified: false,
        is_phone_verified: false,
        profile_image: "",
      },
    },
  ]);

  const getAllUsers = async () => {
    try {
      console.log("masuk get all user");
      let userToken = await getToken();
      const response = await adminApprovalInstance(userToken!).get("");
      console.log(response.data.response.driver);
      console.log(response.data.response.customer);
      setDrivers(response.data.response.driver);
      setCustomers(response.data.response.customer);
    } catch (e) {
      console.log("error fetch all users", e);
    }
  };

  const verifyUser = async (id: string) => {
    try {
      console.log("verify user");
      let userToken = await getToken();
      const response = await adminApprovalInstance(userToken!)
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

  const [availableDrivers, setAvailableDrivers] = useState([
    {
      order_id: "",
      driver_id: "",
      is_admin_approved: true,
      user: {
        user_id: "",
        email: "",
        role: "",
        user_detail: {
          profile_image: "",
          phone: "",
          name: "",
          street: "",
        },
      },
      admin_time_block: {
        end_date: "",
        start_date: "",
        time_block_id: "",
      },
    },
  ]);
  const fetchAvailableDrivers = async () => {
    try {
      const userToken = await getToken();
      const response = await driverOrderHeaderInstance(userToken!).get("");
      console.log("response available drivers: ", response.data.response);
      setAvailableDrivers(response.data.response);
    } catch (e: any) {
      console.log("error fetch available drivers: ", e.response);
    }
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const getCurrentDate = () => {
    const date = new Date();
    console.log("Date: ", date);
    setCurrentDate(date);
  };

  function convertDateToIso(dateValue: string): Date {
    const formattedDateString = dateValue.replace(/\//g, "-");
    return new Date(formattedDateString);
  }

  useEffect(() => {
    getCurrentDate();
    getUserData();
    getAllUsers();
    fetchAvailableDrivers();

    // getGeocodedAddress();
    // if(role == 'ADMIN') {
    //   console.log('ALL FETCHED USERs', customers);
    //   getAllUsers();
    // }
  }, []);

  // console.log('ORDER WAVE LIST: ', orderWaveList[0]);
  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center">
          <View className="bg-white p-6 rounded-lg shadow-lg items-center">
            <Text
              className="text-green text-center text-lg mb-4"
              style={styles.montserratBold}
            >
              You have arrived to your destination. Mind your belongings and
              thanks for using ECOS!
            </Text>
            <TouchableOpacity
              className="bg-green w-20 py-3 rounded-lg"
              onPress={() => setModalVisible(false)}
            >
              <Text
                className="text-white text-center"
                style={styles.montserratBold}
              >
                End trip
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {role == "CUSTOMER" ? (
        <>
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
            <View className="flex-row gap-2 mb-2 items-center">
              <Image className="w-6 h-6" source={icons.mylocation_icon} />
              <Text className="text-xl" style={styles.montserratBold}>
                {user?.user_detail.street}
              </Text>
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
        </>
      ) : role == "DRIVER" ? (
        <>
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
                Passenger(s): 3 persons
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
                Passenger(s): 3 persons
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
                Your passengers this month
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
        </>
      ) : role == "ADMIN" ? (
        <>
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
                Passengers who need to be verified
              </Text>
              {customers.length > 0 ? (
                customers?.map((item, index) => (
                  <HomeUserCard
                    user={item}
                    getAllUsers={getAllUsers}
                    verifyUser={verifyUser}
                    key={index}
                  />
                ))
              ) : (
                <View className="w-full h-14 justify-center items-center">
                  <Text style={styles.montserratRegular}>
                    No passengers need to be verified
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
                    getAllUsers={getAllUsers}
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
        </>
      ) : (
        <View className="w-full h-full items-center justify-center">
          <ActivityIndicator size="large" color="green" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
