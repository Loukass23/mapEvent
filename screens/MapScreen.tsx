import React, { useState, useContext, useEffect, FC } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Animated, Easing } from 'react-native';
import MapView, { Region, Marker, Callout, MapEvent, Circle } from 'react-native-maps';
import { LocationContext } from '../context/LocationContext'
import { EventContext, } from '../context/EventContext'
import { EventLib, LocationLib, ViewLayoutEvent } from '../@types/index'
import ClusterMarker from '../components/clusters/ClusterMarker';
import { getCluster } from '../components/clusters/MapUtils';
import { markerImages } from '../constants/Markers';
import Colors from '../constants/Colors';
import { MarkerDetails } from '../components/events/MarkerDetails';
import { pick } from 'lodash';
import MenuButton from '../components/navigation/MenuButton';
import { Ionicons } from '@expo/vector-icons';
import { Navigation } from 'react-navigation-drawer/lib/typescript/types';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
} from 'react-navigation';
import ApolloClient from 'apollo-client';
import { OnMapMessage } from '../components/events/OnMapMessage';



interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    client: ApolloClient<object>

}


const { width, height } = Dimensions.get('window');


const MapScreen: FC<Props> = ({ navigation }) => {

    const { userRegion, _getLocationAsync } = useContext<LocationLib.UserLocation>(LocationContext)
    const { events, getAllEvents, getEventsByRadius, loading, radius,
        handleSetMarker, marker } = useContext(EventContext)
    const [region, setRegion] = useState<Region | undefined>(userRegion);

    useEffect(() => {
        getEventsByRadius()
        setRegion(userRegion)
        // getAllEvents()
    }, [userRegion])
    useEffect(() => {
        // getEventsByRadius()
        setRegion(userRegion)

    }, [marker])



    const { } = navigation;


    const [hackHeight, setHackHeight] = useState<number | undefined>(height);
    const showsMyLocationButtonWorkaroudFix = () => {
        setTimeout(() => setHackHeight(height + 1), 500);
        setTimeout(() => setHackHeight(height - 1), 1000);
    }

    console.log('events :', events);

    // const [marker, setMarker] = useState<EventLib.Event | undefined>(null)
    useEffect(() => { console.log('myMarker :', marker) }, [marker]);


    const [poi, setPoi] = useState<MapEvent | any>(null);

    useEffect(() => { _getLocationAsync() }, []);
    //useEffect(() => { setRegion(userRegion) }, [userRegion]);


    const cluster = getCluster(events, region);

    const onAddEventPress = () => {
        //navigation.navigate('Event')
        const { latitude, longitude } = poi.coordinate
        handleSetMarker({
            geometry: { coordinates: [latitude, longitude], type: 'Point' },
            id: null,
            category: null,
            title: null,
            type: null,
            properties: {}
        })

    }

    const renderPoi = () => (

        <Marker coordinate={poi.coordinate}
            image={markerImages.Add}
        >
            <Callout
                onPress={() => onAddEventPress()}

            >

                <View style={styles.flexAlign}>
                    <Text>Add Event</Text>
                    <Ionicons
                        onPress={() => onAddEventPress()}
                        name='md-add'
                        color='grey'
                        size={32}
                    />
                </View>
            </Callout>
        </Marker>
    )


    const renderMarker = (marker: EventLib.Event, index: number) => {
        const key = marker.id
        // const key = index + marker.geometry.coordinates[0];
        // If a cluster
        if (marker.properties) {
            const latitude = marker.geometry.coordinates[1]
            const longitude = marker.geometry.coordinates[0]
            const { longitudeDelta, latitudeDelta } = region
            const longitudeDeltaZoom = longitudeDelta - 1
            const latitudeDeltaZoom = latitudeDelta - 1
            return (
                <Marker

                    style={styles.marker}
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
                    onPress={() => handleSetMarker(marker)}
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

    //Normal state, no marker


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
                    onPress={() => setPoi(null)}               >
                    {cluster.markers.map((marker, index) => renderMarker(marker, index))}
                    {poi && renderPoi()}
                    {userRegion &&
                        <Circle
                            center={{
                                latitude: userRegion.latitude,
                                longitude: userRegion.longitude
                            }}
                            radius={radius}
                            fillColor={Colors.radius}
                        />
                    }

                </MapView>

                <View style={styles.loading}>
                    {loading ? <OnMapMessage message={"Loading Events"} /> :
                        < OnMapMessage message={`${events.length} found`} />
                    }
                </View>



                <MenuButton navigation={navigation} />
            </View>
        )
    else return (
        <View style={styles.eventDetails}>
            <TouchableHighlight
                onPress={() => handleSetMarker(null)}
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
            <MarkerDetails {...pick(marker, 'properties', 'type', 'id', 'title', 'category', 'body', 'geometry', 'img', 'address')} />
        </View>
    )


}
// export default graphql(getAllEvents)(MapScreen)
export default MapScreen

const FadeInView = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 100,
            easing: Easing.back(1),
            duration: 2000,
        }).start();
    }, [])

    return (
        <Animated.View                 // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim,         // Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    );
}
const JumpAnimation = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

    console.log('fadeAnim :', fadeAnim);

    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 100,
                duration: 1000,
            }
        ).start();
    }, [])

    return (

        <Animated.View
            style={{
                ...props.style,
                transform: [
                    { translateY: fadeAnim },

                    { perspective: 1000 }, // without this line this Animation will not render on Android while working fine on iOS
                ],
            }}
        />
    );
}
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    eventDetails: {
        ...StyleSheet.absoluteFillObject,

    },
    marker: {

    },

    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
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