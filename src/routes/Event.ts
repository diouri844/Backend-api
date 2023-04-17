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

EventRouter.post('/create',createEvent);
EventRouter.get('/',getEvent);
EventRouter.put('/:id',UpdateEvent);
EventRouter.delete('/:id',deleteEvent);
// export :
export default EventRouter;