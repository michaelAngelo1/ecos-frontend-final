import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useGetToken from '@/hooks/useGetToken';
import useGetUserData from '@/hooks/useGetUserData';
import { Image } from 'expo-image';
import { styles } from '@/app/config/Fonts';
import { router } from 'expo-router';

interface DriverTripCardProps {
  order_id: string
  // driver info
  driver_image: string
  driver_name: string
  driver_phone: string
  driver_street: string

}

const DriverTripCard = ({order_id, driver_image, driver_name, driver_phone, driver_street} : DriverTripCardProps) => {

  const { token, checkAuthToken } = useGetToken();
  const { role, user, loading } = useGetUserData(token);

  return (
    <TouchableOpacity
      onPress={() => router.push({
        pathname: '/tripDetail',
        params: {
          order_id: order_id,
          driver_image: driver_image,
          driver_name: driver_name,
          driver_phone: driver_phone,
          driver_street: driver_street
        }
      })}
      activeOpacity={0.6}
    >
      <View className='w-fit h-44 mx-4 p-4 bg-[#fff] rounded-2xl border border-gray-200 mb-3'>
        <View className='flex flex-col space-y-3'>
          <View className='flex flex-row space-x-3'>
            <Image
              className="w-16 h-16 rounded-full"
              source={`http://ecos.joheee.com:4050/public/user/${user?.user_detail.profile_image}`}
            />
            
            <View className='flex flex-col'>
              <View className=''>
                <Text className='text-base' style={styles.montserratSemiBold}>Monthly Trip #{order_id.substring(0, 8)}</Text>
              </View>
              <Text className='text-sm' style={styles.montserratRegular}>July 2024</Text>
              <Text className='text-sm' style={styles.montserratRegular}>Passenger(s): 3 persons</Text>
              <Text className='text-sm' style={styles.montserratRegular}>To: Binus School Bekasi</Text>
              <Text className='text-sm' style={styles.montserratRegular}>Scheduled for: 06:00 - 07:00</Text>
              <TouchableOpacity 
                className='bg-green p-1 items-center justify-center'
                activeOpacity={0.7}
                onPress={() => router.push('/testLiveTrack')}
              >
                <Text className='text-white' style={styles.montserratRegular}>Open Maps</Text>
              </TouchableOpacity>
            </View>


          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default DriverTripCard