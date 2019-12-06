import React, { useState, createContext } from 'react'
import { EventLib } from '../@types/index'
import gql from 'graphql-tag';

import { graphql, useQuery } from 'react-apollo';
import { getAllEvents } from '../queries/queries';





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
}

export const EventContext = createContext<EventLib.EventContextInterface>(initEvents)


const EventContextProvider = (props: { children: React.ReactNode; }) => {

    const [events, setEvents] = useState<EventLib.EventList>([])
    const GET_EVENTS = gql`
            query{
                events {
                    id,
                    geometry {
                        type,
                        coordinates
                            },
                    properties,
                    type,
                    title,
                    category,
                    img
                    }
                }
                    `

    const { loading, error, data } = useQuery(GET_EVENTS);

    if (loading) return null;
    if (error) return `Error! ${error}`;
    console.log('loading :', loading);
    console.log('data :', data);
    if (data) {
        const { events } = data
        setEvents(events)
        // return events
        console.log('eventsContext :', events);
    }




    const getAllEvents = () => {
        console.log('getAllEvents');
        const GET_EVENTS = gql`
            query{
                events {
                    id,
                    geometry {
                        type,
                        coordinates
                            },
                    properties,
                    type,
                    title,
                    category,
                    img
                    }
                }
                    `
        const GET_EVENTS2 = gql`
            
        query{
            events {
                id,
                    category,
                    title,
                    geometry {
                    coordinates
                }
            }

        }
            `

        const { loading, error, data } = useQuery(GET_EVENTS2);

        if (loading) return null;
        if (error) return `Error! ${error}`;
        console.log('loading :', loading);
        console.log('data :', data);
        if (data) {
            const { events } = data
            setEvents(events)
            // return events
            console.log('eventsContext :', events);
        }
    }

    return (
        <EventContext.Provider value={{ events, getAllEvents }}>
            {props.children}
        </EventContext.Provider>
    )
}
export default graphql(getAllEvents)(EventContextProvider)

// export default EventContextProvider