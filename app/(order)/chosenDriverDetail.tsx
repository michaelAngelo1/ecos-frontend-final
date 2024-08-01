import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeLayout from '../layout/HomeLayout'
import { styles } from '../config/Fonts';
import CustomButton from '@/components/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';
import useGetToken from '@/hooks/useGetToken';
import useGetUserData from '@/hooks/useGetUserData';
import { getOrderIdByUserId } from '../config/axiosConfig';
import { Image } from 'expo-image';
import icons from '@/constants/icons';

const chosenDriverDetail = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // add more info
  // order detail: passengers capacity, list of passengers
  // driver detail: driver's timeframe availability for shuttling (e.g 6 - 7 AM and 5 - 6 PM)
  const { driver_profile_image, driver_name, driver_email, driver_phone, driver_street, vehicle_capacity, vehicle_category, vehicle_image, vehicle_model, vehicle_number_plate } = useLocalSearchParams();

  const handleCheckPaymentVerification = async () => {
    try {
      console.log('check payment verif');
    } catch (e) {
      console.log('error check payment verif: ', e.response);
    }
  }
  
  return (
    <HomeLayout modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View className='flex flex-col px-4'>
        <Text className='text-2xl mt-3' style={styles.montserratBold}>Your driver details</Text>
        
      <ScrollView className='w-full h-full my-3'>
        <View className="flex flex-col items-center mt-8">
          <Image
            className="w-48 h-48 rounded-full mb-4"
            source={{
              uri: `http://ecos.joheee.com:4050/public/user/${driver_profile_image}`,
            }} // Replace with actual driver image
          />
          <View className="flex-row gap-1 items-center justify-center">
            <Text
              className="text-xl font-semibold text-black"
              style={styles.montserratSemiBold}
            >
              {driver_name}
            </Text>
            <Image className="w-6 h-6" source={icons.verified_icon} />
          </View>
          <Text
            className="text-base text-black"
            style={styles.montserratRegular}
          >
            {driver_street}
          </Text>

          <View className="flex flex-col items-start">
            <View className="flex-row gap-1 mt-2">
              <Image className="w-6 h-6" source={icons.people_green} />
              <Text
                className="text-base text-black"
                style={styles.montserratMedium}
              >
                {vehicle_capacity} passengers
              </Text>
            </View>
            <View className="flex-row gap-1">
              <Image className="w-6 h-6" source={icons.pickup_time} />
              <Text
                className="text-base text-black"
                style={styles.montserratMedium}
              >
                06.00 - 07.00 WIB
              </Text>
            </View>
            <View className="flex-row gap-1">
              <Image className="w-6 h-6" source={icons.phone_icon} />
              <Text
                className="text-base text-black"
                style={styles.montserratMedium}
              >
                {driver_phone}
              </Text>
            </View>
            <View className="flex-row gap-1">
              <Image className="w-6 h-6" source={icons.payment_icon} />
              <Text
                className="text-base text-black mt-2"
                style={styles.montserratMedium}
              >
                Rp1.200.000/month
              </Text>
            </View>
            <Image
              className="w-48 h-48 rounded-full mb-4 mt-3"
              source={{
                uri: `http://ecos.joheee.com:4050/public/vehicle/${vehicle_image}`,
              }} // Replace with actual driver image
            />
            <Text className="text-base" style={styles.montserratMedium}>{vehicle_model}</Text>
            <Text className="text-base" style={styles.montserratMedium}>{vehicle_category}</Text>
            <Text className="text-base" style={styles.montserratMedium}>{vehicle_number_plate}</Text>
          </View>
        </View>
      </ScrollView>
        
      </View>
    </HomeLayout>
  )
}

export default chosenDriverDetail