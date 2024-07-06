import { Platform, Pressable, SafeAreaView, ScrollView, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { styles } from '../config/Fonts'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import { userDetailInstance, userImageInstance } from '../config/axiosConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AddProfPic = () => {

  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<ImagePicker.ImagePickerAsset | null>(null)

  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken")
      if (userToken !== null) {
        console.log("User token read: ", userToken);
        return userToken;
      }
    } catch (e) {
      console.log("Error reading JWT", e);
    }
  }
  
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

    console.log('UPLOADED IMAGE: ', result.assets![0]);
    if(!result.canceled) {
      setImageFile(result.assets[0])
      setImage(result.assets[0].uri)
    }
  };

  const uploadImage = async () => {
    try {
      console.log('upload image');
      let userToken = await getToken();

      const formData = new FormData();
      formData.append('profile_picture', {
        uri: imageFile!.uri,
        name: imageFile!.fileName,
        type: imageFile!.type 
      })
      console.log('form data: ', formData);
      const response = await userImageInstance(userToken!).patch('', {
        profile_image_file: formData,
      }).then(() => {
        console.log('Success', response);
        router.push('/home');
      });

    } catch (e) {
      console.log('error upload image', e);
    }
  }

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
              uploadImage()
            }
          />
          <CustomButton
            actionText="Skip for now"
            bgColor='bg-white'
            textColor='text-green'
            handlePress={() => router.replace('/home')}
          />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddProfPic