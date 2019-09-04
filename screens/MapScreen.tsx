import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import MapView, { Region } from 'react-native-maps';

const { width, height } = Dimensions.get('window');


const MapScreen = () => {

    const [hackHeight, setHackHeight] = useState<number | undefined>(height);
    const showsMyLocationButtonWorkaroudFix = () => {
        setTimeout(() => setHackHeight(height + 1), 1500);
        setTimeout(() => setHackHeight(height - 1), 2000);
    }

    const [region, setRegion] = useState<Region | undefined>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    console.log('region :', region);
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