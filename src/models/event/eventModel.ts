
import mongoose, { Document, Model } from 'mongoose';
import { IEvent, IEventDocument } from "./event.interface";
import { IVenue } from "./venue.interface";
import  paginate  from 'mongoose-paginate-v2';

const EventSchema = new mongoose.Schema<IEvent>({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    duration: { 
        type: Number, 
        required: true 
    },
    venue: <IVenue>{},
    registration: String,
    ticketPrice: Number,
    speakers: [String],
    schedule: [String],
    organizerContact: String,
    reviews: [
        {   
            user: String, 
            comment: String
        }
    ],
  });

// add static checks : 

EventSchema.static('isVenueNotFree', 
    async (Targetvenue:IVenue) => {
    // check if the venue if free : 
    return !Targetvenue.availability.isAvailable;
});

EventSchema.plugin(paginate);

// create mu modal :
const EventModel = mongoose.model<
                        IEventDocument,
                        mongoose.PaginateModel<IEventDocument>
                        >('Event', EventSchema);


export default EventModel;