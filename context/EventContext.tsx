import React, { useState, createContext } from 'react'
import { LatLng } from 'react-native-maps';

export type Event = {
    id: number,
    category: string,
    // coordinates: LatLng,
    geometry: {
        coordinates: Array<number | number>,
    },
    title: string,
    body?: string,
    img?: string,
    property?: any

}
// interface Event extends Partial<GeoJSON.Point> {
//     type: any,
//     coordinates: Array<number>,
//     id: number,
//     category: string,
//     ///coordinates: LatLng,
//     // geometry: {
//     //     coordinates: Array<number | number>,
//     // },
//     title: string,
//     body?: string,
//     img?: string,
// }
// export type EventList = {
//     events: Array<Event>,
//     //events: GeoJSON.Feature<Event>,

// }
// export type EventList = GeoJSON.Feature<Event>


export type EventList = Array<Event>

export const EventContext = createContext<EventList>(null)

const EventContextProvider = (props) => {
    const [markerDetails, setMarkerDetails] = useState<Event>()

    const [events, setEvents] = useState<EventList>([
        {
            id: 1,
            // coordinates: {
            //     latitude: 37.421,
            //     longitude: -121.0,
            // }
            geometry: {
                coordinates: [-121.0, 37.421],
            }
            ,
            title: 'My first event',
            category: 'Social',
        },
        {
            id: 2,
            geometry: {
                coordinates: [-121.3, 37.423],
            }
            // coordinates: {
            //     latitude: 37.423,
            //     longitude: -121.3,

            // }
            , title: 'Another event',
            category: 'Market',
        },
    ])
    return (
        <EventContext.Provider value={events}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContextProvider