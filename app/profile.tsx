import { Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '@/components/CustomButton';

const Profile = () => {

  const handleSignOut = async () => {
    try {
      const token = await AsyncStorage.removeItem('userToken');
      
    } catch (error) {
      console.error('Error deleting token: ', error);
    }
  };

  return (
    <View>
      <Text>Profile</Text>
      <Text>Test</Text>
      <CustomButton
        actionText='Sign out'
        textColor='text-white'
        bgColor='bg-green'
        handlePress={handleSignOut}
      />
    </View>
  )
}

export default Profile