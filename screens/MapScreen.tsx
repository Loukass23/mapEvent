import React, { useState, useContext, useEffect, FC } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import MapView, { Region, Marker, Callout, MapEvent } from 'react-native-maps';
import { LocationContext } from '../context/LocationContext'
import { EventContext, } from '../context/EventContext'
import { EventLib, LocationLib, ViewLayoutEvent } from '../index'
import ClusterMarker from '../components/clusters/ClusterMarker';
import { getCluster } from '../components/clusters/MapUtils';
import { markerImages } from '../constants/Markers';
import Colors from '../constants/Colors';
import { MarkerDetails } from '../components/events/MarkerDetails';
import { pick } from 'lodash';
import { Button, Icon } from 'react-native-elements';
import MenuButton from '../components/navigation/MenuButton';
import { Ionicons } from '@expo/vector-icons';
import { Navigation } from 'react-navigation-drawer/lib/typescript/types';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
} from 'react-navigation';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}




const { width, height } = Dimensions.get('window');
// interface Props {
//     navigation: Navigation
// }
const MapScreen: FC<Props> = ({ navigation }) => {
    const { userRegion, _getLocationAsync } = useContext<LocationLib.UserLocation>(LocationContext)
    const events = useContext(EventContext)

    const { } = navigation;
    console.log('navigation :', navigation);


    useEffect(() => { _getLocationAsync() }, []);
    useEffect(() => { setRegion(userRegion) }, [userRegion]);


    const [hackHeight, setHackHeight] = useState<number | undefined>(height);
    const showsMyLocationButtonWorkaroudFix = () => {
        setTimeout(() => setHackHeight(height + 1), 500);
        setTimeout(() => setHackHeight(height - 1), 1000);
    }

    const [region, setRegion] = useState<Region | undefined>(userRegion);
    // console.log('userRegion :', userRegion);
    // console.log('events :', events);
    // console.log('region', region)

    const [marker, setMarker] = useState<EventLib.Event | undefined>(null)
    useEffect(() => { console.log('myMarker :', marker) }, [marker]);


    const [poi, setPoi] = useState<MapEvent | any>(null);


    const cluster = getCluster(events, region);

    const renderPoi = () => (

        <Marker coordinate={poi.coordinate}
        >
            <Callout
                onPress={() => navigation.navigate('Event')}
            // onPress={() => this.poiClick(poi)}
            >
                <View style={styles.flexAlign}>
                    <Text>Add Event</Text>
                    <Ionicons

                        name='md-add'
                        color='grey'
                        size={32}

                    />

                    {/* <Text>Name: {this.state.poi.name}</Text> */}
                </View>
            </Callout>
        </Marker>
    )


    const renderMarker = (marker: EventLib.Event, index: number) => {
        const key = index + marker.geometry.coordinates[0];
        // If a cluster
        if (marker.properties) {
            const latitude = marker.geometry.coordinates[1]
            const longitude = marker.geometry.coordinates[0]
            const { longitudeDelta, latitudeDelta } = region
            const longitudeDeltaZoom = longitudeDelta - 1
            const latitudeDeltaZoom = latitudeDelta - 1
            return (
                <Marker
                    onPress={() => setRegion({ latitude, longitude, latitudeDelta: latitudeDeltaZoom, longitudeDelta: longitudeDeltaZoom })}
                    key={key}
                    coordinate={{
                        latitude,
                        longitude
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
                    onPress={() => setMarker(marker)}
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
    if (marker == null)
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
                    onLongPress={(e) => setPoi(e.nativeEvent)}
                    onPress={() => setPoi(null)}
                >
                    {cluster.markers.map((marker, index) => renderMarker(marker, index))}
                    {poi && renderPoi()}
                </MapView>

                <MenuButton navigation={navigation} />
            </View>
        )
    else return (
        <View style={styles.eventDetails}>

            <TouchableHighlight
                onPress={() => setMarker(null)}
                style={styles.backButton}
            >
                <Ionicons
                    style={styles.backButton}
                    name='md-arrow-back'
                    color='grey'
                    size={32}

                />
                {/* <Icon name="md-arrow-back"
                    type='ionicons'
                    color="grey" /> */}
            </TouchableHighlight>

            {/* <Button
                title={'back'}
                onPress={() => setMarker(null)}
            /> */}
            <MarkerDetails {...pick(marker, 'id', 'title', 'category', 'body', 'geometry', 'img')} />
        </View>
    )


}
export default MapScreen
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    eventDetails: {
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
    },
    flexAlign: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        left: 10,
        // zIndex: 1,
        // backgroundColor: 'black',
        // position: 'absolute',//use absolute position to show button on top of the map
        // top: 10, //for center align
        // left: 10,
        // width: 40,
        height: 25,
        // alignSelf: 'flex-start',
        // borderRadius: 3,


    }
})