import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../config/Fonts'
import { Image } from 'expo-image';
import images from '@/constants/images';
import icons from '@/constants/icons';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';

const orderDetail = () => {
  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <Text className='text-2xl text-black mt-4 ml-5' style={styles.montserratBold}>Order Details</Text>
      <ScrollView>
        <View className='flex flex-col min-h-[65vh] justify-center items-center px-4'>
        <Text className='text-xl text-black text-center mb-5' style={styles.montserratBold}>This is your trip with our partner</Text>
        <Image
            className="w-48 h-48 rounded-full mb-4"
            source={images.driver_dummy} // Replace with actual driver image
          />
          <View className='flex-row gap-1 items-center justify-center'>
            <Text className="text-xl font-semibold text-black" style={styles.montserratSemiBold}>Pak Budi Santoso</Text>
            <Image className='w-6 h-6' source={icons.verified_icon}/>
          </View>
          <Text className="text-base text-black" style={styles.montserratRegular}>Jl. MH Thamrin No. 10, Jakarta Pusat</Text>

          <View className='flex flex-col items-center'>
            <View className='flex-row gap-1 mt-2'>
              {/* <Image className='w-6 h-6' source={icons.people_green}/> */}
              <Text className="text-base text-black" style={styles.montserratRegular}>This trip has a capacity of</Text>
              <Text className="text-base text-black" style={styles.montserratRegular}>5 persons</Text>
            </View>
            <View className='flex-row gap-1'>
              {/* <Image className='w-6 h-6' source={icons.pickup_time}/> */}
              <Text className="text-base text-black text-center" style={styles.montserratRegular}>Time of pick-up</Text>
              <Text className="text-base text-black" style={styles.montserratRegular}>06.00 - 07.00 WIB</Text>
            </View>
            <View className='flex-row gap-1'>
              {/* <Image className='w-6 h-6' source={icons.phone_icon}/> */}
              <Text className="text-base text-black text-center" style={styles.montserratRegular}>Call driver on</Text>
              <Text className="text-base text-black" style={styles.montserratRegular}>(+62) 818 0313 3100</Text>
            </View>
            <View className='flex-row gap-1'>
              {/* <Image className='w-6 h-6' source={icons.payment_icon}/> */}
              <Text className="text-base text-black text-center" style={styles.montserratRegular}>The monthly fee is</Text>
              <Text className="text-base text-black mt-2" style={styles.montserratRegular}>Rp1.200.000/month</Text>           
            </View>
          </View>

          <CustomButton
            actionText='Cancel order'
            textColor='text-white'
            bgColor='bg-red-900'
            handlePress={() => router.push('/cancelOrder')}
          />
          

          
        </View>
      </ScrollView>
    </SafeAreaView>  
  )
}

export default orderDetail