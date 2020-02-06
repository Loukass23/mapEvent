
export namespace UserLib {

    export interface User {
        email: string,
        username: string,
        firstName: string,
        lastName: string,
        token: string,
        avatar?: string

    }
    export interface AuthContextInterface {
        logIn(email: string, pwd: string): void,
        signOut(): void,
        user: User

    }

}

export namespace EventLib {
    export interface Event {
        geometry: GeoJSON.Point,
        id: number,
        category: string,
        title: string,
        body?: string,
        img?: string,
        creationDate?: Date
        createdBy?: User,
        comments?: Array<Comment>
        type: any,
        properties: Object<any>
        address?: EventAddress
    }

    interface Comment {
        user: User,
        message: string,
        postedOn: Date,

    }

    export interface EventContextInterface {
        events: EventList,
        getAllEvents(): void,
        loading: boolean,
        getEventsByRadius(): void,
        handleSetRadius(radius: number): void,
        radius: number,
        marker: Event,
        handleSetMarker(event: EventLib.Event): void,
        handleEventCUD(type: string): void,
    }

    export type EventList = Array<Event>
}

export namespace LocationLib {
    export type UserLocation = {
        userRegion: Region,
        _getLocationAsync(): void,
        getAddress<any>(latitude, longitude): void,
        eventAddress: EventAddress
    };
}
export type EventAddress = {
    formatted: string,
    city: string,
    country: string
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

export declare type ImageInfo = {
    uri: string;
    width: number;
    height: number;
    type?: 'image' | 'video';
};
// export declare type ImagePickerResult = {
//     cancelled: true;
// } | ({
//     cancelled: false;
// } & ImageInfo);