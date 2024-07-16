import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './../config/Fonts'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import {  SignUpDriverProps } from '../config/Interface'
import { authInstance, userDetailInstance } from '../config/axiosConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import icons from '@/constants/icons'
import { Image } from 'expo-image'

const SignUpDriver = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    pickUpAddress: '',
    password: '',
    grade: '',
    binusianId: '',
  });

  let role = 'DRIVER';
  const [signUpToken, setSignUpToken] = useState('');

  const handleSignUpCustomer = async ({ firstName, lastName, email, phoneNumber, pickUpAddress, password, grade, binusianId }: SignUpDriverProps) => {
    try {
      const response = await authInstance.patch('', {
        name: firstName + " " +  lastName,
        email: email,
        phone: phoneNumber,
        street: pickUpAddress,
        password: password,
        binusian_id: binusianId,
        grade: 0,
      });

      console.log(response.data['access_token']);

      // Update the state and wait for it to be set before proceeding
      setSignUpToken(response.data['access_token']);
      handleNextSteps(response.data['access_token'], email);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      }
    }
  };

  const handleNextSteps = async (token: string, email: string) => {
    try {
      await handleUpdateRole(token);
      const updatedToken = await getUpdatedToken(email);
      await storeJWT(updatedToken);
      router.push('/addProfPic');
    } catch (error) {
      console.error('Error in next steps:', error);
    }
  };

  const handleUpdateRole = async (token: string) => {
    try {
      console.log('sign up token: ', token);
      const response = await userDetailInstance(token).patch('', {
        role: role,
      });
      console.log('update role response: ', response.data.response.role);
    } catch (e) {
      console.log('error update role: ', e.response);
    }
  };

  const getUpdatedToken = async (email: string) => {
    try {
      console.log(email);
      console.log(form.password);
      const response = await authInstance.post('', {
        email: email,
        password: form.password,
      });
      return response.data['access_token'];
    } catch (e) {
      console.log('error getting update token: ', e.response);
    }
  };

  const storeJWT = async (token: string) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      console.log('Successful store JWT: ', token);
    } catch (e) {
      console.log('Failed to store JWT: ', e);
    }
  };

  // const handleError = (error: string) => {
  //   if (axios.isAxiosError(error)) {
  //     console.error('Axios error:', error.message);
  //     if (error.response) {
  //       console.error('Response data:', error.response.data);
  //       console.error('Response status:', error.response.status);
  //       console.error('Response headers:', error.response.headers);
  //     } else if (error.request) {
  //       console.error('Request data:', error.request);
  //     } else {
  //       console.error('Error message:', error.message);
  //     }
  //   }
  // };

  // DUMMY TERMS & CONDITIONS STATE
  const [termsConditions, setTermsConditions] = useState(false);

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <ScrollView>
        <View className="flex flex-col min-h-[100vh] justify-center items-center px-4">
          <Text className="text-4xl text-green" style={styles.montserratMedium}>
            Sign up to ECOS
          </Text>
          <Text className="text-2xl text-green" style={styles.montserratRegular}>
            as a Partner
          </Text>
          <View className="w-full justify-center pt-2 flex-row mt-3">
            <View className="w-1/2 pr-3">
              <View className="h-14 bg-white rounded-lg">
                <TextInput
                  className="flex-1 p-4 text-green text-base opacity-80"
                  style={styles.montserratRegular}
                  value={form.firstName}
                  placeholder="First name"
                  placeholderTextColor="#387d4e"
                  onChangeText={(e: string) => setForm({ ...form, firstName: e })}
                />
              </View>
            </View>
            <View className="w-1/2">
              <View className="h-14 bg-white px-4 rounded-lg">
                <TextInput
                  className="flex-1 text-green text-base opacity-80"
                  style={styles.montserratRegular}
                  value={form.lastName}
                  placeholder="Last name"
                  placeholderTextColor="#387d4e"
                  onChangeText={(e: string) => setForm({ ...form, lastName: e })}
                />
              </View>
            </View>
          </View>

          <FormField
            title="Enter email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-3"
            keyboardType="email-address"
          />
          <FormField
            title="Active phone number"
            value={form.phoneNumber}
            handleChangeText={(e: string) => setForm({ ...form, phoneNumber: e })}
            otherStyles="mt-3"
            keyboardType="phoneNumber"
          />
          <FormField
            title="Enter your address"
            value={form.pickUpAddress}
            handleChangeText={(e: string) => setForm({ ...form, pickUpAddress: e })}
            otherStyles="mt-3"
            keyboardType="pickUpAddress"
          />
          <FormField
            title="Enter your child's Binusian ID"
            value={form.binusianId}
            handleChangeText={(e: string) => setForm({ ...form, binusianId: e })}
            otherStyles="mt-3"
            keyboardType="grade"
          />
          <FormField
            title="Enter your password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-3"
            keyboardType="password"
          />
          <View className='flex-row gap-1 items-center mt-1'>
            <Pressable
              onPress={() => setTermsConditions(!termsConditions)}
            >
              {
                termsConditions ? 
                  <Image className='w-6 h-6' source={icons.verified_icon}/>
                :
                  <View className='w-6 h-6 rounded-full border border-1 border-green'></View>
              }
              
            </Pressable>
            <Text className='text-sm text-green' style={styles.montserratRegular}>I agree to terms and conditions</Text>
          </View>
          <CustomButton
            actionText="Next up"
            bgColor="bg-green"
            textColor="text-white"
            handlePress={() =>
              handleSignUpCustomer({
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phoneNumber: form.phoneNumber,
                pickUpAddress: form.pickUpAddress,
                grade: form.grade,
                password: form.password,
                binusianId: '2413',
                parentsPhone: '3824'
              })
            }
          />

          <View className="justify-center pt-2 flex-row gap-2">
            <Text className="text-sm text-green" style={styles.montserratRegular}>
              Already have an account?
            </Text>
            <Link href="/signIn" className="text-sm text-green" style={styles.montserratMedium}>
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpDriver;
