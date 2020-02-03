import React, { useState, createContext, useContext } from 'react'
import { EventLib, LocationLib } from '../@types/index'
import { queryAllEvents, queryEventsByRadius, createEvent } from './queries';
import { LocationContext } from './LocationContext';
import { serverURL } from '../constants/config';
import { AuthContext } from './AuthContext';





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
    radius: 100,
    handleSetRadius: () => {
        throw new Error('handleSetRadius() not implemented');
    },
    marker: null,
    handleSetMarker: (marker: EventLib.Event) => {
        throw new Error('setMarker() not implemented');
    },
    handleEventCUD: (type: string) => {
        throw new Error('handleEventCUD() not implemented');
    },
}

export const EventContext = createContext<EventLib.EventContextInterface>(initEvents)



const EventContextProvider = (props: { children: React.ReactNode; }) => {
    const { userRegion, _getLocationAsync } = useContext<LocationLib.UserLocation>(LocationContext)
    const { user } = useContext(AuthContext)
    const [events, setEvents] = useState<EventLib.EventList>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [radius, setRadius] = useState<number>(100000)

    const [marker, setMarker] = useState<EventLib.Event>()

    const handleSetRadius = (radius: number) => {
        setRadius(radius)
        getEventsByRadius()
    }
    const fetchEvents = async (query: string, headers) => {
        const options = {
            method: "post",
            headers,
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

    const handleEventCUD = async (type: string) => {
        console.log('type :', type);
        if (user) {
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
            switch (type) {
                case 'create': {
                    const query = createEvent(marker)
                    const data = await fetchEvents(query, headers)
                }
            }
        }
    }
    const getEventsByRadius = async () => {
        const { latitude, longitude } = userRegion
        const headers = {
            "Content-Type": "application/json"
        }
        const query = queryEventsByRadius(radius, longitude, latitude)
        const data = await fetchEvents(query, headers)

        setLoading(false)
        const { eventsInRadius } = data
        setEvents(eventsInRadius);
        // setEvents([...events, ...eventsInRadius]);

    }

    const handleSetMarker = (marker: EventLib.Event) => {
        setMarker(marker)

    }
    // const handleSetMarker = (key: string, markerArg: any) => {
    //     setMarker({
    //         ...marker,
    //         [key]: markerArg
    //     })

    // }

    const getAllEvents = async () => {
        const headers = {
            "Content-Type": "application/json"
        }
        const query = queryAllEvents()
        const data = await fetchEvents(query, headers)

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
        <EventContext.Provider value={{ events, getAllEvents, loading, marker, handleSetMarker, getEventsByRadius, radius, handleSetRadius, handleEventCUD }}>
            {props.children}
        </EventContext.Provider>
    )
}
export default EventContextProvider