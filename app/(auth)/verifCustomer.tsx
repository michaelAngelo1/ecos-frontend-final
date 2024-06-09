import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NumberInput from '@/components/NumberInput'
import { styles } from '../config/Fonts'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButton'

const VerifCustomer = () => {

  const [OTP, setOTP] = useState('');

  const handleNumberChange = (text: string) => {
    setOTP(text);
  };

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <ScrollView>
        <View className='flex flex-col min-h-[100vh] justify-center items-center px-4'>
          <Text className='text-4xl text-green' style={styles.montserratRegular}>Almost there</Text>
          <Text className='text-3xl text-black'>Placeholder Asset</Text>
          <Text className='text-base text-green text-center mb-3' style={styles.montserratRegular}>Enter the 4 digit OTP sent to your number</Text>
          
          <NumberInput
            value={OTP}
            onChangeText={handleNumberChange}
          />
          <CustomButton
            actionText="Verify"
            bgColor='bg-green'
            textColor='text-white'
            handlePress={() => router.push('/addProfPic')}
          />

          <View className='justify-center pt-2 flex-col gap-2'>
            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default VerifCustomer