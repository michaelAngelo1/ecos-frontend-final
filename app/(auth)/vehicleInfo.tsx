import { Button, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { styles } from '../config/Fonts'
import * as ImagePicker from 'expo-image-picker'
import Snackbar from '@/components/Snackbar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { driverDetailInstance } from '../config/axiosConfig'
import { VehicleInfoProps } from '../config/Interface'

const VehicleInfo = () => {

  const [image, setImage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [form, setForm] = useState({
    vehicleModel: '',
    seatCapacity: '',
    numberPlate: '',
    yearReleased: '',
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

  const handleSubmitVehicleInfo = async ({vehicleModel, seatCapacity, yearReleased, numberPlate} : VehicleInfoProps) => {
    try {
      let userToken = await getToken();
      if(vehicleModel == '' || seatCapacity == '' || numberPlate == '' || yearReleased == '' || parseInt(yearReleased) < 2014) {
        setSnackbarVisible(true);
        return;
      }
      const response = await driverDetailInstance(userToken!).patch('', {
        vehicle_model: vehicleModel,
        vehicle_capacity: seatCapacity,
        vehicle_number_plate: numberPlate,
        vehicle_category: 'MPV'
      });
      console.log('update role response: ', response.data.response.role);
      // router.push('/pendingApproval')
    } catch (e) {
      console.log('error vehicle info: ', e.response);
    }
  }

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <ScrollView>
        <View className='flex flex-col min-h-[100vh] justify-center items-center px-4'>
          <Text className='text-4xl text-green text-center' style={styles.montserratRegular}>Vehicle Information</Text>
          {/* {image ?
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
          } */}
          
          

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
            title="Vehicle Release Year"
            value={form.yearReleased}
            handleChangeText={(e: string) => setForm({ ...form, 
              yearReleased: e
            })}
            otherStyles="mt-3"
            keyboardType="year-released"
          />
          <FormField
            title="Number Plate"
            value={form.numberPlate}
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
            handlePress={() => {
              handleSubmitVehicleInfo({
                vehicleModel: form.vehicleModel,
                seatCapacity: form.seatCapacity,
                numberPlate: form.numberPlate,
                yearReleased: form.yearReleased
              });
            }}
          />

          <View className='justify-center pt-2 flex-row gap-2'>
            
          </View>
          { snackbarVisible && 
            <Snackbar
              message="Please fill your vehicle information. Make sure your vehicle release year is >= 2014" // Update message if needed
              setVisible={setSnackbarVisible} // Pass the function to update visibility
              duration={3000}
              bgColor='bg-red-900'
            />
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default VehicleInfo