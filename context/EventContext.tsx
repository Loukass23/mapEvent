import React, { useState, createContext, useContext } from 'react'
import { EventLib, LocationLib } from '../@types/index'
import gql from 'graphql-tag';
import { graphql, useQuery } from 'react-apollo';
import { queryAllEvents, queryEventsByRadius } from './queries';
import { LocationContext } from './LocationContext';
import { serverURL } from '../constants/config';

// var fetch = require('graphql-fetch')('https://sleepy-caverns-71410.herokuapp.com/graphql')


const eventList = [
    {
        "id": "5de516da4f3ffc07a2301246",
        "category": "Test",
        "title": "Dropped Collection, weil, ging nicht",
        "geometry": {
            "coordinates": [
                45.943,
                -29.43
            ]
        }
    },
    {
        "id": "5de519e8adbd9b088e615339",
        "category": "Test",
        "title": "Now it might work...",
        "geometry": {
            "coordinates": [
                31.943,
                35.43
            ]
        }
    },
    {
        "id": "5de51a82251ce808cb5fb33e",
        "category": "Test",
        "title": "Still working, I hope...",
        "geometry": {
            "coordinates": [
                30.943,
                36.1345323
            ]
        }
    }
]



const event1: EventLib.Event = {
    id: 1,
    geometry: {
        type: "Point",
        coordinates: [-121.3, 37.423]
    },
    properties: {},
    type: '',
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
    properties: {},

    type: '',
    title: 'test',
    category: 'test',
}

const initEvents: EventLib.EventContextInterface = {
    events: [event1, event2],
    getAllEvents: () => {
        throw new Error('getAllEvents() not implemented');
    },
    getEventsByRadius: () => {
        throw new Error('queryEventsByRadius() not implemented');
    },
    loading: false,
    newEvent: null,
    radius: 100,
    handleSetRadius: () => {
        throw new Error('handleSetRadius() not implemented');
    },
}

export const EventContext = createContext<EventLib.EventContextInterface>(initEvents)



const EventContextProvider = (props: { children: React.ReactNode; }) => {
    const { userRegion, _getLocationAsync } = useContext<LocationLib.UserLocation>(LocationContext)
    const [events, setEvents] = useState<EventLib.EventList>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [radius, setRadius] = useState<number>(100)

    const [newEvent, setNewEvent] = useState<EventLib.Event>()

    const handleSetRadius = (radius: number) => {
        setRadius(radius)
        getEventsByRadius()
    }
    const fetchEvents = async (query: string) => {
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query
            })
        };
        setLoading(true)

        const res = await fetch(serverURL, options)
        const data = await res.json()

        console.log('data :', data);
        if (data.error) console.log('data.error :', data.error);
        else return data.data

    }

    const getEventsByRadius = async () => {
        console.log('user :', userRegion);
        const { latitude, longitude } = userRegion
        const query = queryEventsByRadius(radius, longitude, latitude, "Meet")
        const data = await fetchEvents(query)

        setLoading(false)
        const { eventsInRadius } = data
        setEvents(eventsInRadius);
        // setEvents([...events, ...eventsInRadius]);

    }


    const getAllEvents = async () => {

        const query = queryAllEvents()
        const data = await fetchEvents(query)

        setLoading(false)
        const { events } = data
        console.log('events :', events);
        setEvents(events);

        //         const mapEvents = events.map(event => {
        //             return {
        //                 ...event,
        //                 properties: "",
        //             }

        //         })
        //         // console.log('mapEvents :', mapEvents);
        //         setLoading(false)
        //         setEvents(mapEvents);
        //     }
        //     else if (data.eventsInRadius) {
        //         const { eventsInRadius } = data.data
        //         setLoading(false)
        //         setEvents(eventsInRadius);
        //     }
        // })
    }

    //     const { loading, error, data } = useQuery(GET_EVENTS);

    //     if (loading) return null;
    //     if (error) return `Error! ${error}`;
    //     console.log('loading :', loading);
    //     console.log('data :', data);
    //     if (data) {
    //         const { events } = data
    //         setEvents(events)
    //         // return events
    //         console.log('eventsContext :', events);
    //     }
    // }

    return (
        <EventContext.Provider value={{ events, getAllEvents, loading, newEvent, getEventsByRadius, radius, handleSetRadius }}>
            {props.children}
        </EventContext.Provider>
    )
}
export default EventContextProvider