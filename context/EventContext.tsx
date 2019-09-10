import React, { useState, createContext } from 'react'
import { EventLib } from '../index'



const event1: EventLib.Event = {
    id: 1,
    geometry: {
        type: "Point",
        coordinates: [-121.3, 37.423]
    },

    title: 'Come Meet Us',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ipsum, porttitor sed molestie eget, molestie sed eros. Aliquam euismod mauris sit amet neque lobortis aliquet.',
    category: 'Meet',
    img: 'https://res.cloudinary.com/ds3w3iwbk/image/upload/v1560349630/MERN/20170409_193026.jpg'
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