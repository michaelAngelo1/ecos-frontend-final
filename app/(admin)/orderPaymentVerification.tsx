import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { paymentHeaderInstance } from '../config/axiosConfig'
import useGetToken from '@/hooks/useGetToken';
import HomeLayout from '../layout/HomeLayout';
import { styles } from '../config/Fonts';

const orderPaymentVerification = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { token } = useGetToken();

  const [paymentProofs, setPaymentProofs] = useState([{
    created_at: '',
    customer_order_header: {
      customer_order_id: '',
      extra_passenger: 0,
      order_id: '',
      user: {
        customer_detail: {
          binusian_id: "",
          email: '',
          user_detail: {
            grade: 0,
            name: '',
            phone: '',
            street: ''
          }
        }
      }
    },
    customer_payment_id: '',
    payment_proof_image: '',
    payment_total: 0,
    updated_at: '',
  }])
  console.log('token: ', token);
  const fetchCustomerPaymentProof = async () => {
    try {
      const paymentProof = await paymentHeaderInstance(token!).get('',);
      console.log('payment proof response: ', paymentProof.data.response);
      setPaymentProofs(paymentProof.data.response);
    } catch (e) {
      console.log('error fetch payment proof: ', e.response);
    }
  }

  useEffect(() => {
    fetchCustomerPaymentProof();
  }, [token])
  
  return (
    <HomeLayout modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View className='flex flex-col mx-4 mt-3'>
        <Text
          className="text-2xl ml-2 mb-1"
          style={styles.montserratBold}
        >
          Verify payment proofs
        </Text>
        <Text
          className="text-base ml-2 mb-1"
          style={styles.montserratSemiBold}
        >
          Payments in need of approval
        </Text>
      </View>
      <ScrollView>
        <View className="flex flex-col justify-start items-start px-4">
          {paymentProofs.length > 0 ? (
            paymentProofs?.map((proof) => (
              <Text key={proof.customer_payment_id}>{proof.customer_payment_id}</Text>
            ))
          ) : (
            <View className="w-full h-14 justify-center items-center">
              <Text style={styles.montserratRegular}>
                No payments need to be verified
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </HomeLayout>
  )
}

export default orderPaymentVerification