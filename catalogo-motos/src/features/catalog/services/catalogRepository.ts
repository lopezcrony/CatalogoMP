import {
  CharacteristicCategory,
  ColorVariant,
  Motorcycle,
  MotorcycleCharacteristic,
} from '../../../types';

export interface BrandRecord {
  id: string;
  name: string;
  createdAt?: string;
}

export interface MotorcycleImage {
  id: string;
  motorcycleId: number;
  url: string;
  isPrimary: boolean;
  order: number;
  createdAt: string;
}

export interface CatalogRepository {
  listBrands(): Promise<BrandRecord[]>;
  listMotorcycles(): Promise<Motorcycle[]>;
  listColorVariants(motorcycleId: number): Promise<ColorVariant[]>;
  listMotorcycleImages(motorcycleId: number): Promise<MotorcycleImage[]>;
  listCharacteristicCategories(): Promise<CharacteristicCategory[]>;
  listMotorcycleCharacteristics(motorcycleId: number): Promise<MotorcycleCharacteristic[]>;
}
