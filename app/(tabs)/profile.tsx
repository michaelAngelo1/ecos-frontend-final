import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../config/Fonts'

const Profile = () => {
  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <Text className='text-2xl text-black mt-4 ml-5' style={styles.montserratBold}>Profile</Text>
      <ScrollView>
        <View className='flex flex-col min-h-[100vh] justify-start items-start px-4'>
          

          
        </View>
      </ScrollView>
    </SafeAreaView>  
  )
}

export default Profile