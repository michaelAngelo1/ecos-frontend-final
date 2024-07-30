import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HomeLayout from '../layout/HomeLayout'
import { styles } from '../config/Fonts';

const chosenDriverDetail = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <HomeLayout modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View className='flex flex-col px-4'>
        <Text className='text-2xl mt-3' style={styles.montserratBold}>Your driver details</Text>
        
      </View>
    </HomeLayout>
  )
}

export default chosenDriverDetail