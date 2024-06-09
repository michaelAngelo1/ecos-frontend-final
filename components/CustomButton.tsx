import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from '@/app/config/Fonts'
import { CustomButtonProps } from '@/app/config/Interface'

const CustomButton = ({actionText, textColor, bgColor, handlePress} : CustomButtonProps) => {
  return (
    <TouchableOpacity 
      className={`${bgColor} w-full p-3 rounded-[8px] mt-3`}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <Text className={`${textColor} text-base text-center`} style={styles.montserratSemiBold}>{actionText}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton