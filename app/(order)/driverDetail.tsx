import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { styles } from '../config/Fonts'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import images from '@/constants/images';
import { Image } from 'expo-image';
import CustomButton from '@/components/CustomButton'

const driverDetail = () => {
  return (
    <SafeAreaView className="bg-white h-full px-4 py-8">
      <Text className="text-2xl text-black" style={styles.montserratBold}>Driver Details</Text>

      <ScrollView>
        <View className="flex flex-col items-center mt-8">
          <Image
            className="w-48 h-48 rounded-full mb-4"
            source={images.driver_dummy} // Replace with actual driver image
          />
          <View className='flex-row gap-1 items-center justify-center'>
            <Text className="text-xl font-semibold text-black" style={styles.montserratSemiBold}>Pak Budi Santoso</Text>
            <Image className='w-6 h-6' source={icons.verified_icon}/>
          </View>
          <Text className="text-base text-black" style={styles.montserratRegular}>Jl. MH Thamrin No. 10, Jakarta Pusat</Text>

          <View className='flex flex-col items-start'>
            <View className='flex-row gap-1 mt-2'>
              <Image className='w-6 h-6' source={icons.people_green}/>
              <Text className="text-base text-black" style={styles.montserratMedium}>5 persons</Text>
            </View>
            <View className='flex-row gap-1'>
              <Image className='w-6 h-6' source={icons.pickup_time}/>
              <Text className="text-base text-black" style={styles.montserratMedium}>06.00 - 07.00 WIB</Text>
            </View>
            <View className='flex-row gap-1'>
              <Image className='w-6 h-6' source={icons.phone_icon}/>
              <Text className="text-base text-black" style={styles.montserratMedium}>(+62) 818 0313 3100</Text>
            </View>
            <View className='flex-row gap-1'>
              <Image className='w-6 h-6' source={icons.payment_icon}/>
              <Text className="text-base text-black mt-2" style={styles.montserratMedium}>Rp1.200.000/month</Text>           
            </View>
          </View>


          <CustomButton
            actionText='Order driver'
            textColor='text-white'
            bgColor='bg-green'
            handlePress={() => router.push('/paymentProcess')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default driverDetail
