import React, { useState, createContext } from 'react'
import { EventLib } from '../index'



const event1: EventLib.Event = {
    id: 1,
    geometry: {
        type: "Point",
        coordinates: [-121.3, 37.423]
    },

    title: 'test',
    category: 'test'
}
const event2: EventLib.Event = {
    id: 1,
    geometry: {
        type: "Point",
        coordinates: [-121.2, 37.421]
    },
    title: 'test',
    category: 'test',
}


export const EventContext = createContext<EventLib.EventList>(null)

const EventContextProvider = (props) => {

    const [events, setEvents] = useState<EventLib.EventList>([
        event1, event2])
    return (
        <EventContext.Provider value={events}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContextProvider