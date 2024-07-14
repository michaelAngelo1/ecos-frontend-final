import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../config/Fonts'
import CustomButton from '@/components/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { userDetailInstance } from '../config/axiosConfig'
import Snackbar from '@/components/Snackbar'

const PendingApproval = () => {

  /*
    Steps Approval:
    1. User successfully signs up.
    2. Uploading / Skipping the upload profpic
    3. On page before Home: checks if the user's is_admin_verified is TRUE
    4. if is_admin_verified is TRUE, forward to Home
    5. else if FALSE, forward HERE
    6. STREAM calling the API to check if is_admin_verified has changed from FALSE to TRUE
    7. if is_admin_verified changed to TRUE, forward to Home
  */ 
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  
  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken")
      if (userToken !== null) {
        console.log("User token read: ", userToken);
        return userToken;
      }
    } catch (e) {
      console.log("Error reading JWT", e);
    }
  } 

  const checkAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.log('to index');
        router.replace('/');
      }
      console.log('user token exists: ', token);
    } catch (error) {
      console.error('Error checking stored token:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const token = await AsyncStorage.removeItem('userToken');
      // router.replace('/');
      checkAuthToken();
      console.log('signed out');
    } catch (error) {
      console.error('Error deleting token: ', error);
    }
  };

  const checkAdminVerification = async () => {
    try {
      const userToken = await getToken();
      const response = await userDetailInstance(userToken!).get('',);
      if(response.data.response.user_detail.is_admin_approved) {
        setSnackbarVisible(false);
        await new Promise(resolve => setTimeout(resolve, 3000));
        router.replace('/home');
        return;
      }
      setIsApproved(response.data.response.user_detail.is_admin_approved);
      setSnackbarVisible(true);
      console.log("admin approval: ", response.data.response.user_detail.is_admin_approved);
    } catch (e) {
      console.log('error check admin: ', e);
    }
  }

  useEffect(() => {
    // checkAuthToken();
    // checkAdminVerification();
  }, []);

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <ScrollView>
        <View className='flex flex-col min-h-[100vh] justify-center items-center px-4'>
          <Text className='text-2xl text-green' style={styles.montserratBold}>Pending Approval</Text>
          <Text className='text-base text-green text-center mb-3' style={styles.montserratMedium}>Wait for admin to approve of your request. Thank you for choosing ECOS!</Text>
          <CustomButton
            actionText='Check admin verification'
            textColor='text-white'
            bgColor='bg-green'
            handlePress={ () => {
              checkAdminVerification();
              // checkVerif()
              
            }
            }
          />
          <CustomButton
            actionText='Sign out'
            textColor='text-green'
            bgColor='bg-white'
            handlePress={handleSignOut}
          />
          { isApproved ?
              <Snackbar
                message="You have been verified by the admin. Let's sign in!" // Update message if needed
                setVisible={setSnackbarVisible} // Pass the function to update visibility
                duration={3000}
                bgColor='bg-blue'
              />
            : 
            <Snackbar
              message="Verification process is still ongoing. Please wait." // Update message if needed
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

export default PendingApproval

function setIsPaid(arg0: boolean) {
  throw new Error('Function not implemented.')
}
