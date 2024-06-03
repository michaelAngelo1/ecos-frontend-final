import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { styles } from './config/Fonts'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomePage = () => {

  // {/* <View className='flex-1 items-center justify-center bg-white'>
  //       <Text className='text-3xl text-green' style={styles.montserratRegular}>Hello</Text>
  //       <Link href="/home" className="text-2xl text-green" style={styles.montserratBold}>Go to Home</Link>
  //     </View> */}
  return (
    <SafeAreaView className='bg-green h-full'>
      <ScrollView contentContainerStyle={{ height: '100%', flex: 1}}>
        <View className='flex flex-col h-full justify-center items-center px-4'>
          <Text className='text-4xl text-white' style={styles.montserratSemiBold}>ECOS</Text>
          <Text className='text-base text-white' style={styles.montserratMedium}>Eco Commute On-Sharing</Text>
        </View>
        <View className='absolute bottom-0 left-0 right-0 p-4'>
          <TouchableOpacity className='bg-white p-3 rounded-[15px] mt-3'>
            <Text className='text-base text-green text-center' style={styles.montserratSemiBold}>Discover more</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage