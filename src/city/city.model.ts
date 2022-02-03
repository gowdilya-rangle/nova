import * as mongoose from 'mongoose';

export const CitySchema = new mongoose.Schema({
  //defined using JavaScript types not TypeScript Types
  name: { type: String, required: true },
  country_name: { type: String, required: true }
  
},{ collection : 'cities' });

//we use extends to add our own extra properties over the mongoose model...
export interface City extends mongoose.Document {
  id: string;
  name: string;
  country_name: string;
 
}
