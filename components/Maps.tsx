import React from 'react';
import MapView from 'react-native-maps';
import { View } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';

const Maps = () => {
  return (
    <View>
      <MapView 
        className='w-full h-full'
        provider={PROVIDER_GOOGLE}
      />
    </View>
  )
}

export default Maps
