import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../config/Fonts'
import { router, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import * as Location from 'expo-location';
import CustomButton from '@/components/CustomButton'
import { customerOrderHeaderInstance } from '../config/axiosConfig'

const locationDetail = () => {
  const { customer_address } = useLocalSearchParams();
  
  // LOCATION SERVICES
  const [currLocation, setCurrLocation] = useState<Location.LocationObject | null>(null);
  const [longitude, setLongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();
  const [preciseAddress, setPreciseAddress] = useState('');
  const [usePreciseAddress, setUsePreciseAddress] = useState('false');

  const getGeocodedAddress = async () => {
    try {
      console.log('LATITUDE: ', latitude);
      console.log('LONGITUDE: ', longitude);
      // const response = await reverseGeocodeInstance(latitude!, longitude!).get('',);
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA7LQ6RG8Nc1D3Hkrs0bNMROKUhSpbvPfI`);
      console.log('geocoded address response: ', response.data.results[0].formatted_address);
      setPreciseAddress(response.data.results[0].formatted_address);
    } catch (e) {
      console.log('error reverseE geocoding: ', e.response);
    } 
  }

  const handleUsePreciseAddress = () => {
    setUsePreciseAddress('true');
    router.push({
      pathname: "/home",
      params: {
        precise_address: preciseAddress,
        usePrecise: usePreciseAddress
      },
    })
  }

  // END LOCATION SERVICES
  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission for location denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log('Users current location: ', location);
      setLongitude(location.coords.longitude);
      setLatitude(location.coords.latitude);
      console.log('longitude disini: ', location.coords.longitude);
      console.log('latitude disini: ', location.coords.latitude);
      
    })();
    let originalAddr = customer_address;
    console.log('USEPRECISEADDR: ', usePreciseAddress);
  }, [])
  
  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <View className='flex flex-col px-4 py-4 items-center justify-center'>
        <Text className='text-base' style={styles.montserratBold}>Location Detail</Text>
        <Text>Current address: {customer_address}</Text>
        <Text>Precise address: {preciseAddress}</Text>
        <CustomButton
          actionText='Get precise location'
          bgColor='bg-blue'
          textColor='text-white'
          handlePress={getGeocodedAddress}
        />
        {
          preciseAddress.length > 0 &&
          <CustomButton
            actionText='Use precise location'
            bgColor='bg-white'
            textColor='text-blue'
            handlePress={handleUsePreciseAddress}
          />
        }
      </View>
    </SafeAreaView>
    
  )
}

export default locationDetail