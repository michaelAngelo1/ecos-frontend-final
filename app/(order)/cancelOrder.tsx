import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../config/Fonts'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

const cancelOrder = () => {
  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <ScrollView>
        <View className='flex flex-col min-h-[100vh] justify-center items-center px-4'>
          <Text className='text-2xl text-green text-center' style={styles.montserratBold}>Order Cancellation Verification</Text>
          <Text className='text-base text-green text-center mb-3' style={styles.montserratMedium}>Wait for admin to approve of your cancellation request. Thank you for choosing ECOS!</Text>
          <CustomButton
            actionText='Back'
            textColor='text-white'
            bgColor='bg-green'
            handlePress={ () => {
              // checkAdminVerification
              router.push('/home');
              
            }
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default cancelOrder