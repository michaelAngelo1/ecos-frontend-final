import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import images from '@/constants/images'
import { styles } from '../config/Fonts'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

const vehicleInfo = () => {
  const [vehicleModel, setVehicleModel] = useState('Toyota Voxy');
  const [seatCapacity, setSeatCapacity] = useState('3 passengers');
  const [numberPlate, setNumberPlate] = useState('L 1234 AB');

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <Text className='text-2xl text-black mt-4 ml-5' style={styles.montserratBold}>Vehicle Information</Text>
        <ScrollView>
          <View className='flex flex-col justify-center items-center px-4 mt-5'>
            <Image className='w-40 h-40 rounded-full' source={images.vehicle_dummy}/>
            <Text className='text-2xl mt-3' style={styles.montserratSemiBold}>Toyota Voxy</Text>
            {/* <Text className='text-lg' style={styles.montserratMedium}>{user?.user_detail.phone}</Text> */}

            <FormField
              title=''
              value={vehicleModel}
              handleChangeText={setVehicleModel}
              otherStyles='mt-3'
              keyboardType='name'
            />
            <FormField
              title=''
              value={seatCapacity}
              handleChangeText={seatCapacity}
              otherStyles='mt-3'
              keyboardType='phone'
            />
            <FormField
              title=''
              value={numberPlate}
              handleChangeText={setNumberPlate}
              otherStyles='mt-3'
              keyboardType='email'
            />
           
            <CustomButton
              actionText='Back'
              textColor='text-white'
              bgColor='bg-green'
              handlePress={() => {
                router.push('(tabs)/profile')
              }}
            />
            

            
          
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default vehicleInfo