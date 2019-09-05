import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from './screens/MapScreen';
import LocationContextProvider from './context/LocationContext'
import EventContextProvider from './context/EventContext'
import { LocationContext } from './context/LocationContext'




export default function App() {
  const [isReady, setIsReady] = useState<Boolean | undefined>(false);


  const _cacheResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        require('./assets/images/introAnimationLQ.mp4'),
        require('./assets/images/logoTemp.png'),
      ]),
      Font.loadAsync({
        // import font from theme
        ...Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);

  }
  if (!isReady) {
    console.log('isReady', isReady)
    return (
      <AppLoading
        startAsync={_cacheResourcesAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
  else
    return (
      <View style={styles.container}>
        <LocationContextProvider>
          <EventContextProvider>
            <MapScreen />
          </EventContextProvider>
        </LocationContextProvider>
      </View>
    );
}



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
    //flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
