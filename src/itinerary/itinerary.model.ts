import * as mongoose from 'mongoose';

export const ItinerarySchema = new mongoose.Schema({
  //defined using JavaScript types not TypeScript Types
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    provinceState: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      minlength: 1,
    },
  },
  cost: { type: Number, required: true },
});

//we use extends to add our own extra properties over the mongoose model...
export interface Itinerary extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  cost: number;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  provinceState: string;
  postalCode: string;
  country: string;
}
