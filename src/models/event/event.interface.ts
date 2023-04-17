import mongoose, { Document } from 'mongoose';
import { IVenue } from './venue.interface';

export interface IEvent {
  title: string;
  description: string;
  date: Date;
  duration: number;
  venue: IVenue;
  registration?: string;
  ticketPrice?: number;
  speakers?: string[];
  schedule?: string[];
  organizerContact?: string;
  reviews?: { 
    user: string; 
    comment: string 
  }[];
};


export interface IEventDocument extends IEvent, Document {
  // add static function :
  isVenueNotFree(venueTarget:IVenue):boolean
};