import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItineraryModule } from './itinerary/itinerary.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ItineraryModule,
    MongooseModule.forRoot(
      //to do replace with environment variables
      'mongodb+srv://Gow:CM.3aH$u94RrGz.@cluster0.almvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
