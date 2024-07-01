import { ScrollView, StatusBar, Text, View } from 'react-native'
import React from 'react'
// import { Link } from 'expo-router'
import { styles } from './config/Fonts'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton'
// import { Provider } from 'react-redux'
// import store from './redux/store'

const HomePage = () => {
  return (
    <SafeAreaView className='bg-green h-full'>
      <ScrollView contentContainerStyle={{ height: '100%', flex: 1}}>
        <View className='flex flex-col h-full justify-center items-center px-4'>
          <Text className='text-4xl text-white' style={styles.montserratSemiBold}>ECOS</Text>
          <Text className='text-base text-white' style={styles.montserratMedium}>Eco Commute On-Sharing</Text>
        </View>
        <View className='absolute bottom-0 left-0 right-0 p-4'>
          <CustomButton
            actionText="Discover more"
            textColor="text-green"
            bgColor='bg-white'
            handlePress={() => router.push('/signIn')}
          />
        </View>
      </ScrollView>
      <StatusBar/>
    </SafeAreaView>
  )
}

export default HomePage