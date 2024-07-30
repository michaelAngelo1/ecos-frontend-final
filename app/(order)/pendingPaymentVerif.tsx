import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../config/Fonts'
import CustomButton from '@/components/CustomButton'
import { router, useLocalSearchParams } from 'expo-router'
import Snackbar from '@/components/Snackbar'
import { paymentHeaderByIdInstance } from '../config/axiosConfig'
import useGetToken from '@/hooks/useGetToken'
import ModalLoading from '@/components/ModalLoading'

const pendingPaymentVerif = () => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const { token } = useGetToken();
  const [loading, setLoading] = useState<boolean>(false);

  const { customer_order_id, customer_payment_id } = useLocalSearchParams();
  const customerOrderId = customer_order_id!.toString();
  const customerPaymentId = customer_payment_id!.toString();

  const checkPaymentVerification = async () => {
    setLoading(true);
    try {
      const response = await paymentHeaderByIdInstance(token!, customerPaymentId).get('',);
      if (response.data.response.is_admin_approved) {
        setSnackbarVisible(false);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        router.replace({
          pathname: '/home',
          params: {
            customer_order_id: customerOrderId,
            customer_payment_id: customerPaymentId
          }
        });
        return;
      }
      setSnackbarVisible(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSnackbarVisible(false);
      console.log('response check payment verif: ', response.data.response.is_admin_approved);
    } catch (e) {
      console.log('error check payment verif: ', e.response);
    } finally {
      setLoading(false);
    }
  }

  console.log('CUSTOMER ORDER ID: ', customer_order_id);
  console.log('CUSTOMER PAYMENT ID: ', customer_payment_id);


  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      {loading ? <ModalLoading /> : null}
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
          { snackbarVisible && 
            <Snackbar
              message="Payment Verification Process is still ongoing. Please wait" // Update message if needed
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