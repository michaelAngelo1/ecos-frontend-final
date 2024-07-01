import { ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from '../config/Fonts';

const Profile = () => {
  const [userToken, setUserToken] = useState('');
  const [userData, setUserData] = useState(null);
  let role = 'Passenger';

  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        console.log('User Token read: ', token);
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
      if (!userToken) {
        console.log('No token available for the request');
        return;
      }

      console.log('Using user token: ', userToken);

      const response = await axios.get('http://ecos.joheee.com:4040/user-detail', {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      setUserData(response.data);
      console.log('User detail data: ', response.data); // Assuming the role is part of the response data
    } catch (e) {
      console.log('Error getting user data: ', e);
    }
  };

  useEffect(() => {
    getUserToken();
  }, []);

  useEffect(() => {
    if (userToken) {
      console.log('User token exists');
      getUserData();
    }
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
