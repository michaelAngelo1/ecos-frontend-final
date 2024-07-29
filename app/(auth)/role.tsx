import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { styles } from '../config/Fonts'
import CustomButton from '@/components/CustomButton'

const Role = () => {

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <ScrollView>
        <View className='flex flex-col min-h-[100vh] justify-center items-center px-4'>
          <Text className='text-4xl text-green' style={styles.montserratRegular}>Save the future with ECOS</Text>
          {/* <Text className='text-3xl text-black'>Placeholder Asset</Text> */}
          <CustomButton
            actionText="User"
            bgColor='bg-green'
            textColor='text-white'
            handlePress={() => router.push('/signUpCustomer')}
          />
          <CustomButton
            actionText="Partner"
            bgColor='bg-white'
            textColor='text-green' 
            handlePress={() => router.push('/signUpDriver')}
          />

          <View className='justify-center pt-2 flex-row gap-2'>
            <Text className='text-sm text-green' style={styles.montserratRegular}>
              Already have an account?
            </Text>
            <Link href="/signIn" className='text-sm text-green' style={styles.montserratMedium}>Sign in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Role