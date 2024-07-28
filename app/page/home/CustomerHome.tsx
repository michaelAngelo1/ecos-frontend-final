import { styles } from "@/app/config/Fonts";
import Maps from "@/components/Maps";
import icons from "@/constants/icons";
import useGetAvailableDrivers from "@/hooks/useGetAvailableDrivers";
import useGetToken from "@/hooks/useGetToken";
import useGetUserData from "@/hooks/useGetUserData";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CustomerHome() {
  const [modalVisible, setModalVisible] = useState(false);
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

  const { precise_address, usePrecise } = useLocalSearchParams();
  useEffect(() => {
    getCurrentDate();
    // if(role == 'ADMIN') {
    //   console.log('ALL FETCHED USERs', customers);
    //   getAllUsers();
    // }
  }, []);

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
  );
}
