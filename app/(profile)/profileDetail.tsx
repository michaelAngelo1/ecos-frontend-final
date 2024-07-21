import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../config/Fonts'
import { userDetailInstance } from '../config/axiosConfig'
import { User } from '@/models/User'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { Image } from 'expo-image'

interface ProfileDetailProps {
  name: string | null
  phone: string | null
  email: string | null
  address: string | null
}

const profileDetail = () => {

  const [form, setForm] = useState<ProfileDetailProps>({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

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

  const [email, setEmail] = useState('');

  const [user, setUser] = useState<User | null>(null);
  const getUserData = async () => {
    try {
      let userToken = await getToken();
      const response = await userDetailInstance(userToken!).get('', );
      if(response && response.data) {
        console.log('USER DATA: ',response.data.response);
        const user = new User(
          response.data.response.email,
          response.data.response.password,
          response.data.response.role,
          response.data.response.user_detail
        )
        setUser(user);
      } else {
        console.log('No response from API')
      }
    } catch (e) {
      console.log("error get user data: ", e);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <Text className='text-2xl text-black mt-4 ml-5' style={styles.montserratBold}>Edit your profile</Text>
        <ScrollView>
          <View className='flex flex-col justify-center items-center px-4 mt-5'>
            <Image className='w-40 h-40 rounded-full' source={`http://ecos.joheee.com:4050/public/user/${user?.user_detail.profile_image}`}/>
            <Text className='text-2xl mt-3' style={styles.montserratSemiBold}>{user?.user_detail.name}</Text>
            <Text className='text-lg' style={styles.montserratMedium}>{user?.user_detail.phone}</Text>

            <FormField
              title=''
              value={user?.user_detail.name}
              handleChangeText={(e: string) => setForm({ ...form, 
                name: e
              })}
              otherStyles='mt-3'
              keyboardType='name'
            />
            <FormField
              title=''
              value={user?.user_detail.phone}
              handleChangeText={(e: string) => setForm({ ...form, 
                phone: e
              })}
              otherStyles='mt-3'
              keyboardType='phone'
            />
            <FormField
              title=''
              value={user?.email}
              handleChangeText={(e: string) => setForm({ ...form, 
                email: e
              })}
              otherStyles='mt-3'
              keyboardType='email'
            />
            <FormField
              title=''
              value={user?.user_detail.street}
              handleChangeText={(e: string) => setForm({ ...form, 
                address: e
              })}
              otherStyles='mt-3'
              keyboardType='address'
            />
            <CustomButton
              actionText='Back'
              textColor='text-white'
              bgColor='bg-green'
              handlePress={() => {
                router.push('(tabs)/profile')
              }}
            />
            

            
          
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default profileDetail