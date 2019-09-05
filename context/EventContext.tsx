import React, { useState, createContext } from 'react'
import { LatLng, Region } from 'react-native-maps';


export type Event = {
    position: Region,
    title: string,
    body?: string,
    img?: string
};

export type EventContext = {
    events: Array<Event>
}
export const EventContext = createContext<EventContext>(null)

const EventContextProvider = (props) => {
    const [events, setEvents] = useState([
        {
            position: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            }, title: 'My first event'
        },
        {
            position: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            }, title: 'Another event'
        },
    ])
    return (
        <EventContext.Provider value={{ events }}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContextProvider