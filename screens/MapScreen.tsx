import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import { LocationContext } from '../context/LocationContext'

const { width, height } = Dimensions.get('window');


const MapScreen = () => {




    const { userRegion, _getLocationAsync } = useContext<LocationContext>(LocationContext)
    useEffect(() => {
        // _getLocationAsync()
    }, [userRegion]);


    const [hackHeight, setHackHeight] = useState<number | undefined>(height);
    const showsMyLocationButtonWorkaroudFix = () => {
        setTimeout(() => setHackHeight(height + 1), 1500);
        setTimeout(() => setHackHeight(height - 1), 2000);
    }

    const [region, setRegion] = useState<Region | undefined>(userRegion);
    console.log('region :', userRegion);
    return (
        <View style={{ paddingBottom: hackHeight }}>
            <MapView
                //initialRegion={region}
                onMapReady={showsMyLocationButtonWorkaroudFix}
                showsMyLocationButton={true}
                showsUserLocation={true}
                style={styles.map}
                region={region}
                onRegionChangeComplete={region => setRegion(region)}

            />
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})