import { ScrollView, StatusBar, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { Link } from 'expo-router'
import { styles } from './config/Fonts'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userDetailInstance } from './config/axiosConfig';
import  images  from '../constants/images';
import { Image } from 'expo-image';
// import { Provider } from 'react-redux'
// import store from './redux/store'

const HomePage = () => {

  // const [isAdminApproved, setIsAdminApproved] = useState<boolean>();
  
  const checkAdminVerification = async (userToken: string) => {
    try {
      const response = await userDetailInstance(userToken).get('',);
      return response.data.response.user_detail.is_admin_approved;
    } catch (e) {
      console.log('error check admin: ', e);
    }
  }

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if(token) {
          const isAdminApproved = await checkAdminVerification(token!);
          console.log(token);
          if (!isAdminApproved!) { // change to isAdminApproved when account is verified
            router.replace('/pendingApproval');
            return; // change to pendingApproval
          }
          router.replace('/home')
        }
      } catch (error) {
        console.error('Error checking stored token:', error);
      }
    };
    checkAuthToken();
  }, []);

  return (
    <SafeAreaView className='bg-transparent h-full' >
      <ScrollView contentContainerStyle={{ height: '100%', flex: 1}}>
      <Image
        source={images.ecos_01}  // Replace with your image source
        style={{ width: '100%', height: '100%' }}  // Stretch image to fill container
      />
        <View className='absolute bottom-[400px] left-24'>
          {/* <Text className='text-4xl text-white' style={styles.montserratSemiBold}>ECOS</Text> */}
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