import { Injectable, NotFoundException } from '@nestjs/common';
import { City } from './city.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//Indicates the Service can be Injected as a Dependency...(injected into Itinerary Controller)
@Injectable()
export class CityService {
  //Itinaerary (mongoose)Model-Schema to create itinerary Model in constructor which lets you interact with itenrary in the DB...
  //Service Depends on the Itinerary Mongoose Model/Schema
  constructor(
    @InjectModel('City') private readonly cityModel: Model<City>,
  ) {}
  // can also add then after save(), instead of async await...
 

  async getAllCitiesWithPrefix( subString: string) {

    //mongoose model comes with find method
    // exec needed in the end to return a Real Promise
    var regexp = new RegExp("^"+ subString);
    const cities = await this.cityModel.find(
      {"name" : {$regex : new RegExp("^" + subString, "i")}}
    ).exec();
    //mapping the data to new format to modify mongoDB's default _id and _v... properties
    return cities.map((it) => ({
      id: it.id,
      name: it.name,
      country_name: it.country_name
    }));
  }

 
}
