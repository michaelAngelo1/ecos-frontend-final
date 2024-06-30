import { ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './../config/Fonts'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import Snackbar from '@/components/Snackbar'
import { authInstance } from '../config/axiosConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface SignInProps {
  email: string
  password: string
}

const SignIn: React.FC<SignInProps> = () => {

  const [form, setForm] = useState<SignInProps>({
    email: '',
    password: ''
  });

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setIsAuthenticated(true);
          router.push('/verifCustomer'); // Redirect to protected route
        }
      } catch (error) {
        console.error('Error checking stored token:', error);
      }
    };
    checkAuthToken();
  }, []);

  const handleSignIn = async ({ email, password }: SignInProps) => {
    try {
      const response = await authInstance.post('', {
        email,
        password,
      });
      storeJWT(response.data["access_token"]);
      console.log(response.data["access_token"]);
      setIsAuthenticated(true);
      router.push('/verifCustomer');
    } catch (error: any) {
      console.log('ERROR SIGN IN', error.response.data);
      // Show Snackbar on error (assuming you have the implementation)
      setSnackbarVisible(true);
    }
  };

  const storeJWT = async (token: string) => {
    try {
      const jsonToken = JSON.stringify(token)
      await AsyncStorage.setItem('userToken', jsonToken)
      console.log("Successful store JWT");
    } catch (e) {
      console.log("Failed to store JWT: ", e)
    }
  };


  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <ScrollView>
        <View className='flex flex-col min-h-[100vh] justify-center items-center px-4'>
          <Text className='text-4xl text-green' style={styles.montserratRegular}>Sign in to ECOS</Text>
          <FormField
            title="Enter your email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, 
              email: e
            })}
            otherStyles="mt-4"
            keyboardType="email-address"
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
          
          <CustomButton
            actionText="Log in"
            bgColor='bg-green'
            textColor='text-white'
            handlePress={() => {
              handleSignIn({
                email:form.email, 
                password:form.password
              });
            }}
          />
          <View className='justify-center pt-2 flex-row gap-2'>
            <Text className='text-sm text-green' style={styles.montserratRegular}>
              Forgot password?
            </Text>
            <Link href="/forgotPassword" className='text-sm text-green' style={styles.montserratMedium}>Click here</Link>
          </View>
          <View className='justify-center pt-2 flex-row gap-2'>
            <Text className='text-sm text-green' style={styles.montserratRegular}>
              Don't have an account?
            </Text>
            <Link href="/role" className='text-sm text-green' style={styles.montserratMedium}>Sign up</Link>
          </View>
          
          { snackbarVisible && 
            <Snackbar
              message="Sign in failed. Check your username and password." // Update message if needed
              setVisible={setSnackbarVisible} // Pass the function to update visibility
              duration={3000}
            />
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn