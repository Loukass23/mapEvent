import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from './screens/MapScreen';
import { MyCard } from './components/MyCard';



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
        <MapScreen />
      </View>
    );
}



// return (
//   <View style={styles.container}>
//     {/* <MyCard Title="Hello" Body="My beautifull card" Img="https://res.cloudinary.com/ds3w3iwbk/image/upload/v1560349735/MERN/20131227_134911.jpg" /> */}
//     {/* <Hello name={'Lucas'} enthusiasmLevel={3} /> */}
//     <MapScreen />
//   </View>
// );




const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
