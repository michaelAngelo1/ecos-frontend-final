import { ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './../config/Fonts'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import Snackbar from '@/components/Snackbar'
import { authInstance, userDetailInstance } from '../config/axiosConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SignInProps } from '../config/Interface'

const SignIn: React.FC<SignInProps> = () => {

  const [form, setForm] = useState<SignInProps>({
    email: '',
    password: ''
  });

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminApproved, setIsAdminApproved] = useState<boolean>();

  const checkAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('TOKEN HERE: ', token);
      if (token) {
        setIsAuthenticated(true);
        console.log('masuk sini dong');
        checkAdminVerification(token);
      } 
      // router.replace('/pendingApproval')
    } catch (error) {
      console.error('Error checking stored token:', error);
    }
  };
  useEffect(() => {
    checkAuthToken();

  }, []);

  const checkAdminVerification = async (userToken: string) => {
    try {
      const response = await userDetailInstance(userToken).get('',).then((res) => {
        console.log('response: ', res.data.response.user_detail.is_admin_approved);
        setIsAdminApproved(res.data.response.user_detail.is_admin_approved);
      });
      console.log('masuk check admin: ', isAdminApproved);
      if(isAdminApproved) {
        router.replace('/home');
      } 
      router.replace('/pendingApproval')
    } catch (e) {
      console.log('error check admin: ', e);
    }
  }

  const handleSignIn = async ({ email, password }: SignInProps) => {
    console.log('masuk handle sign in');
    try {
      const response = await authInstance.post('', {
        email,
        password,
      });
      if(response && response.data) {
        storeJWT(response.data["access_token"]);
        console.log(response.data["access_token"]);
        console.log('respons signin', response.config.data.email);
        setIsAuthenticated(true);
        checkAdminVerification(response.data['access_token']);
        // router.replace('/home');
      } else {
        console.log('NO RESPONSE');
        throw new Error('No response data');
      }
    } catch (error: any) {
      console.log('ERROR SIGN IN', error.response.data);
      // Show Snackbar on error (assuming you have the implementation)
      setSnackbarVisible(true);
    }
  };

  const handleAdminSignIn = async (email: string, password: string, role: string) => {
    try {
      const response = await authInstance.post('', {
        email, 
        password
      }).then(async (res) => {
        let adminToken = res.data['access_token'];
        const response = await userDetailInstance(adminToken).patch('', {
          role: role,
        }).then(async () => {
          const response = await authInstance.post('', {
            email,
            password,
          });
          console.log(response.data['access_token']);
          storeJWT(response.data['access_token']);
          router.replace('/home');
        });
      });
    } catch (e) {
      console.log('error admin sign in');
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
              if(form.email.includes('admin')) {
                let role = 'ADMIN';
                handleAdminSignIn(form.email, form.password, role);
              } else {
                console.log('masuk else sini');
                handleSignIn({
                  email:form.email, 
                  password:form.password
                });
              }
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