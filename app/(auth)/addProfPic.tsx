import { Platform, Pressable, SafeAreaView, ScrollView, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { styles } from '../config/Fonts'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'

const AddProfPic = () => {

  const [image, setImage] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libraryStatus.status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }

        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus.status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets);

    if(!result.canceled) {
      setImage(result.assets[0].uri)
    }
  };

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <ScrollView>
        <View className='flex flex-col min-h-[100vh] justify-center items-center px-4'>
          <Text className='text-4xl text-green text-center' style={styles.montserratRegular}>Add a profile picture</Text>
          <Text className='text-xl text-green text-center' style={styles.montserratRegular}>Show us your best smile!</Text>
          {
            image ? 
            <>
              <View className='flex-col gap-2 items-center'>
                <Image source={{ uri: image }} className='w-32 h-32'/>
                <Pressable onPress={pickImage} className="bg-white flex items-center justify-center">
                  <Text className='text-sm text-green p-2' style={styles.montserratBold}>Not sure? Add another</Text>
                </Pressable>
              </View>
            </>
            :
            <>
              <Pressable onPress={pickImage} className="w-32 h-32 bg-white flex items-center justify-center">
                <Text className='text-5xl text-green' style={styles.montserratBold}>+</Text>
              </Pressable>
            </>
          }
          

          <CustomButton
            actionText="Upload"
            bgColor='bg-green'
            textColor='text-white'
            handlePress={() => 
              router.push('/home')
            }
          />
          <CustomButton
            actionText="Skip for now"
            bgColor='bg-white'
            textColor='text-green'
            handlePress={() => router.push('/home')}
          />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddProfPic