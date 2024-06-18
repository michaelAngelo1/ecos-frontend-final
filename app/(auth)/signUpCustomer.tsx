import { ScrollView, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './../config/Fonts'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { SignUpCustomerProps } from '../config/Interface'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'

const SignUpCustomer = () => {

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    pickUpAddress: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignUpCustomer = async ({firstName, lastName, email, phoneNumber, pickUpAddress, password, confirmPassword} : SignUpCustomerProps) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      router.push('/verifCustomer');
    } catch (error) {
      console.log('error creating account', error);
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
            title="Confirm password"
            value={form.confirmPassword}
            handleChangeText={(e: string) => setForm({ ...form, 
              confirmPassword: e
            })}
            otherStyles="mt-3"
            keyboardType='confirmPassword'
          />
          <CustomButton
            actionText="Sign up"
            bgColor='bg-green'
            textColor='text-white'
            handlePress={() => router.push('/verifCustomer')}
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