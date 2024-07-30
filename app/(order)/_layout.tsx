import { Text, View } from 'react-native'
import React from 'react'
import { styles } from '../config/Fonts'
import { Stack } from 'expo-router'

const OrderLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="paymentProcess"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="driverDetail"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="pendingPaymentVerif"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="successPaymentVerif"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="orderDetail"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="cancelOrder"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="locationDetail"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="chosenDriverDetail"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  )
}

export default OrderLayout