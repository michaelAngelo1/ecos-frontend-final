import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { styles } from '../config/Fonts';
import { decode } from '@googlemaps/polyline-codec';

type Coordinate = {
  latitude: number;
  longitude: number;
};

const testLiveTrack = () => {

  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [preciseAddress, setPreciseAddress] = useState('');

  const [coordinate, setCoordinate] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [destCoordinate, setDestCoordinate] = useState({
    latitude: -6.3257,
    longitude: 106.99079,
  })

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

  // DATA FOR ROUTES API
  const data = {
    origin: {
      location: {
        latLng: coordinate
      },
    },
    destination: {
      location: {
        latLng: destCoordinate
      },
    },
    travelMode: 'DRIVE',
    routingPreference: 'TRAFFIC_AWARE',
    computeAlternativeRoutes: false,
    routeModifiers: {
      avoidTolls: false,
      avoidHighways: false,
      avoidFerries: false,
    },
    languageCode: 'en-US',
    units: 'IMPERIAL',
  };

  const apiKey = 'AIzaSyA7LQ6RG8Nc1D3Hkrs0bNMROKUhSpbvPfI';
  const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
  };

  const [decodedPolyline, setDecodedPolyline] = useState<Coordinate[]>([]);
  const [polyline, setPolyline] = useState('');
  const getPolyline = async () => {
    try {
      const response = await axios.post(url, data, {headers});
      const encodedPolyline = response.data.routes[0].polyline.encodedPolyline;
      setPolyline(encodedPolyline);
      const decodedPath = decode(encodedPolyline);
      setDecodedPolyline(decodedPath.map(([lat, lng]) => ({ latitude: lat, longitude: lng })));
    } catch (e) {
      console.log('error get polyline: ', e.response);
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
  }, [coordinate]);

  useEffect(() => {
    getPolyline();
  }, [coordinate, destCoordinate]);

  useEffect(() => {
    const decodedCoords = decode(polyline, 5); // Decode the polyline
    setDecodedPolyline(decodedCoords);
  }, []);


  
  return (
    <SafeAreaView className='bg-white'>
      <View className='w-full h-full'>
        {
          latitude !== null && longitude !== null && (
            <MapView
              className='w-full h-4/5'
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
              <Marker
                pinColor='blue'
                coordinate={destCoordinate}
                onDragEnd={(e) => {
                  setDestCoordinate(e.nativeEvent.coordinate);
                  console.log('New coordinates:', e.nativeEvent.coordinate);
                }}
              />
              {decodedPolyline.length > 0 && (
                <Polyline
                  coordinates={decodedPolyline}
                  strokeColor="blue"
                  strokeWidth={3}
                />
              )}
            </MapView>
          )
        }
        <View className='flex flex-col w-full p-3'>
          <Text className='text-sm' style={styles.montserratMedium}>Address: </Text>
          <Text className='text-sm' style={styles.montserratRegular}>{coordinate.latitude}</Text>
          <Text className='text-sm' style={styles.montserratRegular}>{coordinate.longitude}</Text>

          <Text className='text-sm' style={styles.montserratMedium}>Dest Address: </Text>
          <Text className='text-sm' style={styles.montserratRegular}>{destCoordinate.latitude}</Text>
          <Text className='text-sm' style={styles.montserratRegular}>{destCoordinate.longitude}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default testLiveTrack