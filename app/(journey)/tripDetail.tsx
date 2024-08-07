import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../config/Fonts'
import { Image } from 'expo-image';
import images from '@/constants/images'
import { getOrderIdByUserId } from '../config/axiosConfig'
import useGetToken from '@/hooks/useGetToken'
import useGetUserData from '@/hooks/useGetUserData'

const tripDetail = () => {
  const { token } = useGetToken();
  const { user, userId } = useGetUserData(token);

  const { order_id, driver_image, driver_name, driver_phone, driver_street } = useLocalSearchParams();
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
  const fetchPassengers = async () => {
    try {
      const response = await getOrderIdByUserId(token!, userId).get('');
      console.log('response fetch passengers: ', response.data.response.driver_order_header[0].customer_order_header[0]);
      setPassengers(response.data.response.driver_order_header[0].customer_order_header);
    } catch (e) {
      console.log('error fetch passengers: ', e.response);
    }
  }

  useEffect(() => {
    fetchPassengers();
  }, [token, userId])
  
  return (
    <SafeAreaView>
      <View className='flex flex-col'>
        <Image 
          className='w-full h-60' 
          source={images.dummy_maps}
        />
        <View className='mt-3 px-4'>
          <Text className='text-lg text-black' style={styles.montserratSemiBold}>Trip #{order_id!.toString().substring(0, 8)}</Text>
          <Text className=' text-base text-black' style={styles.montserratMedium}>July 2024</Text>
          <Text className=' text-base text-black' style={styles.montserratMedium}>Scheduled for 06:00 - 07:00</Text>
          <Text className='text-base text-black' style={styles.montserratMedium}>To: Binus School Bekasi</Text>
        </View>
        <View className='mt-3 px-4'>
          <Text className='text-lg text-black' style={styles.montserratSemiBold}>Driver</Text>
        </View>
        <View className='flex flex-col mt-3 px-4'>
          <View className='relative w-full h-24 border-1 border-black'>
            <View className='w-20 h-20  rounded-full'>
              <Image
                className="w-full h-full rounded-full"
                source={`http://ecos.joheee.com:4050/public/user/${user?.user_detail.profile_image}`}
              />
            </View>
            <Text className='absolute top-0 left-24 text-base text-black' style={styles.montserratSemiBold}>{driver_name!.toString()}</Text>
            <Text className='absolute top-5 left-24 text-base text-black' style={styles.montserratRegular}>{driver_phone!.toString()}</Text>
            <Text className='absolute top-10 left-24 text-base text-black' style={styles.montserratRegular}>{driver_street!.toString()}</Text>
          </View>
        </View>
        <View className='px-4'>
          <Text className='text-lg text-black' style={styles.montserratSemiBold}>User (s)</Text>
        </View>
        <View className='flex flex-col mt-3 px-4 mb-7'>
          <View className='w-full h-24 border-1 border-black px-4'>
            {
              passengers.length > 0 &&
                passengers.map((passenger) => (
                  <View key={passenger.customer_order_id}>
                    <Text style={styles.montserratMedium}>{passenger.user.user_detail.name}</Text>
                    <Text style={styles.montserratRegular}>{passenger.user.user_detail.street}</Text>
                  </View>
                ))
            }
          </View>
        </View>
        <View className='px-4 mt-14'>
          <CustomButton
            actionText='Back'
            bgColor='bg-green'
            textColor='text-white'
            handlePress={() => router.push('/home')}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default tripDetail