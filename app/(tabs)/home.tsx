import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../config/Fonts'
import DriverCard from '@/components/DriverCard'
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from "jwt-decode";
import Dropdown from '@/components/Dropdown'

const Home = () => {

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

  /* 
    TODO:
    1. Get token stored on AsyncStorage
    2. Get user detail by token
    3. Get ROLE from user detail
    4. If ROLE == 'Passenger', show Passenger Homepage
    5. Else if ROLE == 'Partner', show Partner Homepage
    6. Also fetch the name to show on 'Welcome, {name}'
  */
  
  // dummy state role variable, replace LATER
  let role = 'Partner'; // Partner or Passenger

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      {
        role == 'Passenger' ? 
        <>
          <View className='flex-row gap-1 mt-4 ml-5 mb-4'>
            <Text className='text-2xl text-black' style={styles.montserratRegular}>Welcome, </Text>
            <Text className='text-2xl text-black' style={styles.montserratBold}>Angelita</Text>
          </View>
          <View className='flex flex-col justify-start items-start px-4'>
            <Text className='text-black text-sm ml-2' style={styles.montserratRegular}>Your current locations</Text>
            <View className='flex-row gap-1 mb-2'>
              <Text className='text-xl'>📍</Text>
              <Text className='text-xl' style={styles.montserratBold}>Perum Aries Blok VI No. 7</Text>
            </View>

            <View className='w-96 h-52 bg-white rounded-xl'>

            </View>
            <View className='flex-row gap-1 mt-2 mb-2'>
              <Text className='text-xl'>📍</Text>
              <Text className='text-xl' style={styles.montserratBold}>Binus School Bekasi</Text>
            </View>
            <Text className='text-base ml-2 mb-1' style={styles.montserratSemiBold}>Available drivers to choose</Text>
          </View>
          <ScrollView>
            <View className='flex flex-col justify-start items-start px-4'>


              <View className='relative w-full h-32 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm'>
                <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Pak Wahyudi</Text>
                <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 818 0313 3100</Text>
                <Text className='absolute top-12 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>4 km away</Text>
                <Text className='absolute top-[70px] left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>3 persons</Text>


                <Text className='absolute top-5 right-3 text-black text-base' style={styles.montserratRegular}>Rp 12.000</Text>
                <TouchableOpacity 
                  className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
                  activeOpacity={0.7}
                  onPress={() => router.push('/paymentChoice')}
                >
                  <Text className="text-white text-sm text-center" style={styles.montserratBold}>Order</Text>
                </TouchableOpacity>
              </View>

              <View className='relative w-full h-32 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3'>
                <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Pak Budi</Text>
                <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 828 0316 2100</Text>
                <Text className='absolute top-12 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>2 km away</Text>
                <Text className='absolute top-[70px] left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>3 persons</Text>


                <Text className='absolute top-5 right-3 text-black text-base' style={styles.montserratRegular}>Rp 12.000</Text>
                <TouchableOpacity 
                  className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
                  activeOpacity={0.7}
                  onPress={() => router.push('/paymentChoice')}
                >
                  <Text className="text-white text-sm text-center" style={styles.montserratBold}>Order</Text>
                </TouchableOpacity>
              </View>

              <View className='relative w-full h-32 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3'>
                <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Pak Setyono</Text>
                <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 828 0316 2100</Text>
                <Text className='absolute top-12 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>3 km away</Text>
                <Text className='absolute top-[70px] left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>4 persons</Text>


                <Text className='absolute top-5 right-3 text-black text-base' style={styles.montserratRegular}>Rp 22.000</Text>
                <TouchableOpacity 
                  className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
                  activeOpacity={0.7}
                  onPress={() => router.push('/paymentChoice')}
                >
                  <Text className="text-white text-sm text-center" style={styles.montserratBold}>Order</Text>
                </TouchableOpacity>
              </View>

              
            </View>
          </ScrollView>
        </>
        :
        <>
          <View className='flex-row gap-1 mt-4 ml-5 mb-4'>
            <Text className='text-2xl text-black' style={styles.montserratRegular}>Welcome, </Text>
            <Text className='text-2xl text-black' style={styles.montserratBold}>Sutanto</Text>
          </View>
          <View className='flex flex-col justify-start items-start px-4'>
            <Text className='text-xl ml-2 mb-1' style={styles.montserratSemiBold}>Your passengers this month</Text>
          </View>
          <ScrollView className='max-h-[365px] overflow-auto'>
            <View className='flex flex-col justify-start items-start px-4'>


              <View className='relative w-full h-28 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm'>
                <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Max Quok</Text>
                <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 818 0313 3100</Text>
                <Text className='absolute top-12 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>Jl. Meruya No. 7 Jakarta Barat</Text>
              </View>

              <View className='relative w-full h-28 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3'>
                <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Steven Halim</Text>
                <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 828 0316 2100</Text>
                <Text className='absolute top-12 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>Jl. Meruya No. 7 Jakarta Barat</Text>
              </View>

              <View className='relative w-full h-28 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3'>
                <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Aditya David</Text>
                <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 828 0316 2100</Text>
                <Text className='absolute top-12 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>Jl. Meruya No. 7 Jakarta Barat</Text>
              </View>

              
            </View>
          </ScrollView>
          <View className='flex flex-col justify-start items-start px-4'>
            <Text className='text-xl ml-2 mb-1' style={styles.montserratSemiBold}>Choose who to pick up first</Text>
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
              className="bg-green w-full h-12 mt-3 p-2"
              activeOpacity={0.7}
              onPress={() => router.push('/paymentChoice')}
            >
              <Text className="text-white text-sm text-center" style={styles.montserratBold}>Click to prioritize </Text>
            </TouchableOpacity>
          </View>
        </>
      }
    </SafeAreaView>                                                                                                                                                                             
  )
}

export default Home                                                                                                                                          