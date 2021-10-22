import * as mongoose from 'mongoose';

export const ItinerarySchema = new mongoose.Schema({
  //defined using JavaScript types not TypeScript Types
  title: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
});

//we use extends to add our own extra properties over the mongoose model...
export interface Itinerary extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  cost: number;
}
