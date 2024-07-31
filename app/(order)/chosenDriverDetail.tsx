import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HomeLayout from '../layout/HomeLayout'
import { styles } from '../config/Fonts';
import CustomButton from '@/components/CustomButton';
import { useLocalSearchParams } from 'expo-router';

const chosenDriverDetail = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // add more info
  // order detail: passengers capacity, list of passengers
  // driver detail: driver's timeframe availability for shuttling (e.g 6 - 7 AM and 5 - 6 PM)
  const { driver_name, driver_email, driver_phone, driver_street } = useLocalSearchParams();

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
        
        <View className='w-full bg-white flex flex-col items-center'>
          
          <Text className='text-blue' style={styles.montserratMedium}>Your payment is being processed</Text>
          <CustomButton
            actionText='Check payment verification'
            textColor='text-white'
            bgColor='bg-green'
            handlePress={handleCheckPaymentVerification}
          />
        </View>
        
      </View>
    </HomeLayout>
  )
}

export default chosenDriverDetail