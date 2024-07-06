import { Text, View } from 'react-native'
import React from 'react'
import { styles } from '../config/Fonts'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="signIn"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="signUpCustomer"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="signUpDriver"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="role"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="verifCustomer"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="verifDriver"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="vehicleInfo"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="addProfPic"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="forgotPassword"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="pendingApproval"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  )
}

export default AuthLayout