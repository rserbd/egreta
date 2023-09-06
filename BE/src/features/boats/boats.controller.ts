import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { BoatsService } from './boats.service';
import { BoatOptionsDTO } from './dto/boat-options.dto';

@Controller('api/boats')
export class BoatsController {
  constructor(private readonly boatsService: BoatsService) {}

  @Post('price')
  public async calculatePriceBoat(@Body() boatOptions: BoatOptionsDTO) {
    return await this.boatsService.calculatePriceBoat(boatOptions);
  }
}
