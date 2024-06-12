import { Text, View } from 'react-native'
import React from 'react'
import { styles } from '@/app/config/Fonts'

const DriverCard = () => {
  return (
    <View className='w-screen h-32 bg-[#fff]'>
      <Text className='p-4 text-lg text-black' style={styles.montserratSemiBold}>DriverCard</Text>
    </View>
  )
}

export default DriverCard