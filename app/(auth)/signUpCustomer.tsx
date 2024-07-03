import { ScrollView, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './../config/Fonts'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { SignInProps, SignUpCustomerProps } from '../config/Interface'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'
import { authInstance, userDetailInstance } from '../config/axiosConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const SignUpCustomer = () => {

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    pickUpAddress: '',
    password: '',
    grade: '',
  });

  let role = 'CUSTOMER'
  const [signUpToken, setSignUpToken] = useState('');
  const handleSignUpCustomer = async ({firstName, lastName, email, phoneNumber, pickUpAddress, grade, password} : SignUpCustomerProps) => {
    try {
      let gradeInt = parseInt(grade);
      const response = await authInstance.patch('', {
        name: firstName + lastName,
        email: email,
        phone: phoneNumber,
        street: pickUpAddress,
        password: password,
        grade: gradeInt
      }).then((res) => {
        handleUpdateRole().then(() => {
          getUpdatedToken(email).then((token) => {
            storeJWT(token).then(() => {
              router.push('/addProfPic');
            })
          });
        });

      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          // Request was made but no response was received
          console.error('Request data:', error.request);
        } else {
          // Something happened in setting up the request
          console.error('Error message:', error.message);
        }
      }
    }
  };

  const handleUpdateRole = async () => {
    try {
      console.log('sign up token: ', signUpToken);
      const response = await userDetailInstance(signUpToken).patch('', {
        role: role,
      });
      console.log("update role response: ", response.data.response.email); 
      let email = response.data.response.email;
      
    } catch (e) {
      console.log('error update role: ', e.response)
    }
  };

  const getUpdatedToken = async (email: string) => {
    try {
      console.log(email);
      console.log(form.password);
      const response = await authInstance.post('', {
        email: email,
        password: form.password
      });
      return response.data['access_token']
    } catch (e) {
      console.log('error getting update token: ', e.response);
    }
  }
  
  const storeJWT = async (token: string) => {
    try {
      await AsyncStorage.setItem('userToken', token)
      console.log("Successful store JWT");
    } catch (e) {
      console.log("Failed to store JWT: ", e)
    }
  };
  

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <ScrollView>
        <View className='flex flex-col min-h-[100vh] justify-center items-center px-4'>
          <Text className='text-4xl text-green' style={styles.montserratRegular}>Sign up to ECOS</Text>
          <Text className="text-2xl text-green" style={styles.montserratRegular}>as a Passenger</Text>
          <View className='w-full justify-center pt-2 flex-row gap-2 mt-3'>
            <View className="w-[182px] space-y-2">
              <View className='h-14 bg-white rounded-lg'>
                <TextInput
                  className="flex-1 p-4 text-green text-base opacity-80"
                  style={styles.montserratRegular}
                  value={form.firstName}
                  placeholder="First name"
                  placeholderTextColor="#387d4e"
                  onChangeText={(e: string) => setForm({ ...form, 
                    firstName: e
                  })}
                />
              </View>
            </View>
            <View className="w-1/2 space-y-2">
              <View className='h-14 bg-white px-4 rounded-lg'>
                <TextInput
                  className="flex-1 text-green text-base opacity-80"
                  style={styles.montserratRegular}
                  value={form.lastName}
                  placeholder="Last name"
                  placeholderTextColor="#387d4e"
                  onChangeText={(e: string) => setForm({ ...form, 
                    lastName: e
                  })}
                />
              </View>
            </View>
          </View>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, 
              email: e
            })}
            otherStyles="mt-3"
            keyboardType="email-address"
          />
          <FormField
            title="Active phone number"
            value={form.phoneNumber}
            handleChangeText={(e: string) => setForm({ ...form, 
              phoneNumber: e
            })}
            otherStyles="mt-3"
            keyboardType='phoneNumber'
          />
          <FormField
            title="Pick-up Address"
            value={form.pickUpAddress}
            handleChangeText={(e: string) => setForm({ ...form, 
              pickUpAddress: e
            })}
            otherStyles="mt-3"
            keyboardType="pickUpAddress"
          />
          <FormField
            title="Enter your password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, 
              password: e
            })}
            otherStyles="mt-3"
            keyboardType='password'
          />
          <FormField
            title="Enter your grade"
            value={form.grade}
            handleChangeText={(e: string) => setForm({ ...form, 
              grade: e
            })}
            otherStyles="mt-3"
            keyboardType='grade'
          />
          <CustomButton
            actionText="Next up"
            bgColor='bg-green'
            textColor='text-white'
            handlePress={() => {
              handleSignUpCustomer({
                firstName: form.firstName, 
                lastName: form.lastName, 
                email: form.email, 
                phoneNumber: form.phoneNumber, 
                pickUpAddress: form.pickUpAddress, 
                grade: form.grade, 
                password: form.password
              });
            }
          }
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

export default SignUpCustomer