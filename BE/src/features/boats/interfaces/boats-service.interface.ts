import { BoatOptionsDTO } from '../dto/boat-options.dto';

export interface BoatsServiceInterface {
  calculatePriceBoat(boatOptions: BoatOptionsDTO): Promise<number>;
}
