import { Module } from '@nestjs/common';
import { ItineraryController } from './itinerary.controller';
import { ItineraryService } from './itinerary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItinerarySchema } from './itinerary.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Itinerary', schema: ItinerarySchema }]),
  ],
  controllers: [ItineraryController],
  providers: [ItineraryService],
})
export class ItineraryModule {}
