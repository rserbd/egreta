import { Module } from '@nestjs/common';
import { BoatsController } from './boats.controller';
import { BoatsService } from './boats.service';

@Module({
  controllers: [BoatsController],
  providers: [BoatsService],
})
export class BoatsModule {}
