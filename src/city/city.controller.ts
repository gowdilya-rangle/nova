import {
  Controller,
  Get,
  Param
} from '@nestjs/common';
import {CityService } from './city.service';



@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get(':prefix')
  async getCities(@Param('prefix') prefix: string) {
    const cities = this.cityService.getAllCitiesWithPrefix( prefix);
    return cities;
  }

  
}
