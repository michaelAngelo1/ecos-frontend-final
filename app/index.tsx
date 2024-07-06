import { ScrollView, StatusBar, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { Link } from 'expo-router'
import { styles } from './config/Fonts'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userDetailInstance } from './config/axiosConfig';
// import { Provider } from 'react-redux'
// import store from './redux/store'

const HomePage = () => {

  const [isAdminApproved, setIsAdminApproved] = useState<boolean>();
  
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

  useEffect(() => {
    // getUserData();
    // if(role == 'ADMIN') {
    //   getAllUsers();
    // }
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        
        if (token && isAdminApproved) {
          // setIsAuthenticated(true);
          checkAdminVerification(token);// Redirect to protected route
        }
        console.log('approval admin diluar if: ', isAdminApproved);
        router.replace('/pendingApproval')
      } catch (error) {
        console.error('Error checking stored token:', error);
      }
    };
    checkAuthToken();
  }, []);

  return (
    <SafeAreaView className='bg-green h-full'>
      <ScrollView contentContainerStyle={{ height: '100%', flex: 1}}>
        <View className='flex flex-col h-full justify-center items-center px-4'>
          <Text className='text-4xl text-white' style={styles.montserratSemiBold}>ECOS</Text>
          <Text className='text-base text-white' style={styles.montserratMedium}>Eco Commute On-Sharing</Text>
        </View>
        <View className='absolute bottom-0 left-0 right-0 p-4'>
          <CustomButton
            actionText="Discover more"
            textColor="text-green"
            bgColor='bg-white'
            handlePress={() => router.replace('/signIn')}
          />
        </View>
      </ScrollView>
      <StatusBar/>
    </SafeAreaView>
  )
}

export default HomePage