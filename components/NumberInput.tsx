import { styles } from '@/app/config/Fonts';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

interface InputProps {
  value?: string;
  onChangeText: (text: string) => void;
}

const NumberInput: React.FC<InputProps> = ({ value, onChangeText }) => {
  const [text, setText] = useState(value || ''); // Initialize with optional value

  const handleOnChangeText = (newText: string) => {
    const numbers = '0123456789'; // Allow only these digits
    const sanitizedText = newText.replace(/[^0-9]/g, ''); // Remove non-numeric characters

    // Enforce max length of 4 digits
    setText(sanitizedText.slice(0, 4));

    // Pass the limited value to parent callback (optional)
    onChangeText(sanitizedText.slice(0, 4));
  };

  return (
    <View className='w-full h-10 bg-white rounded-xl'>
      <TextInput
        style={styles.montserratRegular}
        placeholder='Enter OTP'
        className='text-xl text-green opacity-60 p-2 items-center'
        keyboardType="numeric"
        value={text}
        onChangeText={handleOnChangeText}
        maxLength={4} // Set max length in TextInput for visual feedback
      />
    </View>
  );
};

export default NumberInput;