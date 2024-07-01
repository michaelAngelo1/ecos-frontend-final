import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../config/Fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const Profile = () => {

  const [userToken, setUserToken] = useState('');
  const [userData, setUserData] = useState(null);

  const getUserToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken")
      if (userToken !== null) {
        console.log("User Token read: ", userToken);
        setUserToken(userToken);
      }
    } catch (e) {
      console.log("Error reading JWT", e);
    }
  } 

  const getUserData = async () => {
    try {
      console.log('user token on getuserdata: ', userToken);
      const response = await axios.get('http://ecos.joheee.com:4040/user-detail', {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        }
      });
      setUserData(response.data);
      console.log("USER DETAIL DATA: ", response.data);
    } catch (e) { 
      console.log('error get user data: ', e);
    }
  }

  useEffect(() => {
    getUserToken();
  }, []);

  useEffect(() => {
    if (userToken) {
      console.log('user token exists');
      getUserData();
    }
  }, [userToken]);
  
  /* 
    TODO:
    1. Get token stored on AsyncStorage
    2. Get user detail by token
    3. Get ROLE from user detail
    4. If ROLE == 'Passenger', show Passenger Profilepage
    5. Else if ROLE == 'Partner', show Partner Profilepage
    6. Display all passenger information according to design
  */
  
  // dummy state role variable, replace LATER
  let role = 'Passenger'; // Partner or Passenger

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      {
        role == 'Passenger' ?
        <>
          <Text className='text-2xl text-black mt-4 ml-5' style={styles.montserratBold}>Profile</Text>
          <ScrollView>
            <View className='flex flex-col min-h-[100vh] justify-start items-start px-4'>
              

              
            </View>
          </ScrollView>
        
        </>
        :
        <>
          <Text>Partner Profilepage</Text>
        </>
      }
    </SafeAreaView>  
  )
}

export default Profile