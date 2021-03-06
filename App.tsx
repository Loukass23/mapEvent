import React, { FC, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import LocationContextProvider from './context/LocationContext'
import EventContextProvider from './context/EventContext'
import AppContainer from './AppContainer';
// import { AppRegistry } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import AuthContextProvider from './context/AuthContext';
import { firebaseConfig } from './constants/config';
import firebase from 'firebase';


// const link = new HttpLink({ uri: 'http://localhost:5000/graphq' });
// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link,
// });




const App: FC = () => {
  const [isReady, setIsReady] = useState<Boolean | undefined>(false);


  const _cacheResourcesAsync = async () => {
    firebase.initializeApp(firebaseConfig);
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
        {/* <ApolloProvider client={client}> */}
        <StatusBar backgroundColor="blue" hidden={true} barStyle="dark-content" />
        <AuthContextProvider>
          <LocationContextProvider>
            <EventContextProvider>
              <AppContainer />
            </EventContextProvider>
          </LocationContextProvider>
        </AuthContextProvider>
        {/* </ApolloProvider> */}
      </View>
    );
}

// AppRegistry.registerComponent('MapEvent', () => App);

export default App


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
    //flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});


