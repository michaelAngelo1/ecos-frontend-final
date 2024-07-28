import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useGetToken from '@/hooks/useGetToken';
import useGetUserData from '@/hooks/useGetUserData';
import { Image } from 'expo-image';

const DriverTripCard = () => {

  const { token, checkAuthToken } = useGetToken();
  const { role, user, loading } = useGetUserData(token);

  return (
    <View className='w-fit h-44 mx-4 p-4 bg-[#fff] rounded-2xl border border-gray-200 mb-3'>
      
      <Image
        className="absolute left-0 bottom-5 w-20 h-20 rounded-full"
        source={`http://ecos.joheee.com:4050/public/user/${user?.user_detail.profile_image}`}
      />
    </View>
  )
}

export default DriverTripCard