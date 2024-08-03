import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { styles } from '@/app/config/Fonts';
import axios from 'axios';

const Maps = () => {
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
    <View>
      {
        longitude !== null && latitude !== null && (
          <MapView
            className="w-full h-full"
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
    </View>
  );
};

export default Maps;
