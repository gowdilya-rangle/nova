import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItineraryService } from './itinerary.service';

import { Address } from './itinerary.model';

@Controller('itinerary')
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @Post()
  async addItinerary(
    //TO DO: Add validation?
    //TO DO: add imageUrl, website/link
    @Body('title') itTitle: string,
    @Body('description') itDesc: string,
    @Body('address') itAddress: Address,
    @Body('cost') itCost: number,
  ) {
    const generatedId = await this.itineraryService.insertItinerary(
      itTitle,
      itDesc,
      itAddress,
      itCost,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllItineraries() {
    const itineraries = this.itineraryService.getAllItineraries();
    return itineraries;
  }

  @Get(':id')
  getItinerary(@Param('id') itId: string) {
    return this.itineraryService.getSingleItinerary(itId);
  }

  @Patch(':id')
  async updateItinerary(
    @Param('id') itId: string,
    @Body('title') itTitle: string,
    @Body('description') itDesc: string,
    @Body('address') itAddress: Address,
    @Body('cost') itCost: number,
  ) {
    await this.itineraryService.updateItinerary(
      itId,
      itTitle,
      itDesc,
      itCost,
      itAddress,
    );
    return null;
  }

  @Delete(':id')
  async removeItinerary(@Param('id') itId: string) {
    await this.itineraryService.deleteItinerary(itId);
    return null;
  }
}
