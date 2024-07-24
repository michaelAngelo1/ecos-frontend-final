import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

interface CustomModalProps {
  isVisible: boolean
  message: string
  onPress: () => void
  onCancelPress: () => void
}

const CustomModal = ({ isVisible, message, onPress, onCancelPress } : CustomModalProps) => {
  return (
    <Modal isVisible={isVisible}>
      <View className="bg-white p-5 rounded-lg items-center">
        <Text className="text-lg mb-4">{message}</Text>
        <View className="flex flex-row gap-2">
          <TouchableOpacity
            className="bg-blue p-3 rounded-lg"
            onPress={onPress}
          >
            <Text className="text-white text-base">Yes, I want to register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 p-3 rounded-lg"
            onPress={onCancelPress}
          >
            <Text className="text-white text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
