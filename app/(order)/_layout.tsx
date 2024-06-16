import { Text, View } from 'react-native'
import React from 'react'
import { styles } from '../config/Fonts'
import { Stack } from 'expo-router'

const OrderLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="paymentChoice"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  )
}

export default OrderLayout