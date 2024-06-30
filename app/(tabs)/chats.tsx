import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../config/Fonts'

const Chats = () => {

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

  /* 
    TODO:
    1. Get token stored on AsyncStorage
    2. Get user detail by token
    3. Get ROLE from user detail
    4. If ROLE == 'Passenger', show Passenger Chatpage
    5. Else if ROLE == 'Partner', show Partner Chatpage
  */
  
  // dummy state role variable, replace LATER
  let role = 'Passenger'; // Partner or Passenger

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      {
        role == 'Passenger' ? 
        <>
          <Text className='text-2xl text-black mt-4 ml-5' style={styles.montserratBold}>Messages</Text>
          <ScrollView>
            <View className='flex flex-col min-h-[100vh] justify-start items-start px-4'>


              

              
            </View>
          </ScrollView>
        </>
        :
        <>
          <Text>Partner Chatpage</Text>
        </>
      }
    </SafeAreaView>    
  )
}

export default Chats