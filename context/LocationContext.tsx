import React, { useState, createContext } from 'react'
import { Region } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { LocationLib, EventAddress } from '../@types';
import { googleAPIkey } from '../constants/config'





export const LocationContext = createContext<LocationLib.UserLocation>(
    {
        userRegion:
        {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0
        },
        eventAddress: null,
        _getLocationAsync: () => {
            throw new Error('_getLocationAsync() not implemented');
        },
        getAddress: () => {
            throw new Error('getAddress() not implemented');
        }
    }
)

const LocationContextProvider = (props) => {
    const [userRegion, setUserRegion] = useState<Region | undefined>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const [eventAddress, setEventAddress] = useState<EventAddress>()

    const _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log('Permission to access location was denied')
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords
        const newUserRegion = {
            ...userRegion,
            latitude,
            longitude
        }
        setUserRegion(newUserRegion)
        return newUserRegion
    };


    const getAddress = (latitude: string, longitude: string) => {

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + googleAPIkey)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log('responseJson :', responseJson);
                let address
                if (responseJson.status === "ZERO_RESULTS") address = {
                    formatted: "No address found",
                    city: "",
                    country: ""
                }
                else {
                    const array = responseJson.results[0].address_components
                    address = {
                        formatted: responseJson.results[0].formatted_address,
                        city: array[array.length - 3].short_name,
                        country: array[array.length - 2].short_name
                    }
                }
                setEventAddress(address)

            })
    }
    return (
        <LocationContext.Provider value={{ userRegion, _getLocationAsync, getAddress, eventAddress }}>
            {props.children}
        </LocationContext.Provider>
    )
}

export default LocationContextProvider

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




