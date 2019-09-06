import { Dimensions } from 'react-native';
import supercluster from 'supercluster';
import { Region } from 'react-native-maps';
import { EventContext, EventList } from '../../context/EventContext';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export const getRegion = (latitude: number, longitude: number, latitudeDelta: number) => {
    const LONGITUDE_DELTA = latitudeDelta * ASPECT_RATIO;

    return {
        latitude: <number>latitude,
        longitude: <number>longitude,
        latitudeDelta: <number>latitudeDelta,
        longitudeDelta: <number>LONGITUDE_DELTA,
    };
}

export const getCluster = (events: any, region: Region) => {
    const cluster = new supercluster({
        radius: 50,
        maxZoom: 16,
    });

    let markers = [];

    try {
        const padding = 0;
        cluster.load(events);

        markers = cluster.getClusters(
            [
                region.longitude - (region.longitudeDelta * (0.5 + padding)),
                region.latitude - (region.latitudeDelta * (0.5 + padding)),
                region.longitude + (region.longitudeDelta * (0.5 + padding)),
                region.latitude + (region.latitudeDelta * (0.5 + padding)),
            ],
            getZoomLevel(region.longitudeDelta)
        );
    }
    catch (e) {
        console.debug('failed to create cluster', e);
    }
    return {
        markers,
        cluster
    };
}

const getZoomLevel = (longitudeDelta: number) => {
    const angle = longitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
}
