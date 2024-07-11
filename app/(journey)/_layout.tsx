import { Text, View } from 'react-native'
import React from 'react'
import { styles } from '../config/Fonts'
import { Stack } from 'expo-router'

const JourneyLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="tripDetail"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="dailyTripDetail"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  )
}

export default JourneyLayout