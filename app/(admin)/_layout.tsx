import React from 'react'
import { Stack } from 'expo-router'

const AdminLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="usersVerification"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="driversVerification"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="orderPaymentVerification"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  )
}

export default AdminLayout