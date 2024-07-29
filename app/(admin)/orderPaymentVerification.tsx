import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { paymentHeaderInstance } from '../config/axiosConfig'
import useGetToken from '@/hooks/useGetToken';
import HomeLayout from '../layout/HomeLayout';
import { styles } from '../config/Fonts';
import { Image } from 'expo-image';

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
          parent_phone: '',
          user_id : '',
        },
        email: '',
        role: '',
        user_detail: {
          grade: 0,
          name: '',
          phone: '',
          street: ''
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
      console.log('payment proof response: ', paymentProof.data.response[0].custome );
      setPaymentProofs(paymentProof.data.response);
    } catch (e) {
      console.log('error fetch payment proof: ', e);
    }
  }

  // Payment Proof State Vars
  const [proofVisible, setProofVisible] = useState(false);

  // Image Path
  const [proofPath, setProofPath] = useState('');
  console.log('PROOF PATH: ', proofPath);

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
              <View key={proof.customer_payment_id} className='flex flex-col p-3 w-full h-fit bg-[#fff] border border-1 border-green rounded-xl mb-3'>
                <Text >Order ID: {proof.customer_order_header.customer_order_id}</Text>
                <Text >Order Payment ID: {proof.customer_payment_id}</Text>
                <Text >Passenger Name: {proof.customer_order_header.user.user_detail.name}</Text>
                <Text >Passenger Grade: {proof.customer_order_header.user.user_detail.grade}</Text>
                <Text >Passenger Phone: {proof.customer_order_header.user.user_detail.phone}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setProofVisible(true);
                    console.log('PATH: ', proof.payment_proof_image);
                    setProofPath('http://ecos.joheee.com:4050/public/payment/' + proof.payment_proof_image);
                  }}
                >
                  <Text className='text-blue underline'>Check payment proof</Text>
                </TouchableOpacity>
              </View>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={proofVisible}
        onRequestClose={() => {
          setProofVisible(false);
        }}
      >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.modalText}>Payment Proof</Text>
          <Image
            source={proofPath} // Dummy image URL
            style={modalStyles.image}
          />
          <TouchableOpacity
            style={[modalStyles.button, modalStyles.buttonClose]}
            onPress={() => setProofVisible(false)}
          >
            <Text style={modalStyles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
      </Modal>
    </HomeLayout>
  )
}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 15,
  }
});

export default orderPaymentVerification