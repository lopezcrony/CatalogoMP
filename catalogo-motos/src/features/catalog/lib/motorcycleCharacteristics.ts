import { Motorcycle, MotorcycleCharacteristic } from '../../../types';

export function getMotorcycleCharacteristics(bike: Motorcycle): MotorcycleCharacteristic[] {
  if (bike.characteristics?.length) {
    return bike.characteristics;
  }

  return [];
}
