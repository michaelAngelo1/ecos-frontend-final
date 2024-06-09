import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/app/config/Fonts'

interface FormFieldProps {
  title: string
  value: string
  handleChangeText: (e: string) => void
  otherStyles: string
  keyboardType: string
}

const FormField = ({ title, value, handleChangeText, otherStyles, ...props } : FormFieldProps) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`w-full space-y-2 ${otherStyles}`}>

      <View className='w-full h-14 bg-white px-4 rounded-lg'>
        <TextInput
          className="flex-1 text-green text-sm opacity-60"
          style={styles.montserratRegular}
          value={value}
          placeholder={title}
          placeholderTextColor="#387d4e"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Enter your password' && !showPassword}
        />

        {
          title === 'Enter your password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>

            </TouchableOpacity>
          )
        }
      </View>
    </View>
  )
}

export default FormField