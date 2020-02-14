export const markerImages = {
    Meet: require('../assets/images/Marker1.png'),
    POI: require('../assets/images/Marker2.png'),
    Party: require('../assets/images/Marker3.png'),
    Check: require('../assets/images/Marker4.png'),
    Other: require('../assets/images/Marker5.png'),
    Add: require('../assets/images/AddMarker.png'),

};

export const markers = Object.keys(markerImages).map(key => {
    return {
        name: key,
        image: markerImages[key]
    }
})
