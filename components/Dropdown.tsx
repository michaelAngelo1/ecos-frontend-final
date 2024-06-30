import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface DropdownItem {
  label: string;
  value: string;
}

const data: DropdownItem[] = [
  { label: 'Item 1', value: 'Item 1' },
  { label: 'Item 2', value: 'Item 2' },
  // ... rest of your data items
];

const Dropdown = () => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View className="bg-white p-4 w-full">
      {/* {renderLabel()} */}
      <View className="flex relative">
        <TextInput
          className={`border rounded-md px-3 py-2 w-full ${
            isFocus ? 'border-blue-500' : 'border-gray-300'
          }`}
          placeholder={!isFocus ? 'Select item' : '...'}
          value={value!}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChangeText={(text) => setValue(text)}
        />
        <TouchableOpacity onPress={() => setIsFocus(!isFocus)}>
          <AntDesign
            className={`absolute right-3 top-3 text-${
              isFocus ? 'blue-500' : 'gray-400'
            } mr-2`}
            name="Safety"
            size={20}
          />
        </TouchableOpacity>
      </View>
      {isFocus && (
        <View className="absolute top-[48px] left-0 w-full rounded-md shadow-md bg-white overflow-hidden max-h-[300px]">
          {data.map((item) => (
            <TouchableOpacity
              key={item.value}
              className="px-4 py-2 hover:bg-gray-200"
              onPress={() => {
                setValue(item.value);
                setIsFocus(false);
              }}
            >
              <Text className="text-sm text-gray-700">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Dropdown;