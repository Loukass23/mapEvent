import React, { useState, createContext } from 'react'
import { Event } from './EventContext'


export type MarkerType = {
    marker: Event,
    handleSetMarker(marker: Event): any,
};

export const MarkerContext = createContext<MarkerType>({
    marker: null,
    handleSetMarker: (marker) => {
        console.log('marker :', marker);
        throw new Error('_handleSetMarker() not implemented' + marker);
    }
})

const MarkerContextProvider = (props) => {
    const [marker, setMarker] = useState<Event | undefined>(

    )

    const handleSetMarker = (marker: Event) => {
        console.log('markerContext :', marker);
        setMarker(marker)
    };

    return (
        <MarkerContext.Provider value={{ marker, handleSetMarker }}>
            {props.children}
        </MarkerContext.Provider>
    )
}

export default MarkerContextProvider



