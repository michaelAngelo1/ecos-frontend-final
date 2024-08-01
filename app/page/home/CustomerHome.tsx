import { customerOrderHeaderByUserIdInstance, driverOrderHeaderByIdInstance } from "@/app/config/axiosConfig";
import { styles } from "@/app/config/Fonts";
import CustomButton from "@/components/CustomButton";
import Maps from "@/components/Maps";
import icons from "@/constants/icons";
import useGetAvailableDrivers from "@/hooks/useGetAvailableDrivers";
import useGetToken from "@/hooks/useGetToken";
import useGetUserData from "@/hooks/useGetUserData";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Marker } from "react-native-maps";

interface CustomerOrderIdProp {
  customerOrderId: string
}

export default function CustomerHome() {
  const { token } = useGetToken();
  const { user, userId } = useGetUserData(token);
  const { availableDrivers } = useGetAvailableDrivers(token);
  const [currentDate, setCurrentDate] = useState(new Date());

  function convertDateToIso(dateValue: string): Date {
    const formattedDateString = dateValue.replace(/\//g, "-");
    return new Date(formattedDateString);
  }

  const getCurrentDate = () => {
    const date = new Date();
    // console.log("Date: ", date);
    setCurrentDate(date);
  };

  const [driverOrderId, setDriverOrderId] = useState<string>();
  const [hasOrdered, setHasOrdered] = useState<boolean>(false);
  const [chosenDriver, setChosenDriver] = useState({
    driver_id: '',
    order_id: '',
    user: {
      email: '',
      user_detail: {
        name: '',
        phone: '',
        street: '',
        profile_image: '',
      },
      driver_detail: {
        vehicle_capacity: 0,
        vehicle_category: '',
        vehicle_image: '',
        vehicle_model: '',
        vehicle_number_plate: ''
      }
    }
  })
  const fetchChosenDriver = async () => {
    try {
      console.log('masuk fetch chosen driver');
      const response = await customerOrderHeaderByUserIdInstance(token!, userId).get('')
        .then(async (res) => {
          if(res.data.response.customer_order_header.length > 0) {
            console.log('masuk if');

            setHasOrdered(true);
            // console.log('RESPONSE ORDER ID: ', res.data.response.customer_order_header[0].driver_order_header);
            const order_id = res.data.response.customer_order_header[0].driver_order_header.order_id;
            const chosenDriver = await driverOrderHeaderByIdInstance(token!, order_id).get('');
            console.log('CHOSEN DRIVER: ', chosenDriver.data.response);
            setChosenDriver(chosenDriver.data.response);
          } else { 
            console.log('masuk else');
            setHasOrdered(false);
          }
        })
      // console.log('RESPONSE FETCH CHOSEN DRIVER: ', response.data.response.customer_order_header[0].driver_order_header.order_id);
      // console.log('fetched order id: ', response.data.response.driver_order_header);
      // setDriverOrderId(response.data.response.customer_order_header[0].driver_order_header.order_id);
    } catch (e) {
      console.log('error fetch chosen driver: ', e);
    }
  }

  const { precise_address, usePrecise } = useLocalSearchParams();
  useEffect(() => {
    fetchChosenDriver();
    getCurrentDate();
  }, [token, userId]);

  console.log('USER ID ON CUST HOME: ', userId);
  console.log('USER ON USEGETUSERDATA: ', user);
  console.log('AVAILABLE DRIVERS: ', availableDrivers);

  return (
    <>
      <View className="flex-row gap-1 mt-4 ml-5 mb-4">
        <Text className="text-2xl text-black" style={styles.montserratRegular}>
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
            onPress={() =>
              router.push({
                pathname: "/locationDetail",
                params: {
                  customer_address: user?.user_detail.street,
                },
              })
            }
          >
            {usePrecise ? (
              <Text className="text-xl" style={styles.montserratBold}>
                {precise_address}
              </Text>
            ) : (
              <Text className="text-xl" style={styles.montserratBold}>
                {user?.user_detail.street}
              </Text>
            )}
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
        <Text className="text-base ml-2 mb-1" style={styles.montserratSemiBold}>
          Available drivers to choose
        </Text>
      </View>
      <ScrollView>
        <View className="flex flex-col justify-start items-start px-4">
          {
          hasOrdered ?
          <>
            <Text className="text-sm mb-1" style={styles.montserratRegular}>You ordered this driver</Text>
            <View className="w-full h-40 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mb-3 p-3">
              <View className="flex flex-col space-x-2">
                <View className="flex flex-row space-x-3">
                  <View className="w-16 h-16 rounded-full">
                    <Image
                      className="w-full h-full rounded-full"
                      source={{
                        uri: `http://ecos.joheee.com:4050/public/user/${chosenDriver.user.user_detail.profile_image}`,
                      }}
                    />
                  </View>
                  <View className="flex flex-col">
                    <Text className="text-black text-lg" style={styles.montserratBold}>{chosenDriver.user.user_detail.name}</Text>
                    <Text className='text-black text-sm' style={styles.montserratRegular}>{chosenDriver.user.email}</Text>
                    <Text className='text-black text-sm' style={styles.montserratRegular}>{chosenDriver.user.user_detail.phone}</Text>
                    <Text className='text-black text-sm' style={styles.montserratRegular}>{chosenDriver.user.user_detail.street}</Text>
                  </View>
                </View>
                <View className="flex-row space-x-3">
                  <View className="w-1/3"></View>
                  <View className="w-1/3"></View>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    className="px-3 py-2 bg-green rounded-2xl items-center justify-center"
                    onPress={() => router.push({
                      pathname: '/chosenDriverDetail',
                      params: {
                        driver_profile_image: chosenDriver.user.user_detail.profile_image,
                        driver_name: chosenDriver.user.user_detail.name,
                        driver_email: chosenDriver.user.email,
                        driver_phone: chosenDriver.user.user_detail.phone,
                        driver_street: chosenDriver.user.user_detail.street,
                        vehicle_capacity: chosenDriver.user.driver_detail.vehicle_capacity,
                        vehicle_category: chosenDriver.user.driver_detail.vehicle_category,
                        vehicle_image: chosenDriver.user.driver_detail.vehicle_image,
                        vehicle_model: chosenDriver.user.driver_detail.vehicle_model,
                        vehicle_number_plate: chosenDriver.user.driver_detail.vehicle_number_plate
                      }
                    })}
                  >
                    <Text style={styles.montserratSemiBold} className="text-white">Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>

          :
          availableDrivers.length > 0 ?
            availableDrivers.map((driver) => {
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
                      <View className="w-14 h-14 bg-green rounded-full flex items-center justify-center">
                        <Image
                          className="w-12 h-12 rounded-full"
                          source={{
                            uri: `http://ecos.joheee.com:4050/public/user/${driver.user.user_detail.profile_image}`,
                          }}
                        />
                      </View>
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
                            profileImage: driver.user.user_detail.profile_image,
                            name: driver.user.user_detail.name,
                            email: driver.user.email,
                            phone: driver.user.user_detail.phone,
                            street: driver.user.user_detail.street,
                            orderId: driver.order_id,
                            userId: userId,
                            vehicleCapacity: driver.user.driver_detail.vehicle_capacity,
                            vehicleCategory: driver.user.driver_detail.vehicle_category,
                            vehicleImage: driver.user.driver_detail.vehicle_image,
                            vehicleModel: driver.user.driver_detail.vehicle_model,
                            vehicleNumberPlate: driver.user.driver_detail.vehicle_number_plate
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
            })
          :
          <View className="w-full h-11 items-center justify-center">
            <Text className='text-sm' style={styles.montserratRegular}>No drivers yet</Text>
          </View>
          }

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
  );
}
