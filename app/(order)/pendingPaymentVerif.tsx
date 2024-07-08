import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../config/Fonts'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import Snackbar from '@/components/Snackbar'

const pendingPaymentVerif = () => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const checkPaymentVerification = () => {
    setIsPaid(!isPaid);
    setSnackbarVisible(true);
  }

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <ScrollView>
        <View className='flex flex-col min-h-[100vh] justify-center items-center px-4'>
          <Text className='text-2xl text-green' style={styles.montserratBold}>Pending Approval</Text>
          <Text className='text-base text-green text-center mb-3' style={styles.montserratMedium}>Your payment will be verified in 2x24 hours (working days). Thank you for choosing ECOS!</Text>
          <CustomButton
            actionText='Check payment verification'
            textColor='text-white'
            bgColor='bg-green'
            handlePress={checkPaymentVerification}
          />
          {
            isPaid ? 
            <CustomButton
              actionText='Next up'
              textColor='text-green'
              bgColor='bg-white'
              handlePress={() => router.push('/successPaymentVerif')}
            />
            :
            <></>
            
          }
          { snackbarVisible && 
            <Snackbar
              message="Payment verified. Let's proceed!" // Update message if needed
              setVisible={setSnackbarVisible} // Pass the function to update visibility
              duration={3000}
              bgColor='bg-blue'
            />
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default pendingPaymentVerif