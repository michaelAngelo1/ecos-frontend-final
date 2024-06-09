import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { styles } from '../config/Fonts'
import NumberInput from '@/components/NumberInput'

const VerifDriver = () => {

  const [myNumber, setMyNumber] = useState('');

  const handleNumberChange = (text: string) => {
    setMyNumber(text);
    // Do something with the sanitized number (if needed)
  };

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <ScrollView>
        <View className='flex flex-col min-h-[100vh] justify-center items-center px-4'>
          <Text className='text-4xl text-green' style={styles.montserratRegular}>Almost there</Text>
          <Text className='text-3xl text-black'>Placeholder Asset</Text>
          <Text className='text-base text-green text-center mb-3' style={styles.montserratRegular}>Enter the 4 digit OTP sent to your number</Text>
          
          <NumberInput
            value={myNumber}
            onChangeText={handleNumberChange}
          />
          <CustomButton
            actionText="Verify"
            bgColor='bg-green'
            textColor='text-white'
            handlePress={() => router.push('/vehicleInfo')}
          />

          <View className='justify-center pt-2 flex-col gap-2'>
            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default VerifDriver