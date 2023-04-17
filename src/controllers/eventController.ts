import { Request, Response} from "express";

import EventModel   from "../models/event/eventModel";
import { isValidOId, isValidVenue } from '../utils/utility';
import Options from '../utils/Paginate';
import { IEventDocument } from "../models/event/event.interface";



export const createEvent = async ( req:Request, res:Response ) => {
    // try to get all required data from body : 
    try{
        const { title , 
            description, 
            date, 
            duration , 
            venue  } = req.body;
        // check if there is no conflicts events in the same time /date :
        if ( ! isValidVenue( venue )){
            res.status( 404 ).json(
                {
                    status: "unknown",
                    message:"No compatible associated place type."
                }
            );
        }
        /*if ( isNotFree ){
            res.status( 404 ).json(
                {
                    status: "unknown",
                    message:"Venue associated to event  not available"
                }
            );
        }*/
        // register the new event :
        const CreatedEvent = await EventModel.create( req.body);
        // return state : 
        res.status(200).json({
            status:"success",
            message:"Event Registration Successfully",
            event:CreatedEvent
        })
    }catch( error ){
        res.status( 500 ).json({
            status:"unknown",
            message: error.message
        });
    }
}



export const getEvent = async (req:Request, res:Response) => {
    // extract params  from query :
    try{
        const { title, date , duration } = req.query;
        const query:Record<string,any> = {};
        if ( title ) query.title = title;
        if ( date ) query.date = date;
        if ( duration ) query.duration = duration;
        // define sort param : 
        const sort = req.query.sort as string || 'date';
        var customoption = { ...Options, sort};
        const eventList = await EventModel.paginate(
            query,
            customoption
        );
        res.status(200).json(
            {
                status:"success",
                events:eventList
            }
        )
    }catch( err ){
        res.status(500).json(
            {
                status:"unknown",
                message:err.message   
            }
        );
    }
    

}

export const UpdateEvent = async (req:Request, res:Response) => {
    // get the id :
    const { id } = req.params;
    // check if is valid OId : 
    if ( !isValidOId( id) ){
        res.status(404).json({
            status:"unknown",
            message:" Event  id not valid OID "
        });
    }
    try{
        // extract new attribues from body : 
        const updatedEvent:IEventDocument = req.body;
        // get event target : 
        const targetEvent = await EventModel.findByIdAndUpdate(
            id,
            updatedEvent,
            { new : true }
        );
        // check if target is geted : 
        if ( !targetEvent ){
            res.status(404).json({
                status:"unknown",
                message:" Not not found"
            });  
        }
        // all if greate  : 
        res.status(200).json({
            status:"success",
            message:"Event Updated ",
            event:targetEvent
        });
    }catch( err ){
        res.status(500).json({
            status:"unknown",
            message:err.message 
        });
    }
    

}

export const deleteEvent =async (req:Request, res:Response) => {
    // get id target : 
    const { id } = req.params;
    // check id format : 
    if ( ! isValidOId( id) ){
        res.status(404).json({
            status:"unknown",
            message:" Event  id not valid OID "
        });
    }
    // try to get target : 
    try{
        const targetEvent:IEventDocument = await EventModel.findByIdAndDelete(id);
        if ( !targetEvent ){
            res.status(404).json({
                status:"unknown",
                message:" Event not found"
            }); 
        }
        res.status(200).json(
            {
                status:"success",
                message:"Event Deleted ",
                event:targetEvent
            }
        )
    }catch( err ){
        res.status(500).json({
            status:"unknown",
            message:err.message 
        });
    }
}