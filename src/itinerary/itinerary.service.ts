import { Injectable, NotFoundException } from '@nestjs/common';
import { Itinerary } from './itinerary.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from './itinerary.model';
//Indicates the Service can be Injected as a Dependency...(injected into Itinerary Controller)
@Injectable()
export class ItineraryService {
  //Itinaerary (mongoose)Model-Schema to create itinerary Model in constructor which lets you interact with itenrary in the DB...
  //Service Depends on the Itinerary Mongoose Model/Schema
  constructor(
    @InjectModel('Itinerary') private readonly itineraryModel: Model<Itinerary>,
  ) {}
  // can also add then after save(), instead of async await...
  async insertItinerary(
    title: string,
    desc: string,
    address: Address,
    cost: number,
  ) {
    const newItinerary = new this.itineraryModel({
      title,
      description: desc,
      address: address,
      cost: cost,
    });
    const result = await newItinerary.save(); //save method from mongoose, since we wrapped our schema
    return result.id as string;
  }

  async getAllItineraries() {
    //mongoose model comes with find method
    // exec needed in the end to return a Real Promise
    const itineraries = await this.itineraryModel.find().exec();
    //mapping the data to new format to modify mongoDB's default _id and _v... properties
    return itineraries.map((it) => ({
      id: it.id,
      title: it.title,
      description: it.description,
      address: it.address,
      cost: it.cost,
    }));
  }

  async getSingleItinerary(itineraryId: string) {
    const itinerary = await this.findItinerary(itineraryId);
    // Return new object so we don't  return the extra mongoose props (_id, _v) and mongoose helper methods(save, find...)
    return {
      id: itinerary.id,
      title: itinerary.title,
      description: itinerary.description,
      address: itinerary.address,
      cost: itinerary.cost,
    };
  }

  async updateItinerary(
    itineraryId: string,
    title: string,
    desc: string,
    cost: number,
    address: Address,
  ) {
    const updatedItinerary = await this.findItinerary(itineraryId);

    if (title) {
      updatedItinerary.title = title;
    }
    if (desc) {
      updatedItinerary.description = desc;
    }
    if (address) {
      updatedItinerary.address = address;
    }
    if (cost) {
      updatedItinerary.cost = cost;
    }
    //Mongoose model save function to update the existing entry in the DB
    updatedItinerary.save();
  }

  private async findItinerary(id: string): Promise<Itinerary> {
    //mongoose findById will find one Itinerary by Id and return it
    let itinerary;
    try {
      itinerary = await this.itineraryModel.findById(id);
    } catch (error) {
      //In the case findById throws and error
      throw new NotFoundException('Could Not find itinerary');
    }
    if (!itinerary) {
      //Send 404 response
      throw new NotFoundException('Could Not find itinerary');
    }
    return itinerary;
  }

  async deleteItinerary(itId: string) {
    // id is a getter, but in the DB the objects are stored with _id
    const result = await this.itineraryModel.deleteOne({ _id: itId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could Not find itinerary');
    }
  }
}
