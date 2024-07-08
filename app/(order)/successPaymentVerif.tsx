import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../config/Fonts'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

const successPaymentVerif = () => {
  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <ScrollView>
        <View className='flex flex-col min-h-[100vh] justify-center items-center px-4'>
          <Text className='text-2xl text-green' style={styles.montserratBold}>Payment Approved</Text>
          <Text className='text-base text-green text-center mb-3' style={styles.montserratMedium}>Your payment has been verified. Thank you for choosing ECOS! Let's start the trip</Text>
          <CustomButton
            actionText='Start journey'
            textColor='text-white'
            bgColor='bg-green'
            handlePress={() => router.push('/home')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default successPaymentVerif
