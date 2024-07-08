import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from '../config/Fonts';
import { userDetailInstance } from '../config/axiosConfig';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { User } from '@/models/User';
import icons from '@/constants/icons';
import { Image } from 'expo-image';

const Profile = () => {
  const [userToken, setUserToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState('');
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

  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken")
      if (userToken !== null) {
        console.log("User token read: ", userToken);
        setUserToken(userToken);
        return userToken;
      }
    } catch (e) {
      console.log("Error reading JWT", e);
    }
  } 

  const [email, setEmail] = useState('');

  const [user, setUser] = useState<User | null>(null);
  const getUserData = async () => {
    try {
      let userToken = await getToken();
      const response = await userDetailInstance(userToken!).get('', );
      setRole(response.data.response.role);
      setEmail(response.data.response.email);
      console.log('USER DATA: ',response.data.response.role);
      const user = new User(
        response.data.response.email,
        response.data.response.password,
        response.data.response.role,
        response.data.response.user_detail
      )
      setUser(user);
    } catch (e) {
      console.log("error get user data: ", e);
    }
  }

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

  useEffect(() => {
    getUserData();
    checkAuthToken();
  }, []);

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <Text className='text-2xl text-black mt-4 ml-5' style={styles.montserratBold}>Profile</Text>
      <ScrollView>
        <View className='flex flex-col justify-start items-start px-4 mt-5'>
        <View className='relative w-full h-24'>
          <Image className='absolute left-0 bottom-5 w-20 h-20 rounded-full' source={`http://ecos.joheee.com:4040/public/user/${user?.user_detail.profile_image}`}/>
          {/* <View className='absolute left-0 bottom-5 w-20 h-20 rounded-full bg-green'></View> */}
          <Text className='absolute top-0 left-24 text-xl' style={styles.montserratSemiBold}>{user?.user_detail.name}</Text>
          <Text className='absolute top-7 left-24 text-base' style={styles.montserratRegular}>{user?.user_detail.phone}</Text>
        </View>
        <TouchableOpacity 
          className="bg-white w-full h-12 rounded-[8px] p-2 justify-center"
          activeOpacity={0.7}
          onPress={() => router.push('/profileDetail')}
        >
          <View className='flex-row items-center justify-between'>
            <View className='flex-row gap-1'>
              <Image className='w-6 h-6' source={icons.profile_filled}/>
              <Text className="text-black text-sm text-start" style={styles.montserratSemiBold}>Personal Details</Text>
            </View>
            <Image className='w-8 h-8 opacity-70' source={icons.arrow_right}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          className="bg-white w-full h-12 rounded-[8px] mt-3 p-2 justify-center"
          activeOpacity={0.7}
          onPress={() => router.push('/changePassword')}
        >
          <View className='flex-row items-center justify-between'>
            <View className='flex-row gap-1'>
              <Image className='w-6 h-6' source={icons.lock_icon}/>
              <Text className="text-black text-sm text-start" style={styles.montserratSemiBold}>Change password</Text>
            </View>
            <Image className='w-8 h-8 opacity-70' source={icons.arrow_right}/>
          </View>
        </TouchableOpacity>
          
        <CustomButton
          actionText='Sign out'
          textColor='text-white'
          bgColor='bg-green'
          handlePress={handleSignOut}
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
