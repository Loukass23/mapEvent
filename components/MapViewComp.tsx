import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Button } from 'react-native';
import MapView, { Region, Marker, Callout } from 'react-native-maps';
import { LocationContext } from '../context/LocationContext'
import { EventContext, Event } from '../context/EventContext'
import { MarkerContext, MarkerType } from '../context/MarkerContext'
import ClusterMarker from '../components/clusters/ClusterMarker';
import { getCluster } from '../components/clusters/MapUtils';
import { markerImages } from '../constants/Markers';
import Colors from '../constants/Colors';
import { MarkerDetails } from './events/MarkerDetails';
const { width, height } = Dimensions.get('window');

const MapViewComp = () => {
    const { userRegion, _getLocationAsync } = useContext<LocationContext>(LocationContext)
    const { marker, handleSetMarker } = useContext<MarkerType>(MarkerContext)
    const events = useContext(EventContext)


    useEffect(() => { _getLocationAsync() }, []);
    useEffect(() => { setRegion(userRegion) }, [userRegion]);


    const [hackHeight, setHackHeight] = useState<number | undefined>(height);
    const showsMyLocationButtonWorkaroudFix = () => {
        setTimeout(() => setHackHeight(height + 1), 1500);
        setTimeout(() => setHackHeight(height - 1), 2000);
    }

    const [region, setRegion] = useState<Region | undefined>(userRegion);
    console.log('userRegion :', userRegion);
    console.log('events :', events);

    const [myMarker, setMyMarker] = useState<Event | undefined>(null)
    useEffect(() => { console.log('myMarker :', myMarker) }, [myMarker]);


    const cluster = getCluster(events, region);

    const renderMarker = (marker: Event, index: number) => {

        // const [marketDetails, setMarketDetails] = useState<Event | undefined>();
        // const { handleSetMarker } = useContext<MarkerType>(MarkerContext)


        console.log('marker', marker)
        const key = index + marker.geometry.coordinates[0];
        // If a cluster
        if (marker.properties) {
            return (
                <Marker
                    key={key}
                    coordinate={{
                        latitude: marker.geometry.coordinates[1],
                        longitude: marker.geometry.coordinates[0]
                    }}
                >
                    <ClusterMarker count={marker.properties.point_count} />
                </Marker>
            );
        }
        // If a single marker
        return (
            <Marker
                key={key}
                style={{
                    width: 100,
                    height: 100,
                }}
                image={markerImages[marker.category]}
                coordinate={{
                    latitude: marker.geometry.coordinates[1],
                    longitude: marker.geometry.coordinates[0]
                }}
                title={marker.category}
                description={marker.body}
            >

                <Callout
                    onPress={() => setMyMarker(marker)}
                >
                    <View >
                        <Text style={styles.makerTitle}>
                            {marker.category}</Text>
                        <Text style={styles.makerText}> {marker.title}</Text>
                    </View>
                </Callout>
            </Marker>
        );
    };
    if (myMarker == null)
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
                >
                    {cluster.markers.map((marker, index) => renderMarker(marker, index))}
                </MapView>
            </View>
        )
    else return (
        <View style={styles.map}>
            <Text>Hello</Text>
            <Button
                title={'back'}
                onPress={() => setMyMarker(null)}
            />
            <MarkerDetails title={myMarker.title} id={1} category='test' geometry={null} />
        </View>
    )


}
export default MapViewComp
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    makerTitle: {
        fontSize: 12,
        color: Colors.secondary,
        lineHeight: 20,
        textAlign: 'center',
    },
    makerText: {
        fontSize: 12,
        lineHeight: 20,
        textAlign: 'center',
    }
})