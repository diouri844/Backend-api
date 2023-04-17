// define my venue interface :


export interface IVenue {
    name: string,
    location: string,
    capacity: number,
    availability: {
        start: Date,
        end: Date,
        isAvailable: boolean
    }
}