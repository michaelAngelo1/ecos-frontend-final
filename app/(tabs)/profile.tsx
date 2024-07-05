import { ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from '../config/Fonts';
import { userDetailInstance } from '../config/axiosConfig';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { User } from '@/models/User';

const Profile = () => {
  const [userToken, setUserToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState('');

  const checkAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
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
      checkAuthToken();
      console.log('signed out');
    } catch (error) {
      console.error('Error deleting token: ', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      {role === 'CUSTOMER' ? (
        <>
          <Text className='text-2xl text-black mt-4 ml-5' style={styles.montserratBold}>Profile</Text>
          <ScrollView>
            <View className='flex flex-col justify-start items-start px-4'>

            
             

              

              

              
            <CustomButton
              actionText='Sign out'
              textColor='text-white'
              bgColor='bg-green'
              handlePress={handleSignOut}
            />
            </View>
          </ScrollView>
        </>
      ) 
      : role == 'DRIVER' ? (
        <>
          <Text>Partner Profile Page</Text>
          <CustomButton
            actionText='Sign out'
            textColor='text-white'
            bgColor='bg-green'
            handlePress={handleSignOut}
          />
          {/* Add partner-specific profile details here */}
        </>
      )
      : 
        <>
          <Text>Admin Profile Page</Text>
          <CustomButton
            actionText='Sign out'
            textColor='text-white'
            bgColor='bg-green'
            handlePress={handleSignOut}
          />
        </>
    }
    </SafeAreaView>
  );
};

export default Profile;
