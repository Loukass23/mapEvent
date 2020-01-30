import React, { useState, createContext } from 'react'
import { Region } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { UserLib } from '../@types';
import { googleAPIkey, serverURL } from '../constants/config'
import { mutationLogIn } from './queries';




const initAuth: UserLib.AuthContextInterface = {

    logIn: (email: string, pwd: string) => {
        throw new Error('logIn() not implemented');
    },
    user: null

}

export const AuthContext = createContext<UserLib.AuthContextInterface>(initAuth)



const AuthContextProvider = (props: { children: React.ReactNode; }) => {

    const [user, setUser] = useState<UserLib.User>()

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

        console.log('query :', query);

        const res = await fetch(serverURL, options)
        const data = await res.json()

        console.log('data :', data);
        if (data.error) console.log('data.error :', data.error);
        else setUser(data.data.login)

    }



    return (
        <AuthContext.Provider value={{ user, logIn }}>
            {props.children}
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




