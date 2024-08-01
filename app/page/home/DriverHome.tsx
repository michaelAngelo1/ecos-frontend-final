import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../config/Fonts";
import { router } from "expo-router";
import useGetToken from "@/hooks/useGetToken";
import useGetUserData from "@/hooks/useGetUserData";
import DriverTripCard from "@/components/DriverTripCard";
import { getOrderIdByUserId } from "@/app/config/axiosConfig";
import { useEffect, useState } from "react";

export default function DriverHome() {
  const { token } = useGetToken();
  const { user, userId } = useGetUserData(token);
  const [order, setOrder] = useState([{
    
  }])
  const [orderId, setOrderId] = useState('');
  const [passengers, setPassengers] = useState([{
    customer_order_id: '',
    order_id: '',
    user_id: '',
    is_ongoing: false,
    user: {
      user_id: '',
      email: '',
      user_detail: {
        user_id: '',
        profile_image: '',
        phone: '',
        name: '',
        street: '',
        grade: 0,
        is_admin_approved: false,
      },
      customer_detail: {
        user_id: '',
        binusian_id: '',
        parent_phone: ''
      }
    }
  }]);
  const [driverDetail, setDriverDetail] = useState({
    name: '',
    phone: '',
    profile_image: '',
    street: '',
    user_id: ''
  });
  const fetchOrder = async () => {
    try {
      const response = await getOrderIdByUserId(token!, userId).get('');
      console.log('order id: ', response.data.response.driver_order_header[0].order_id);
      console.log('response order detail: ', response.data.response.user_detail);
      setOrderId(response.data.response.driver_order_header[0].order_id);
      setDriverDetail(response.data.response.user_detail);
      setPassengers(response.data.response.driver_order_header[0].customer_order_header);
    } catch (e) {
      console.log('error fetch orders: ', e.response);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, [token, userId])
  
  console.log('profile image: ', driverDetail.name)

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
      <ScrollView>
        <View className="flex flex-col justify-start items-start px-4">
          <Text className="text-xl ml-2 mb-1" style={styles.montserratSemiBold}>
            Your trip this month
          </Text>
        </View>

        <DriverTripCard 
          order_id={orderId}
          driver_image={driverDetail.profile_image}
          driver_name={driverDetail.name}
          driver_phone={driverDetail.phone}
          driver_street={driverDetail.street}        />

        <View className="flex flex-col justify-start items-start px-4">
          <Text className="text-xl ml-2 mb-1" style={styles.montserratSemiBold}>
            Your daily trip
          </Text>
        </View>
        <View className="w-fit h-44 items-center justify-center">
          <Text className="text-sm" style={styles.montserratRegular}>No ongoing daily trip yet</Text>
        </View>
        {/* <View className="w-fit h-44 bg-[#fff] rounded-2xl border border-gray-200 justify-start items-start mx-4 mb-3">
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
        </View> */}


        
        <View className="flex flex-col justify-start items-start px-4">
          <Text className="text-xl ml-2 mb-1" style={styles.montserratSemiBold}>
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
  );
}
