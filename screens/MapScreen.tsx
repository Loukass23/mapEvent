import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import MapView, { Region, Callout } from 'react-native-maps';
import { LocationContext } from '../context/LocationContext'
import { EventContext, EventList } from '../context/EventContext'
import ClusterMarker from '../components/clusters/ClusterMarker';
import { getCluster } from '../components/clusters/MapUtils';
import { markerImages } from '../constants/Markers';
import Colors from '../constants/Colors';
import { MarkerDetails } from '../components/events/MarkerDetails';
import MapViewComp from '../components/MapViewComp';
import { MarkerContext, MarkerType } from '../context/MarkerContext';

const { width, height } = Dimensions.get('window');


const MapScreen = () => {
    const { marker } = useContext<MarkerType>(MarkerContext)

    // if (marker == null)
    return <MapViewComp />
    // else MarkerDetails
}
//     const { userRegion, _getLocationAsync } = useContext<LocationContext>(LocationContext)
//     const events = useContext(EventContext)


//     useEffect(() => { _getLocationAsync() }, []);
//     useEffect(() => { setRegion(userRegion) }, [userRegion]);


//     const [hackHeight, setHackHeight] = useState<number | undefined>(height);
//     const showsMyLocationButtonWorkaroudFix = () => {
//         setTimeout(() => setHackHeight(height + 1), 1500);
//         setTimeout(() => setHackHeight(height - 1), 2000);
//     }

//     const [region, setRegion] = useState<Region | undefined>(userRegion);
//     console.log('userRegion :', userRegion);
//     console.log('events :', events);

//     const cluster = getCluster(events, region);

//     return (
//         <View style={{ paddingBottom: hackHeight }}>
//             <MapView
//                 //initialRegion={region}
//                 onMapReady={showsMyLocationButtonWorkaroudFix}
//                 showsMyLocationButton={true}
//                 showsUserLocation={true}
//                 style={styles.map}
//                 region={region}
//                 onRegionChangeComplete={region => setRegion(region)}
//             >
//                 {cluster.markers.map((marker, index) => renderMarker(marker, index))}
//             </MapView>
//         </View>
//     )

// }
// const handleMarketDetails = (marker: Event) => {
//     console.log('markerDetails', marker)
//     return <EventDetails marker={marker} />

// }

// const renderMarker = (marker: Event, index: number) => {

//     // const [marketDetails, setMarketDetails] = useState<Event | undefined>();


//     console.log('marker', marker)
//     const key = index + marker.geometry.coordinates[0];
//     // If a cluster
//     if (marker.properties) {
//         return (
//             <Marker
//                 key={key}
//                 coordinate={{
//                     latitude: marker.geometry.coordinates[1],
//                     longitude: marker.geometry.coordinates[0]
//                 }}
//             >
//                 <ClusterMarker count={marker.properties.point_count} />
//             </Marker>
//         );
//     }
//     // If a single marker
//     return (
//         <Marker
//             key={key}
//             style={{
//                 width: 100,
//                 height: 100,
//             }}
//             image={markerImages[marker.category]}
//             coordinate={{
//                 latitude: marker.geometry.coordinates[1],
//                 longitude: marker.geometry.coordinates[0]
//             }}
//             title={marker.category}
//         // description={marker.body}
//         >

//             <Callout
//                 onPress={() => handleMarketDetails(marker)}>
//                 <View >
//                     <Text style={styles.makerTitle}>
//                         {marker.category}</Text>
//                     <Text style={styles.makerText}> {marker.title}</Text>
//                 </View>
//             </Callout>
//         </Marker>
//     );
// };
export default MapScreen

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