import { BoatOptionsDTO } from './dto/boat-options.dto';
import { boatPrices, boatTypes } from '../../utils/constants/boats';
import { BoatsServiceInterface } from './interfaces/boats-service.interface';

export class BoatsService implements BoatsServiceInterface {
  public async calculatePriceBoat(
    boatOptions: BoatOptionsDTO,
  ): Promise<number> {
    switch (boatOptions.optionType) {
      case boatTypes.small:
        return boatPrices.baseSmallSize * boatOptions.nrHours;
      case boatTypes.large:
        return boatPrices.baseLargeSize * boatOptions.nrHours;
      default:
        throw new Error('Invalid option type');
    }
  }
}
