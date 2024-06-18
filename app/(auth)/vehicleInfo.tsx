import { Button, Platform, ScrollView, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { styles } from '../config/Fonts'
import * as ImagePicker from 'expo-image-picker'

const VehicleInfo = () => {

  const [image, setImage] = useState('');

  const [form, setForm] = useState({
    vehicleModel: '',
    seatCapacity: '',
    numberPlate: '',
  })

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
          <Text className='text-4xl text-green text-center' style={styles.montserratRegular}>Vehicle Information</Text>
          {image ?
            <>
              <Image source={{ uri: image }} className='w-36 h-36'/>
              <View className='flex-row gap-1 w-screen px-4 mt-2'>
                <Text className='text-green text-sm text-center pt-2' style={styles.montserratRegular}>Not sure about the picture?</Text>
                <Pressable onPress={pickImage}>
                  <Text className='text-sm text-green p-2 border-2 border-green rounded-md' style={styles.montserratRegular}>Choose another</Text>
                </Pressable>
              </View>
            </>
            : 
            <>
              <Pressable onPress={pickImage}>
                <Text className='text-sm text-green p-2 border-2 border-green rounded-md' style={styles.montserratRegular}>Upload car picture</Text>
              </Pressable>
            </>
          }
          
          

          <FormField
            title="Vehicle Model"
            value={form.vehicleModel}
            handleChangeText={(e: string) => setForm({ ...form, 
              vehicleModel: e
            })}
            otherStyles="mt-3"
            keyboardType="vehicle-model"
          />
          <FormField
            title="Seat Capacity (excl. your own children)"
            value={form.seatCapacity}
            handleChangeText={(e: string) => setForm({ ...form, 
              seatCapacity: e
            })}
            otherStyles="mt-3"
            keyboardType="seat-capacity"
          />
          <FormField
            title="Number Plate"
            value={form.seatCapacity}
            handleChangeText={(e: string) => setForm({ ...form, 
              numberPlate: e
            })}
            otherStyles="mt-3"
            keyboardType="numberPlate"
          />
          

          <CustomButton
            actionText="Submit"
            bgColor='bg-green'
            textColor='text-white'
            handlePress={() => router.push('/addProfPic')}
          />

          <View className='justify-center pt-2 flex-row gap-2'>
            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default VehicleInfo