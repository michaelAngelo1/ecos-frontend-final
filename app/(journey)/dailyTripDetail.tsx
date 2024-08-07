import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image';
import images from '@/constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../config/Fonts';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userDetailInstance } from '../config/axiosConfig';

const dailyTripDetail = () => {
  
  const [role, setRole] = useState();
  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken")
      if (userToken !== null) {
        console.log("User token read: ", userToken);
        return userToken;
      }
    } catch (e) {
      console.log("Error reading JWT", e);
    }
  }

  const getUserData = async () => {
    let userToken = await getToken();
    const response = await userDetailInstance(userToken!).get('', );
    setRole(response.data.response.role);
  }
  

  const handleEmergency = () => {
    console.log('call emergency number 6281803133100')
    Linking.openURL('https://wa.me/+6289620033399');
  }

  const handleStartJourney = () => {
    router.push('/home')
  }

  return (
    <SafeAreaView>
      <View className='flex flex-col'>
        <Image className='w-full h-60' source={images.dummy_maps}/>
        <View className='mt-3 px-4'>
          <Text className='text-lg text-black' style={styles.montserratSemiBold}>Daily Trip #243881D ongoing</Text>
          <Text className=' text-base text-black' style={styles.montserratMedium}>July 12nd, 2024. 06:00 - 07:00</Text>
          <Text className='text-base text-black' style={styles.montserratMedium}>To: Binus School Bekasi</Text>
        </View>
        <View className='mt-3 px-4'>
          <Text className='text-lg text-black' style={styles.montserratSemiBold}>Driver</Text>
        </View>
        <View className='flex flex-col mt-3 px-4'>
          <View className='relative w-full h-24 border-1 border-black'>
            <View className='w-20 h-20 bg-green rounded-full'></View>
            <Text className='absolute top-0 left-24 text-base text-black' style={styles.montserratSemiBold}>Bu Lily Halim</Text>
            <Text className='absolute top-5 left-24 text-base text-black' style={styles.montserratRegular}>(+62) 818 0413 4100</Text>
            <Text className='absolute top-10 left-24 text-base text-black' style={styles.montserratRegular}>Jl. Rungkut Madya 155</Text>
          </View>
        </View>
        <View className='px-4'>
          <Text className='text-lg text-black' style={styles.montserratSemiBold}>User (s)</Text>
        </View>
        <View className='flex flex-col mt-3 px-4 mb-7'>
          <View className='w-full h-24 border-1 border-black px-4'>
            <View>
              <Text style={styles.montserratMedium}>1. Maximiliano Utomo Quok</Text>
              <Text style={styles.montserratRegular}>Jl. Kendangsari 1 No. 5</Text>
            </View>
            <View>
              <Text style={styles.montserratMedium}>2. Aditya David Wirawan</Text>
              <Text style={styles.montserratRegular}>Jl. Mulyosari 2 No. 3</Text>
            </View>
            <View>
              <Text style={styles.montserratMedium}>3. Mike Angelo</Text>
              <Text style={styles.montserratRegular}>Jl. Galaxy Bumi Permai V No. 5</Text>
            </View>
          </View>
        </View>

        <View className='mt-3 px-4'>
          <Text className='text-lg text-black' style={styles.montserratSemiBold}>User's Cancelation</Text>
        </View>
        <View className='flex flex-col mt-3 px-4'>
          <View className='w-full h-8 border-1 border-black px-4 items-center'>
            <Text style={styles.montserratRegular}>None for today</Text>
          </View>
        </View>
        {/* <View className='mx-4'>
          <CustomButton
            actionText='End Journey'
            bgColor='bg-green'
            textColor='text-white'
            handlePress={handleStartJourney}
          />

        </View> */}
        <View className='w-full px-4'>
          <CustomButton
            actionText='Emergency Contact Admin'
            bgColor='bg-red-900'
            textColor='text-white'
            handlePress={handleEmergency}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default dailyTripDetail