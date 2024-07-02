import { ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from '../config/Fonts';
import { userDetailInstance } from '../config/axiosConfig';

const Profile = () => {
  const [userToken, setUserToken] = useState<string>('');
  const [userData, setUserData] = useState(null);
  let role = 'Passenger';

  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        setUserToken(token);
      } else {
        console.log('No token found');
      }
    } catch (e) {
      console.log('Error reading JWT', e);
    }
  };

  const getUserData = async () => {
    try {
      if (userToken === '') {
        console.log('No token available for the request');
        return;
      }

      // console.log('Using user token: ', userToken);
      const response = await userDetailInstance(userToken).get('');

      setUserData(response.data);
      console.log('User detail data: ', response.data); 
    } catch (e) {
      console.log('Error getting user data: ', e);
    }
  };

  useEffect(() => {
    getUserToken();
    if (userToken) getUserData();
  }, [userToken]);

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      {role === 'Passenger' ? (
        <>
          <Text className='text-2xl text-black mt-4 ml-5' style={styles.montserratBold}>Profile</Text>
          
        </>
      ) : (
        <>
          <Text>Partner Profile Page</Text>
          {/* Add partner-specific profile details here */}
        </>
      )}
    </SafeAreaView>
  );
};

export default Profile;
