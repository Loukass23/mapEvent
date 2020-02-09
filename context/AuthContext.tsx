import React, { useState, createContext, useEffect } from 'react'
import { Region } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { UserLib } from '../@types';
import { serverURL } from '../constants/config'
import { mutationLogIn, mutationRegister } from './queries';

import * as  SecureStore from 'expo-secure-store'




const initAuth: UserLib.AuthContextInterface = {

    logIn: (email: string, pwd: string) => {
        throw new Error('logIn() not implemented');
    },
    register: (avatar: string, email: string, username: string, firstName: string, lastName: string, pwd: string) => {
        throw new Error('register() not implemented');
    },
    signOut: () => {
        throw new Error('signOut() not implemented');
    },
    handleSetUser: (user: UserLib.User) => {
        throw new Error('handleSetUser() not implemented');
    },
    user: null

}

export const AuthContext = createContext<UserLib.AuthContextInterface>(initAuth)

type Props = {
    children: React.ReactNode;
}

const AuthContextProvider = ({ children, navigation }) => {

    const [user, setUser] = useState<UserLib.User>()
    useEffect(() => {
        getStorageToken()

    }, [])

    const logIn = async (email: string, pwd: string) => {
        const query = mutationLogIn(email, pwd)
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query
            })
        };
        const res = await fetch(serverURL, options)
        const data = await res.json()
        if (data.error) console.log('data.error :', data.error);
        else {
            const user = data.data.login
            setUser(user)
            setStorageToken(user)
        }

    }
    const register = async (avatar: string, email: string, username: string, firstName: string, lastName: string, pwd: string) => {
        const query = mutationRegister(avatar, email, username, firstName, lastName, pwd)
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query
            })
        };
        const res = await fetch(serverURL, options)
        const data = await res.json()
        if (data.error) console.log('data.error :', data.error);
        else {
            console.log('data :', data);
            const user = {
                avatar,
                email,
                username,
                firstName,
                lastName,
                token: data.data.signup
            }
            setUser(user)
            setStorageToken(user)
            navigation.navigate('Profile')
        }

    }

    const getStorageToken = async () => {

        try {
            const email = await SecureStore.getItemAsync('email');
            const username = await SecureStore.getItemAsync('username');
            const firstName = await SecureStore.getItemAsync('firstName');
            const lastName = await SecureStore.getItemAsync('lastName');
            const token = await SecureStore.getItemAsync('token');
            const avatar = await SecureStore.getItemAsync('avaatar');
            const date = await SecureStore.getItemAsync('timestamp');

            if (email && username && firstName && lastName && token && avatar)
                setUser({ email, username, firstName, lastName, token, avatar })

            console.log('user :', user);
            // const now = new Date()
            // const dateToken = new Date(date)
            // const ageTokenMinutes = (now - dateToken) / 60000;
            // console.log('Age Token (min):', ageTokenMinutes);
            // if (ageTokenMinutes <= 60) {
            //     if (username && token) {

            //         username,
            //             token

            //     }
            //     else {
            //         removeStorageToken()
            //         console.log('Token too old');
            //     }


        } catch (e) {
            console.log('No token found', e)
        }

    }

    const setStorageToken = async (user: UserLib.User) => {
        console.log('user', user)
        const date = new Date()
        try {

            await SecureStore.setItemAsync('email', user.email);
            await SecureStore.setItemAsync('firstName', user.firstName);
            await SecureStore.setItemAsync('lastName', user.lastName);
            await SecureStore.setItemAsync('token', user.token);
            await SecureStore.setItemAsync('username', user.username);
            await SecureStore.setItemAsync('avatar', user.avatar);
            await SecureStore.setItemAsync('timestamp', date.toISOString());
        } catch (e) {
            console.log('failed to set storage token', e);
        }

        console.log('set storage token')
    }

    const handleSetUser = (user: UserLib.User) => {
        setUser(user)
    }
    const signOut = async () => {

        try {

            await SecureStore.deleteItemAsync('email');
            await SecureStore.deleteItemAsync('firstName');
            await SecureStore.deleteItemAsync('lastName');
            await SecureStore.deleteItemAsync('token');
            await SecureStore.deleteItemAsync('username');
            await SecureStore.deleteItemAsync('timestamp');
            await SecureStore.deleteItemAsync('avatar');
            setUser(null)
        } catch (e) {
            console.log('failed to delete storage token', e);
        }

        console.log('deleted storage token')
    }
    return (
        <AuthContext.Provider value={{ user, logIn, register, signOut, handleSetUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

// export function getLocation() {
//     return async dispatch => {
//         let { status } = await Permissions.askAsync(Permissions.LOCATION);
//         if (status !== 'granted') {
//             console.log('Permission to access location was denied');

//         } else {
//             console.log('Permission to access location was granted');
//         }

//         let location = await Location.getCurrentPositionAsync({})
//         if (location) {
//             const region = {
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//                 latitudeDelta: 1,
//                 longitudeDelta: 1

//             }

//         }
//     }
// }

// export const getAddress = (region, type) => {
//     return (dispatch) => {
//         fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + region.latitude + ',' + region.longitude + '&key=' + googleAPIkey)
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 const array = responseJson.results[0].address_components
//                 const address = {
//                     formatted: responseJson.results[0].formatted_address,
//                     city: array[array.length - 3].short_name,
//                     country: array[array.length - 2].short_name
//                 }
//                 if (type === 'user') {
//                     dispatch({
//                         type: SET_ADDRESS,
//                         payload: address
//                     })
//                 }
//                 else {
//                     dispatch({
//                         type: SET_POI_ADDRESS,
//                         payload: address
//                     })
//                 }

//             })
//     }
// }




