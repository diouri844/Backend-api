import express from "express";

// import controllers : 
import {
    createEvent,
    getEvent,
    UpdateEvent,
    deleteEvent
} from "../controllers/eventController";

import auth from "../middleware/isLogged";

// create router :
const EventRouter = express.Router();
// create enpoint :

EventRouter.post('/create',auth, createEvent);
EventRouter.get('/',getEvent);
EventRouter.put('/:id',auth ,UpdateEvent);
EventRouter.delete('/:id',auth , deleteEvent);
// export :
export default EventRouter;