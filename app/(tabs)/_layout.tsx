import { StyleSheet, Text, View, Image, ImageSourcePropType } from 'react-native'
import React, { useState } from 'react'
import { Tabs, Redirect } from 'expo-router'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import  icons  from '../../constants/icons'
import { styles } from '../config/Fonts'
import { IconProps } from '../config/Interface'
import { Stack } from 'expo-router'

const TabIcon = ({ icon, color, name, focused} : IconProps) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode="contain"
        className="w-6 h-6"
      />
      {
        focused ? 
          <Text className='text-green' style={styles.montserratSemiBold}>{name}</Text>
        : 
          <Text className='text-black' style={styles.montserratSemiBold}>{name}</Text>
      }
    </View>
  )
}

const ProfileStack = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="profileDetail"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  );
};

const TabsLayout = () => {
  
  const [selected, setSelected] = useState(true);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 85,
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={focused ? icons.home_filled : icons.home_outlined}
                name="Home" 
                color={color}
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={focused ? icons.orders_filled : icons.orders_outlined}
                name="Orders"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={focused ? icons.chat_filled : icons.chat_outlined}
                name="Chats"
                color={color}
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={focused ? icons.profile_filled : icons.profile_outlined}
                name="Profile"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout