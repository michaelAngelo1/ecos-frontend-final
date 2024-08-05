import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Maps from '@/components/Maps'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../config/Fonts';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import useGetToken from '@/hooks/useGetToken';
import useGetUserData from '@/hooks/useGetUserData';

const pinpointAddress = () => {

  const { token } = useGetToken();
  const { role } = useGetUserData(token);

  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [preciseAddress, setPreciseAddress] = useState('');

  const [coordinate, setCoordinate] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const getGeocodedAddress = async () => {
    try {
      console.log('LATITUDE: ', latitude);
      console.log('LONGITUDE: ', longitude);
      // const response = await reverseGeocodeInstance(latitude!, longitude!).get('',);
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=AIzaSyA7LQ6RG8Nc1D3Hkrs0bNMROKUhSpbvPfI`);
      console.log('geocoded address response: ', response.data.results[0].formatted_address);
      setPreciseAddress(response.data.results[0].formatted_address);
    } catch (e) {
      console.log('error reverseE geocoding: ', e.response);
    } 
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission for location denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLongitude(location.coords.longitude);
      setLatitude(location.coords.latitude);
      setCoordinate({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      getGeocodedAddress();
    })();
  }, []);

  useEffect(() => {
    getGeocodedAddress();
  }, [coordinate])

  return (
    <SafeAreaView className='bg-white'>
      <View className='w-full h-full'>
        {
          latitude !== null && longitude !== null && (
            <MapView
              className='w-full h-2/3'
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                longitudeDelta: 0.0922,
                latitudeDelta: 0.0421,
              }}
            >
              <Marker
                draggable
                coordinate={coordinate}
                onDragEnd={(e) => {
                  setCoordinate(e.nativeEvent.coordinate);
                  console.log('New coordinates:', e.nativeEvent.coordinate);
                }}
              />
            </MapView>
          )
        }
        <View className='flex flex-col w-full h-28 p-3 space-y-2'>
          <Text className='text-sm' style={styles.montserratMedium}>Use two fingers to zoom. Press and hold the location marker and drag around to correct your location.</Text>
          <Text className='text-sm' style={styles.montserratMedium}>Address: </Text>
          <Text className='text-sm' style={styles.montserratRegular}>{preciseAddress}</Text>
          <CustomButton
            bgColor='bg-green'
            textColor='text-white'
            handlePress={() => 
              router.replace({
                pathname: '/signUpCustomer',
                params:{
                  preciseAddress: preciseAddress
                }
              })
            }
            actionText='Set address'
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default pinpointAddress