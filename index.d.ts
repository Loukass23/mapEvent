export namespace EventLib {
    export interface Event {
        geometry: GeoJSON.Point,
        id: number,
        category: string,
        title: string,
        body?: string,
        img?: string,
        properties?: Object<any>
    }

    export type EventList = Array<Event>
}

export namespace LocationLib {
    export type UserLocation = {
        userRegion: Region,
        _getLocationAsync(): void,
    };
}

export type ViewLayout = {
    x: number,
    y: number,
    width: number,
    height: number,
}

export type ViewLayoutEvent = {
    nativeEvent: {
        layout: ViewLayout,
    }
}