import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Platform, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { styles } from '../config/Fonts'
import * as ImagePicker from 'expo-image-picker'
import Snackbar from '@/components/Snackbar'

const documentVerif = () => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [ktp, setKtp] = useState('');
  const [sim, setSim] = useState('');
  const [kk, setKk] = useState('');
  const [stnk, setStnk] = useState('');

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

  const pickKtp = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets);

    if(!result.canceled) {
      setKtp(result.assets[0].uri)
    }
  };

  const pickKk = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets);

    if(!result.canceled) {
      setKk(result.assets[0].uri)
    }
  };

  const pickSim = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets);

    if(!result.canceled) {
      setSim(result.assets[0].uri)
    }
  };

  const pickStnk = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets);

    if(!result.canceled) {
      setStnk(result.assets[0].uri)
    }
  };

  const dummyUploadImage = async () => {
    setSnackbarVisible(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    router.push('/signIn');
  }

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <ScrollView>
        <View className='flex flex-col min-h-[100vh] justify-center items-center px-4'>
          <Text className='text-4xl text-green text-center' style={styles.montserratRegular}>Vehicle Information</Text>
          <Text className='text-base text-green text-center' style={styles.montserratRegular}>Please submit a clear and complete copy of your valid documents to Academic Operations team includes the following: </Text>
          <View className='flex flex-col'>  
            <Text className='text-base text-green text-center' style={styles.montserratRegular}>1. KTP</Text>
            <Text className='text-base text-green text-center' style={styles.montserratRegular}>2. SIM</Text>
            <Text className='text-base text-green text-center' style={styles.montserratRegular}>3. KK</Text>
            <Text className='text-base text-green text-center' style={styles.montserratRegular}>4. STNK</Text>
          </View>
          <Text className='text-base text-green text-center' style={styles.montserratRegular}>We will verify your documents within 2x24 hours (working days)</Text>
          <CustomButton
            actionText="Check admin verification"
            bgColor='bg-green'
            textColor='text-white'
            handlePress={ 
              dummyUploadImage
            }
          />

          <View className='justify-center pt-2 flex-row gap-2'>
            
          </View>
          { snackbarVisible && 
            <Snackbar
              message="You are verified as ECOS partner. Let's start the trip." // Update message if needed
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

export default documentVerif